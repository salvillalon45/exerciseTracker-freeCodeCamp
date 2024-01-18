import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const PORT = 3000;

export async function findUserByID(userID: string) {
	const user = await prisma.user.findUnique({
		where: {
			id: userID
		}
	});
	const { id, username } = user ?? {};

	return {
		_id: id,
		username
	};
}
