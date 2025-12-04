import { MagicUser, MagicToken } from '../models/magicUser.model';
import { EmailService } from '../utils/email.service';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export class MagicLoginService {
  private emailService: EmailService;

  constructor() {
    this.emailService = new EmailService();
  }

  private generateToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  async requestMagicLink(email: string, name?: string): Promise<boolean> {
    try {
      const cleanEmail = email.toLowerCase().trim();
      
      let user = await MagicUser.findOne({ email: cleanEmail });
      
      if (!user) {
        user = new MagicUser({
          email: cleanEmail,
          name,
          isVerified: false,
          loginCount: 0
        });
        await user.save();
      }

      const token = this.generateToken();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
      
      const magicToken = new MagicToken({
        email: cleanEmail,
        token,
        expiresAt,
        used: false
      });
      await magicToken.save();

      const emailSent = await this.emailService.sendMagicLink(cleanEmail, token, name || user.name);
      
      return emailSent;
    } catch (error) {
      console.error('❌ Magic link request failed:', error);
      return false;
    }
  }

  async verifyMagicToken(token: string): Promise<{ success: boolean; user?: any; authToken?: string }> {
    try {
      const magicToken = await MagicToken.findOne({
        token,
        used: false,
        expiresAt: { $gt: new Date() }
      });

      if (!magicToken) {
        return { success: false };
      }

      magicToken.used = true;
      await magicToken.save();

      let user = await MagicUser.findOne({ email: magicToken.email });
      
      if (!user) {
        user = new MagicUser({
          email: magicToken.email,
          isVerified: true,
          loginCount: 1,
          lastLogin: new Date()
        });
      } else {
        user.isVerified = true;
        user.loginCount += 1;
        user.lastLogin = new Date();
      }
      
      await user.save();

      const authToken = jwt.sign(
        { 
          userId: user.id, 
          email: user.email 
        },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      const userResponse = user.toObject();
      return {
        success: true,
        user: userResponse,
        authToken
      };
    } catch (error) {
      console.error('❌ Token verification failed:', error);
      return { success: false };
    }
  }

  async validateAuthToken(authToken: string): Promise<any> {
    try {
      const decoded = jwt.verify(authToken, process.env.JWT_SECRET!);
      return decoded;
    } catch (error) {
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<any> {
    const user = await MagicUser.findOne({ email: email.toLowerCase().trim() });
    return user;
  }
}