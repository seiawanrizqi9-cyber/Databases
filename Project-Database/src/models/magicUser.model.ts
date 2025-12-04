// import mongoose, { Schema } from 'mongoose';
// import type { IMagicUser, IMagicToken } from '../types/magicUser.type';

// const magicUserSchema = new Schema<IMagicUser>({
//   email: { 
//     type: String, 
//     required: true, 
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   name: { type: String },
//   isVerified: { type: Boolean, default: false },
//   lastLogin: { type: Date },
//   loginCount: { type: Number, default: 0 }
// }, {
//   timestamps: true
// });

// // Magic token schema
// const magicTokenSchema = new Schema<IMagicToken>({
//   email: { 
//     type: String, 
//     required: true,
//     lowercase: true,
//     trim: true
//   },
//   token: { 
//     type: String, 
//     required: true,
//     unique: true
//   },
//   expiresAt: { 
//     type: Date, 
//     required: true,
//     index: { expires: '15m' }
//   },
//   used: { 
//     type: Boolean, 
//     default: false 
//   }
// }, {
//   timestamps: true
// });

// // Indexes
// magicTokenSchema.index({ email: 1, used: 1 });
// magicTokenSchema.index({ token: 1, used: 1 });

// export const MagicUser = mongoose.model<IMagicUser>('MagicUser', magicUserSchema);
// export const MagicToken = mongoose.model<IMagicToken>('MagicToken', magicTokenSchema);