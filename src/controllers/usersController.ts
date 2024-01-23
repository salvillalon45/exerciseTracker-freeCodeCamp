import {
	createNewExercise,
	createNewLog,
	createNewUserHelper,
	findManyUsers,
	findUserByID
} from '../utils/apiUtils';
import { checkDate, isValidDateInput } from '../utils';

// ---------------------------------------
// USERS
// ---------------------------------------
export async function getUsers(req: any, res: any, next: any) {
	try {
		const users = await findManyUsers();

		res.status(200).json(users);
	} catch (error) {
		console.log(error);
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
		console.log(error);
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

		await createNewExercise(description, duration, date, userID);
		await createNewLog(description, duration, date, userID);

		const foundUser = await findUserByID(userID);
		const { _id, username } = foundUser;
		console.log('What is foundUser');
		console.log(foundUser);

		res.status(200).json({
			_id,
			username,
			description,
			duration: parseInt(duration),
			date
		});
	} catch (error) {
		console.log(error);
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
		let logs = foundUser.log ?? [];

		// Check for query params
		// Check for from
		if (isValidDateInput(from)) {
			logs = logs.filter(({ date }) => {
				return Date.parse(date) >= Date.parse(from);
			});
		}
		// Check for to
		if (isValidDateInput(to)) {
			logs = logs.filter(({ date }) => {
				return Date.parse(date) <= Date.parse(to);
			});
		}
		// Check for limit
		const limitCheck = parseInt(limit);
		if (limitCheck) {
			// They entered a number!
			logs = logs.slice(0, limit);
		}

		res.status(200).json({
			...foundUser,
			count: logs.length,
			log: logs
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Error in getUserExerciseLog',
			error
		});
	}
}
