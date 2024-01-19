import {
	checkDate,
	createNewExercise,
	createNewUserHelper,
	findManyUsers,
	findUserByID,
	getUserExercises
} from '../utils';

// ---------------------------------------
// USERS
// ---------------------------------------
export async function getUsers(req: any, res: any, next: any) {
	try {
		const users = await findManyUsers();

		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({
			message: 'Error in getUsers',
			error
		});
	}
}

export async function createNewUser(req: any, res: any, next: any) {
	try {
		const { username: usernameInput } = req.body;

		const newUser = await createNewUserHelper(usernameInput);
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

// ---------------------------------------
// EXERCISES
// ---------------------------------------
export async function createExercise(req: any, res: any, next: any) {
	try {
		const { description, duration } = req.body;
		const { _id: userID } = req.params;
		const date = checkDate(req.body.date);

		const foundUser = await findUserByID(userID);
		await createNewExercise(description, duration, date, userID);

		res.status(200).json({
			...foundUser,
			description,
			duration: parseInt(duration),
			date
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error in createExercise',
			error
		});
	}
}

// ---------------------------------------
// LOGS
// ---------------------------------------
export async function getUserExerciseLog(req: any, res: any, next: any) {
	// GET /api/users/:_id/logs?[from][&to][&limit]
	try {
		const { _id: userID } = req.params;
		const { from, to, limit } = req.query ?? {};
		console.log({ from, to, limit });

		const foundUser = await findUserByID(userID);
		const exercises = await getUserExercises(userID);

		const log = exercises.map(({ description, duration, date }) => {
			return { description, duration, date };
		});

		res.status(200).json({
			...foundUser,
			count: exercises.length,
			log
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error in getUserExerciseLog',
			error
		});
	}
}
