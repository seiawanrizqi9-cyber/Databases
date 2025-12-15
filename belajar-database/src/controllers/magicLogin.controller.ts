import type { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import { MagicLoginService } from "../services/magicLogin.service";

const magicService = new MagicLoginService();

export const requestMagicLink = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    if (!email || !email.includes("@")) {
      return errorResponse(res, "Email tidak valid", 400);
    }

    const result = await magicService.requestMagicLink(email, name);

    if (result.success) {
      successResponse(
        res,
        "Magic link telah dikirim! (lihat di console untuk token)",
        { 
          email,
          token: result.token, // Kirim token di response untuk testing
          note: "Untuk production, kirim email dengan token ini"
        }
      );
    } else {
      errorResponse(res, "Gagal mengirim magic link", 500);
    }
  } catch (error: any) {
    console.error("Error:", error.message);
    errorResponse(res, "Terjadi kesalahan server", 500);
  }
};

export const verifyMagicToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return errorResponse(res, "Token diperlukan", 400);
    }

    const result = await magicService.verifyMagicToken(token);

    if (result.success) {
      successResponse(
        res,
        "Login berhasil!",
        {
          user: result.user,
          token: result.authToken,
          expiresIn: "7 hari",
        }
      );
    } else {
      errorResponse(res, "Magic link tidak valid atau telah kedaluwarsa", 400);
    }
  } catch (error: any) {
    console.error("Error:", error.message);
    errorResponse(res, "Terjadi kesalahan server", 500);
  }
};

export const validateSession = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return errorResponse(res, "Token tidak tersedia", 401);
    }

    const decoded = await magicService.validateAuthToken(token);

    if (decoded) {
      successResponse(
        res,
        "Session valid",
        { user: decoded, valid: true },
      );
    } else {
      errorResponse(res, "Token tidak valid", 401);
    }
  } catch (error: any) {
    console.error("Error:", error.message);
    errorResponse(res, "Terjadi kesalahan server", 500);
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    if (!email) {
      return errorResponse(res, "Email diperlukan", 400);
    }
    const user = await magicService.getUserByEmail(email);

    if (user) {
      successResponse(res, "Profil user ditemukan", user);
    } else {
      errorResponse(res, "User tidak ditemukan", 404);
    }
  } catch (error: any) {
    console.error("Error:", error.message);
    errorResponse(res, "Terjadi kesalahan server", 500);
  }
};
