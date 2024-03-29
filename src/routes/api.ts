import express from 'express';
import {
	getUsers,
	createNewUser,
	createExercise,
	getUserExerciseLog
} from '../controllers/usersController';

// Create the router. Here we will add to the router
export const router = express.Router();

// USERS
// ----------------------------------------
router.post('/users', createNewUser);
router.get('/users', getUsers);

// USERS - EXERCISE
// ----------------------------------------
router.post('/users/:_id/exercises', createExercise);

// USERS - LOGS
// ----------------------------------------
router.get('/users/:_id/logs', getUserExerciseLog);
