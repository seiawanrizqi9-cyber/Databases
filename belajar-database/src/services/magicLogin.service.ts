import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getPrisma } from '../prisma';

const prisma = getPrisma();
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this';

export class MagicLoginService {
  private generateToken(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  async requestMagicLink(email: string, name?: string): Promise<{ success: boolean; token?: string }> {
    try {
      const cleanEmail = email.toLowerCase().trim();
      
      // Cari atau buat user di database
      let user = await prisma.user.findUnique({
        where: { email: cleanEmail }
      });
      
      if (!user) {
        // Generate random password untuk user baru
        const tempPassword = crypto.randomBytes(16).toString('hex');
        const passwordHash = await bcrypt.hash(tempPassword, 10);

        const userName = name || cleanEmail.split('@')[0] || 'user';
        
        user = await prisma.user.create({
          data: {
            email: cleanEmail,
            name: userName,
            password_hash: passwordHash
          }
        });
      }

      // Generate magic token
      const token = this.generateToken();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 menit
      
      // Simpan token ke database
      await prisma.magicToken.create({
        data: {
          token,
          user_id: user.id,
          email: cleanEmail,
          expiresAt,
          used: false
        }
      });

      // Clean up expired tokens
      await prisma.magicToken.deleteMany({
        where: {
          expiresAt: { lt: new Date() }
        }
      });

      // Log untuk development
      console.log('🔗 MAGIC LINK (PRISMA):', {
        userId: user.id,
        email: cleanEmail,
        token: token,
        magicLink: `http://localhost:3000/api/auth/verify?token=${token}`,
        expiresAt: expiresAt.toISOString()
      });

      return { success: true, token };
    } catch (error) {
      console.error('❌ Magic link request failed:', error);
      return { success: false };
    }
  }

  async verifyMagicToken(token: string): Promise<{ 
    success: boolean; 
    user?: any; 
    authToken?: string 
  }> {
    try {
      // Cari token di database
      const magicToken = await prisma.magicToken.findUnique({
        where: { token },
        include: { user: true }
      });

      if (!magicToken) {
        return { success: false };
      }

      // Cek apakah token sudah expired atau digunakan
      if (magicToken.used || new Date(magicToken.expiresAt) < new Date()) {
        return { success: false };
      }

      // Mark token as used
      await prisma.magicToken.update({
        where: { id: magicToken.id },
        data: { used: true }
      });

      // Update user last login (optional)
      await prisma.user.update({
        where: { id: magicToken.user_id },
        data: { 
          updatedAt: new Date() 
        }
      });

      // Generate JWT token
      const authToken = jwt.sign(
        { 
          userId: magicToken.user.id, 
          email: magicToken.user.email,
          name: magicToken.user.name
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return {
        success: true,
        user: {
          id: magicToken.user.id,
          name: magicToken.user.name,
          email: magicToken.user.email,
          createdAt: magicToken.user.createdAt
        },
        authToken
      };
    } catch (error) {
      console.error('❌ Token verification failed:', error);
      return { success: false };
    }
  }

  async validateAuthToken(authToken: string): Promise<any> {
    try {
      const decoded = jwt.verify(authToken, JWT_SECRET) as any;
      
      // Cek apakah user masih ada di database
      const user = await prisma.user.findUnique({
        where: { 
          id: decoded.userId,
          deletedAt: null 
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true
        }
      });

      return user ? { ...decoded, user } : null;
    } catch (error) {
      return null;
    }
  }

  async getUserByEmail(email: string): Promise<any> {
    try {
      const user = await prisma.user.findUnique({
        where: { 
          email: email.toLowerCase().trim(),
          deletedAt: null 
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          orders: {
            select: {
              id: true,
              total: true,
              createdAt: true
            },
            take: 5,
            orderBy: { createdAt: 'desc' }
          }
        }
      });

      return user;
    } catch (error) {
      console.error('❌ Get user by email failed:', error);
      return null;
    }
  }
}