import {
	checkDate,
	createNewUserHelper,
	findManyUsers,
	findUserByID
} from '../utils';

// ---------------------------------------
// USERS
// ---------------------------------------
export async function getUsers(req: any, res: any, next: any) {
	console.log('Inside get Users');
	try {
		const usersDB = await findManyUsers();

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
	console.log('Inside createExercise');
	const { description, duration } = req.body;
	const date = checkDate(req.body.date);

	const { _id: userID } = req.params;

	console.log({ description, duration, userID, date });
	try {
		const foundUser = await findUserByID(userID);
		console.log({ foundUser });

		res.status(200).json({
			...foundUser,
			description,
			duration,
			date
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error in createExercise',
			error
		});
	}
}
