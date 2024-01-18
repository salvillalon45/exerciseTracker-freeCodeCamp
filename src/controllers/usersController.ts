import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers(req: any, res: any, next: any) {
	console.log('Inside get Users');

	const users = await prisma.user.findMany();
	const jsonWithUnderscoreId = users.map((user) => {
		const { username, id } = user;
		return {
			username,
			_id: id
		};
	});

	res.status(200).json({
		users: jsonWithUnderscoreId
	});
}

export async function createNewUser(req: any, res: any, next: any) {
	const newUser = await prisma.user.create({
		data: {
			username: 'Alice'
		}
	});
	console.log('New User create!');
	console.log(newUser);
}
