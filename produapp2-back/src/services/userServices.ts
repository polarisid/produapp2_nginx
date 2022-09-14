import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRegisterType, UserLoginType } from "../types/userTypes.js";
import userRepository from "../repositories/userRepository.js";
import {
	conflictError,
	notFoundError,
	unauthorizedError,
} from "../utils/errorUtils.js";
import dotenv from "dotenv";

dotenv.config();
async function createAndVerifyNewUser(user: UserRegisterType) {
	const userExists = await userRepository.FindByEmail(user.email);
	if (userExists) throw conflictError("Email already exists in database");
	const hashedPassword = await bcrypt.hash(user.password, 10);
	await userRepository.Insert({
		...user,
		password: hashedPassword,
	});
	return;
}

async function authenticateUser(user: UserLoginType) {
	const userExists = await userRepository.FindByEmail(user.email);
	if (!userExists) throw notFoundError("Email not found in database");
	const isPasswordValid = await bcrypt.compare(
		user.password,
		userExists.password
	);
	if (!isPasswordValid) throw unauthorizedError("Incorrect password");
	const token = jwt.sign(
		{ userId: userExists.id, name: userExists.name, role: userExists.role },
		process.env.JWT_SECRET
	);
	return token;
}
async function findById(id: number) {
	const user = await userRepository.FindById(id);
	if (!user) throw notFoundError("User not found");
	return user;
}
export default { createAndVerifyNewUser, authenticateUser, findById };
