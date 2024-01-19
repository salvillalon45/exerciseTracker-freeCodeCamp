import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const PORT = 3000;

export function checkDate(dateInput: string | undefined) {
	const date = dateInput ? new Date(dateInput) : new Date();
	return date.toDateString();
}

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

export async function findManyUsers() {
	const users = await prisma.user.findMany();
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

export async function getUserExercises(userID: string) {
	const exercises = await prisma.exercise.findMany({
		where: {
			userID
			// {
			// 	contains: 'Hello World'
			// }
		}
	});
	console.log({ exercises });
	return exercises;
}
