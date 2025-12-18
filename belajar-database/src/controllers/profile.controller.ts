import type { Request, Response } from "express";
import { successResponse, errorResponse } from "../utils/response";
import {
  createProfile,
  getProfileByUserId,
  getProfileById,
  updateProfile,
  deleteProfile,
  getAllProfiles
} from "../services/profile.service";

// CREATE - Buat profile baru
export const create = async (req: Request, res: Response) => {
  try {
    // user_id bisa dari token atau dari body
    const user_id = req.user?.id || req.body.user_id;
    
    if (!user_id) {
      return errorResponse(res, "User ID diperlukan", 400);
    }

    const data = {
      user_id: Number(user_id),
      name: req.body.name,
      gender: req.body.gender,
      address: req.body.address,
      profile_picture_url: req.body.profile_picture_url
    };

    const profile = await createProfile(data);
    successResponse(res, "Profile berhasil dibuat", profile, null, 201);
  } catch (error: any) {
    errorResponse(res, error.message, 400);
  }
};

// READ - Get profile by user ID
export const getByUserId = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const profile = await getProfileByUserId(userId);
    successResponse(res, "Profile berhasil diambil", profile);
  } catch (error: any) {
    errorResponse(res, error.message, 404);
  }
};

// READ - Get profile by profile ID
export const getById = async (req: Request, res: Response) => {
  try {
    const profileId = Number(req.params.id);
    const profile = await getProfileById(profileId);
    successResponse(res, "Profile berhasil diambil", profile);
  } catch (error: any) {
    errorResponse(res, error.message, 404);
  }
};

// READ - Get my profile (from token)
export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return errorResponse(res, "Unauthorized", 401);
    }

    const profile = await getProfileByUserId(userId);
    successResponse(res, "Profile berhasil diambil", profile);
  } catch (error: any) {
    errorResponse(res, error.message, 404);
  }
};

// UPDATE - Update profile
export const update = async (req: Request, res: Response) => {
  try {
    const profileId = Number(req.params.id);
    const data = {
      name: req.body.name,
      gender: req.body.gender,
      address: req.body.address,
      profile_picture_url: req.body.profile_picture_url
    };

    const updatedProfile = await updateProfile(profileId, data);
    successResponse(res, "Profile berhasil diupdate", updatedProfile);
  } catch (error: any) {
    errorResponse(res, error.message, 400);
  }
};

// DELETE - Delete profile
export const remove = async (req: Request, res: Response) => {
  try {
    const profileId = Number(req.params.id);
    const deletedProfile = await deleteProfile(profileId);
    successResponse(res, "Profile berhasil dihapus", deletedProfile);
  } catch (error: any) {
    errorResponse(res, error.message, 400);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    // Hanya admin yang bisa lihat semua profile
    if (req.user?.role !== 'ADMIN') {
      return errorResponse(res, "Access denied. Admin only.", 403);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search as any;
    const sortBy = req.query.sortBy as string;
    const sortOrder = (req.query.sortOrder as "asc" | "desc") || "desc";

    const result = await getAllProfiles({
      page,
      limit,
      search,
      sortBy,
      sortOrder,
    });

    const pagination = {
      page: result.currentPage,
      limit,
      total: result.total,
      totalPages: result.totalPages,
    };

    successResponse(res, "Semua profile berhasil diambil", result.profiles, pagination);
  } catch (error: any) {
    errorResponse(res, error.message, 500);
  }
};

