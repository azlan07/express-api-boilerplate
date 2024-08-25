const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const userController = {
    // Create User
    createUser: async (req, res, next) => {
        try {
            const { name, email } = req.body;
            const newUser = await prisma.user.create({
                data: { name, email }
            });
            res.status(201).json(newUser);
        } catch (err) {
            if (err.code === 'P2002') {
                res.status(400);
                next(new Error('Email already exists'));
            } else {
                res.status(500);
                next(new Error('Error creating user'));
            }
        }
    },

    // Get All Users
    getAllUsers: async (req, res, next) => {
        try {
            const users = await prisma.user.findMany();
            res.status(200).json(users);
        } catch (err) {
            res.status(500);
            next(new Error('Error fetching users'));
        }
    },

    // Get User by ID
    getUserById: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const user = await prisma.user.findUnique({
                where: { id }
            });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404);
                next(new Error('User not found'));
            }
        } catch (err) {
            res.status(500);
            next(new Error('Error fetching user'));
        }
    },

    // Update User
    updateUser: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            const { name, email } = req.body;
            const updatedUser = await prisma.user.update({
                where: { id },
                data: { name, email }
            });
            res.status(200).json(updatedUser);
        } catch (err) {
            if (err.code === 'P2002') {
                res.status(400);
                next(new Error('Email already exists'));
            } else {
                res.status(500);
                next(new Error('Error updating user'));
            }
        }
    },

    // Delete User
    deleteUser: async (req, res, next) => {
        try {
            const id = parseInt(req.params.id);
            await prisma.user.delete({
                where: { id }
            });
            res.status(204).send();
        } catch (err) {
            res.status(500);
            next(new Error('Error deleting user'));
        }
    }
};

module.exports = userController;
