import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers(req: any, res: any, next: any) {
	console.log('Inside get Users');
	const usersDB = await prisma.user.findMany();
	const users = usersDB.map((user) => {
		const { username, id } = user;
		return {
			username,
			_id: id
		};
	});

	res.status(200).json(users);
}

export async function createNewUser(req: any, res: any, next: any) {
	console.log('Inside createNewUser');
	const { username } = req.body;
	console.log({ username });

	const newUser = await prisma.user.create({
		data: {
			username
		}
	});

	console.log('New User create!');
	console.log(newUser);
	res.status(200).json(newUser);
}
