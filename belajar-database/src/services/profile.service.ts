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

// CREATE - Buat profile baru
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

// READ - Get profile by user ID
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

// READ - Get profile by profile ID
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

// UPDATE - Update profile
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

// DELETE - Soft delete profile
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

// GET ALL - Get semua profile (admin only)
export const getAllProfiles = async () => {
  return await prisma.profile.findMany({
    where: { deletedAt: null },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          role: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });
};