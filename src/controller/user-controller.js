import { v4 as uuidv4 } from 'uuid';
import UserService from '../service/user-service.js';
import { validateUsername, validatePassword } from './validator.js';
import { ErrorResponse, SuccessResponse } from './http-response.js';

async function register(req, res) {
    try {
        const { username, password } = req.body;

        const usernameValidation = validateUsername(username);
        if (!usernameValidation.valid) {
            return ErrorResponse({
                res,
                statusCode: 400,
                message: usernameValidation.errors,
            });
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
            return ErrorResponse({
                res,
                statusCode: 400,
                message: passwordValidation.errors,
            });
        }

        const existingUser = await UserService.findUserByUsername(username);
        if (existingUser) {
            return ErrorResponse({
                res,
                statusCode: 409,
                message: 'Username already exists.',
            });
        }

        await UserService.createUser(username, password);
        return SuccessResponse({
            res,
            statusCode: 201,
            message: 'User created.',
            payload: { username },
        });
    } catch (error) {
        return ErrorResponse({
            res,
            statusCode: 500,
            message: 'Failed to register user.',
        });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        const usernameValidation = validateUsername(username);
        if (!usernameValidation.valid) {
            return ErrorResponse({
                res,
                statusCode: 400,
                message: usernameValidation.errors,
            });
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
            return ErrorResponse({
                res,
                statusCode: 400,
                message: passwordValidation.errors,
            });
        }

        const user = await UserService.findUserByUsername(username);
        if (!user) {
            return ErrorResponse({
                res,
                statusCode: 404,
                message: 'User not found.',
            });
        }

        const isPasswordValid = await UserService.comparePassword(
            password,
            user.password
        );
        if (!isPasswordValid) {
            return ErrorResponse({
                res,
                statusCode: 401,
                message: 'Invalid credentials.',
            });
        }

        const token = uuidv4();
        await UserService.saveUserToken(user._id, token);

        return SuccessResponse({
            res,
            statusCode: 200,
            message: 'Login successful.',
            payload: { token, username, user_id: user._id },
        });
    } catch (error) {
        return ErrorResponse({
            res,
            statusCode: 500,
            message: 'Failed to login.',
        });
    }
}

async function updateUser(req, res) {
    try {
        const id = req.user._id;
        const { username, password } = req.body;

        const user = await UserService.findUserById(id);
        if (!user) {
            return ErrorResponse({
                res,
                statusCode: 404,
                message: 'User not found.',
            });
        }

        if (username && username !== user.username) {
            const existingUser = await UserService.findUserByUsername(username);
            if (existingUser) {
                return ErrorResponse({
                    res,
                    statusCode: 409,
                    message: 'Username already exists.',
                });
            }

            const usernameValidation = validateUsername(username);
            if (!usernameValidation.valid) {
                return ErrorResponse({
                    res,
                    statusCode: 400,
                    message: usernameValidation.errors,
                });
            }

            user.username = username;
        }

        if (password) {
            const passwordValidation = validatePassword(password);
            if (!passwordValidation.valid) {
                return ErrorResponse({
                    res,
                    statusCode: 400,
                    message: passwordValidation.errors,
                });
            }

            user.password = await UserService.hashPassword(password);
        }

        const updatedUser = await UserService.updateUser(id, user);
        return SuccessResponse({
            res,
            statusCode: 200,
            message: 'Profile updated.',
            payload: { username: updatedUser.username },
        });
    } catch (error) {
        return ErrorResponse({
            res,
            statusCode: 500,
            message: 'Failed to update profile.',
        });
    }
}

async function logout(req, res) {
    try {
        await UserService.saveUserToken(req.user._id, null);
        return SuccessResponse({
            res,
            statusCode: 200,
            message: 'Logout successful.',
        });
    } catch (error) {
        return ErrorResponse({
            res,
            statusCode: 500,
            message: 'Failed to logout.',
        });
    }
}

export { register, login, updateUser, logout };
