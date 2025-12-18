import { getPrisma } from '../prisma';

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
  profiles: any[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export const createProfile = async (data: CreateProfileData) => {
  // Cek apakah user sudah punya profile
  const existingProfile = await prisma.profile.findUnique({
    where: { user_id: data.user_id }
  });
  
  if (existingProfile) {
    throw new Error('User sudah memiliki profile');
  }

  // Cek apakah user exists
  const user = await prisma.user.findUnique({
    where: { id: data.user_id }
  });
  
  if (!user) {
    throw new Error('User tidak ditemukan');
  }

  return await prisma.profile.create({
    data: {
      user_id: data.user_id,
      name: data.name,
      gender: data.gender ? data.gender.toUpperCase() : null,
      address: data.address || null,
      profile_picture_url: data.profile_picture_url || null
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          role: true
        }
      }
    }
  });
};

export const getProfileByUserId = async (userId: number) => {
  const profile = await prisma.profile.findUnique({
    where: { user_id: userId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          role: true
        }
      }
    }
  });
  
  if (!profile) {
    throw new Error('Profile tidak ditemukan');
  }
  
  return profile;
};

export const getProfileById = async (profileId: number) => {
  const profile = await prisma.profile.findUnique({
    where: { id: profileId },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          role: true
        }
      }
    }
  });
  
  if (!profile) {
    throw new Error('Profile tidak ditemukan');
  }
  
  return profile;
};

export const updateProfile = async (profileId: number, data: UpdateProfileData) => {
  const profile = await prisma.profile.findUnique({
    where: { id: profileId }
  });
  
  if (!profile) {
    throw new Error('Profile tidak ditemukan');
  }

  const updateData: Record<string, any> = {
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

  return await prisma.profile.update({
    where: { id: profileId },
    data: updateData,
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          role: true
        }
      }
    }
  });
};

export const deleteProfile = async (profileId: number) => {
  const profile = await prisma.profile.findUnique({
    where: { id: profileId }
  });
  
  if (!profile) {
    throw new Error('Profile tidak ditemukan');
  }

  return await prisma.profile.update({
    where: { id: profileId },
    data: { deletedAt: new Date() }
  });
};

export const getAllProfiles = async (
  params: ProfilesParams
): Promise<ProfileListResponse> => {
  const { page, limit, search, sortBy, sortOrder } = params;
  const skip = (page - 1) * limit;

  const whereClause: any = {
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

  const profiles = await prisma.profile.findMany({
    skip: skip,
    take: limit,
    where: whereClause,
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          createdAt: true
        }
      }
    },
    orderBy: sortBy
      ? {
          [sortBy]: sortOrder || "desc",
        }
      : { createdAt: "desc" },
  });

  const total = await prisma.profile.count({ where: whereClause });

  return {
    profiles,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  };
};