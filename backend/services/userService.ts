import {User} from '../models/UserModel.js'

export const createUserService = async (data: any) => {
  return await User.create(data);
};

export const getAllUserService = async () => {
  return await User.find()
}

export const getUserByIdService = async (id: string) => {
  return await User.findById(id)
}

export const removeUserService = async (id: string) => {
  return await User.findByIdAndDelete(id)
}

export const updateUserService = async (UserId: string, data: any) => {
  return await User.findByIdAndUpdate(UserId, data, { new: true });
};
