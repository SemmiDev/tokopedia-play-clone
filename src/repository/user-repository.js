import User from '../model/user.js';

const UserRepository = {
    create: (userData) => User.create(userData),
    saveToken: (userId, token) => User.findByIdAndUpdate(userId, {token}, {new: true}),
    findById: (userId) => User.findById(userId),
    findByUsername: (username) => User.findOne({username}),
    findAll: () => User.find(),
    update: (userId, userData) => User.findByIdAndUpdate(userId, userData, {new: true}),
    delete: (userId) => User.findByIdAndDelete(userId),
    findByToken: (token) => User.findOne({token})
};

export default UserRepository;