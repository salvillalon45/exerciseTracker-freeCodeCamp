import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function findUserByID(userID: string) {
	const user = await prisma.user.findUnique({
		where: {
			id: userID
		},
		/*
			Since Prisma queries do not include relations by default 
			(you have to use the include option), the generated types do not
			include them either. You can create the type you are looking for 
			using one of our built-in utility types, though.
			https://github.com/prisma/prisma/discussions/10928
		*/
		include: { log: true }
	});
	const { id, username, log } = user ?? {};

	return {
		_id: id,
		username,
		log
	};
}

export async function findManyUsers() {
	const usersDB = await prisma.user.findMany();
	const users = usersDB.map(({ username, id }) => {
		return {
			username,
			_id: id
		};
	});

	return users;
}

export async function createNewUserHelper(usernameInput: string) {
	const newUser = await prisma.user.create({
		data: {
			username: usernameInput
		}
	});
	return newUser;
}

export async function createNewExercise(
	description: string,
	duration: string,
	date: string,
	userID: string
) {
	const newExercise = await prisma.exercise.create({
		data: {
			description,
			duration: parseInt(duration),
			date,
			userID
		}
	});
	return newExercise;
}

export async function createNewLog(
	description: string,
	duration: string,
	date: string,
	userID: string
) {
	const newLog = await prisma.log.create({
		data: {
			description,
			duration: parseInt(duration),
			date,
			userID
		}
	});
	return newLog;
}
