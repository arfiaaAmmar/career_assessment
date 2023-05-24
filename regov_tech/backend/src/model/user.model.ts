import { Schema, Document, model, Model } from 'mongoose';

// Define the User interface
interface IUser {
  username: string;
  email: string;
  password: string;
  // Add any additional fields as needed
}

// Define the User document interface (UserDocument)
interface UserDocument extends IUser, Document {}

// Define the User schema
const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add any additional fields as needed
});

// Create and export the User model
const User = model<UserDocument>('User', userSchema);

export default User;
