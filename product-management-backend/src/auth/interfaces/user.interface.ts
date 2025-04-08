import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// If you want to add methods to the user model
export interface UserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// If you need to use both Document and Methods
export type UserDocument = User & UserMethods & Document;