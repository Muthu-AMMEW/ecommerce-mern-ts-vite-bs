import { Document, Types } from 'mongoose';

export interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface Avatar {
  id?: Types.ObjectId;
  fieldname?: string;
  filename?: string;
  mimetype?: string;
  uploadDate?: Date;
  image?: string;
}

export interface Verification {
  email: 'verified' | 'unverified';
  phoneNumber: 'verified' | 'unverified';
}

export interface UserDocument extends Document {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: Address;
  avatar?: Avatar;
  role: string;
  verification: Verification;
  emailVerificationCode?: number;
  emailVerificationCodeExpire?: Date;
  resetPasswordToken?: string;
  resetPasswordTokenExpire?: Date;
  createdAt: Date;

  getJwtToken(): string;
  getEmailVerificationCode(): string;
  isValidPassword(enteredPassword: string): Promise<boolean>;
  getResetToken(): string;
}
