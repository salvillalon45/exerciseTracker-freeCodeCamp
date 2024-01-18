import express from 'express';
import { getUsers, createNewUser } from '../controllers/usersController';

// Create the router. Here we will add to the router
export const router = express.Router();

// USERS
// ----------------------------------------
router.post('users', createNewUser);
router.get('/users', getUsers);
