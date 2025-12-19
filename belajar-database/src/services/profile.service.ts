import type { Prisma, Profile } from "../generated/client";
import * as profileRepo from "../repository/profile.repository";
import { getPrisma } from "../prisma";

const prisma = getPrisma();

export interface CreateProfileData {
  user_id: number;
  name: string;
  gender?: string | null;
  address?: string | null;
  profile_picture_url?: string | null;
}

export interface UpdateProfileData {
  name?: string;
  gender?: string | null;
  address?: string | null;
  profile_picture_url?: string | null;
}

interface ProfilesParams {
  page: number;
  limit: number;
  search?: {
    name?: string;
    gender?: string;
    address?: string;
  };
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

interface ProfileListResponse {
  profiles: Profile[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export const createProfile = async (data: CreateProfileData): Promise<Profile> => {
  const existingProfile = await profileRepo.findByUserId(data.user_id);
  if (existingProfile) {
    throw new Error('User sudah memiliki profile');
  }

  const user = await prisma.user.findUnique({
    where: { id: data.user_id, deletedAt: null }
  });
  
  if (!user) {
    throw new Error('User tidak ditemukan');
  }

  const createData: Prisma.ProfileCreateInput = {
    user: { connect: { id: data.user_id } },
    name: data.name,
    gender: data.gender ? data.gender.toUpperCase() : null,
    address: data.address || null,
    profile_picture_url: data.profile_picture_url || null
  };

  return await profileRepo.create(createData);
};

export const getProfileByUserId = async (userId: number): Promise<Profile> => {
  const profile = await profileRepo.findByUserId(userId);
  if (!profile) {
    throw new Error('Profile tidak ditemukan');
  }
  return profile;
};

export const getProfileById = async (profileId: number): Promise<Profile> => {
  const profile = await profileRepo.findById(profileId);
  if (!profile) {
    throw new Error('Profile tidak ditemukan');
  }
  return profile;
};

export const updateProfile = async (
  profileId: number, 
  data: UpdateProfileData
): Promise<Profile> => {
  const profile = await profileRepo.findById(profileId);
  if (!profile) {
    throw new Error('Profile tidak ditemukan');
  }

  const updateData: Prisma.ProfileUpdateInput = {
    updatedAt: new Date()
  };

  if (data.name !== undefined) {
    updateData.name = data.name;
  }
  
  if (data.gender !== undefined) {
    updateData.gender = data.gender ? data.gender.toUpperCase() : null;
  }
  
  if (data.address !== undefined) {
    updateData.address = data.address || null;
  }
  
  if (data.profile_picture_url !== undefined) {
    updateData.profile_picture_url = data.profile_picture_url || null;
  }

  return await profileRepo.update(profileId, updateData);
};

export const deleteProfile = async (profileId: number): Promise<Profile> => {
  const profile = await profileRepo.findById(profileId);
  if (!profile) {
    throw new Error('Profile tidak ditemukan');
  }
  return await profileRepo.softDelete(profileId);
};

export const getAllProfiles = async (
  params: ProfilesParams
): Promise<ProfileListResponse> => {
  const { page, limit, search, sortBy, sortOrder } = params;
  const skip = (page - 1) * limit;

  const whereClause: Prisma.ProfileWhereInput = {
    deletedAt: null,
  };

  if (search?.name) {
    whereClause.name = {
      contains: search.name,
      mode: "insensitive",
    };
  }

  if (search?.gender) {
    whereClause.gender = search.gender.toUpperCase();
  }

  if (search?.address) {
    whereClause.address = {
      contains: search.address,
      mode: "insensitive",
    };
  }

  const sortCriteria: Prisma.ProfileOrderByWithRelationInput = sortBy
    ? {
        [sortBy]: sortOrder || "desc",
      }
    : { createdAt: "desc" };

  const profiles = await profileRepo.list(
    skip,
    limit,
    whereClause,
    sortCriteria
  );

  const total = await profileRepo.countAll(whereClause);

  return {
    profiles,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};