import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers(req: any, res: any, next: any) {
	console.log('Inside get Users');
	try {
		const usersDB = await prisma.user.findMany();

		const users = usersDB.map((user) => {
			const { username, id } = user;

			return {
				username,
				_id: id
			};
		});

		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({
			message: 'Error in getUsers',
			error
		});
	}
}

export async function createNewUser(req: any, res: any, next: any) {
	console.log('Inside createNewUser');
	const { username: usernameInput } = req.body;
	console.log({ usernameInput });
	try {
		const newUser = await prisma.user.create({
			data: {
				username: usernameInput
			}
		});
		const { id, username } = newUser;

		console.log('New User create!');
		console.log(newUser);
		res.status(200).json({
			_id: id,
			username
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error in createUser',
			error
		});
	}
}
