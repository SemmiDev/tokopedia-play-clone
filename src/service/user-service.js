import bcrypt from 'bcrypt';
import UserRepository from '../repository/user-repository.js';

const UserService = {
    async createUser(username, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userToCreate = { username, password: hashedPassword };
        return UserRepository.create(userToCreate);
    },

    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    },

    async comparePassword(inputPassword, hashedPassword) {
        return bcrypt.compare(inputPassword, hashedPassword);
    },

    async saveUserToken(userId, token) {
        return UserRepository.saveToken(userId, token);
    },

    async findUserById(userId) {
        return UserRepository.findById(userId);
    },

    async findUserByUsername(username) {
        return UserRepository.findByUsername(username);
    },

    async findAllUsers() {
        return UserRepository.findAll();
    },

    async updateUser(userId, userData) {
        return UserRepository.update(userId, userData);
    },

    async deleteUser(userId) {
        return UserRepository.delete(userId);
    },
    findUserByToken(token) {
        return UserRepository.findByToken(token);
    }
};

export default UserService;
