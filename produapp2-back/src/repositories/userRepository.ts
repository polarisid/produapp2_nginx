import { prisma } from "../database.js";
import { UserRegisterType } from "../types/userTypes.js";
async function Insert(user: UserRegisterType) {
	const result = await prisma.users.create({
		data: user,
	});
	return result;
}

async function FindByEmail(email: string) {
	return prisma.users.findUnique({
		where: {
			email,
		},
	});
}

async function FindById(id: number) {
	return prisma.users.findUnique({
		where: {
			id,
		},
	});
}

export default { Insert, FindByEmail, FindById };
