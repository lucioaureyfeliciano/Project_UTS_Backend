const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const usersService = require('./users-service');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { hashPassword, passwordMatched } = require('../../../utils/password');

async function getUsers(request, response, next) {
  try {
    const users = await usersService.getUsers();
    return response.status(200).json(users);
  } catch (error) {
    return next(error);
  }
}

async function getUser(request, response, next) {
  try {
    const { userId } = request.params;

    const user = await usersService.getUser(userId);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

async function createUser(request, response, next) {
  try {
    const {
      email,
      password,
      username,
      confirm_password: confirmPassword,
    } = request.body;

    if (!email) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is required');
    }

    if (!username) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Username is required');
    }

    if (await usersService.emailExists(email)) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email already exists'
      );
    }

    if (!password || password.length < 8) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password must be at least 8 characters long'
      );
    }

    if (password !== confirmPassword) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Password and confirm password do not match'
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await usersService.createUser(email, hashedPassword, username);

    if (!user) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create user'
      );
    }

    return response.status(201).json({
      message: 'User created successfully',
      userId: user.userId,
    });
  } catch (error) {
    return next(error);
  }
}

async function updateUser(request, response, next) {
  try {
    const { userId } = request.params;
    const { email, username } = request.body;

    if (!request.user || request.user.userId !== userId) {
      throw errorResponder(errorTypes.FORBIDDEN, 'Access denied');
    }

    const user = await usersService.getUser(userId);
    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    if (!email) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Email is required');
    }

    if (!username) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Username is required');
    }

    if (email !== user.email && (await usersService.emailExists(email))) {
      throw errorResponder(
        errorTypes.EMAIL_ALREADY_TAKEN,
        'Email already exists'
      );
    }

    const success = await usersService.updateUser(userId, email, username);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update user'
      );
    }

    return response.status(200).json({
      message: 'User updated successfully',
    });
  } catch (error) {
    return next(error);
  }
}

async function changePassword(request, response, next) {
  try {
    const { userId } = request.params;
    const {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_new_password: confirmNewPassword,
    } = request.body;

    if (!request.user || request.user.userId !== userId) {
      throw errorResponder(errorTypes.FORBIDDEN, 'Access denied');
    }

    const user = await usersService.getUser(userId);
    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    const isOldPasswordValid = await passwordMatched(
      oldPassword,
      user.password
    );

    if (!isOldPasswordValid) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Old password is incorrect'
      );
    }

    if (!newPassword || newPassword.length < 8) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'New password must be at least 8 characters long'
      );
    }

    if (oldPassword === newPassword) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'New password must be different from the old password'
      );
    }

    if (newPassword !== confirmNewPassword) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'New password and confirm new password do not match'
      );
    }

    const hashedNewPassword = await hashPassword(newPassword);

    const success = await usersService.changePassword(
      userId,
      hashedNewPassword
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to change password'
      );
    }

    return response.status(200).json({
      message: 'Password changed successfully',
    });
  } catch (error) {
    return next(error);
  }
}

async function deleteUser(request, response, next) {
  try {
    const { userId } = request.params;

    if (!request.user || request.user.userId !== userId) {
      throw errorResponder(errorTypes.FORBIDDEN, 'Access denied');
    }

    const success = await usersService.deleteUser(userId);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete user'
      );
    }

    return response.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  changePassword,
  deleteUser,
};
