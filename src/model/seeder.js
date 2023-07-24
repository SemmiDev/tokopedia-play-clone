import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from "./user.js";
import Product from "./product.js";
import Video from "./video.js";
import Comment from "./comment.js";
import { v4 as uuidv4 } from 'uuid';
import VideoService from "../service/video-service.js";

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const seedData = async () => {
    try {
        // Clear existing data (optional)
        await Comment.deleteMany({});
        await Product.deleteMany({});
        await Video.deleteMany({});
        await User.deleteMany({});

        const users = [];

        // Seed 10 User data with hashed passwords and generate tokens
        for (let i = 1; i <= 10; i++) {
            const password = 'Password' + i;
            const hashedPassword = await hashPassword(password);

            const token = uuidv4();
            const user = await User.create({
                username: 'user_' + i,
                password: hashedPassword,
                token
            });

            users.push(user);
        }

        // Seed 10 Video data
        for (let i = 1; i <= 10; i++) {
            const youtubeLink = "https://www.youtube.com/watch?v=gPTWt6GPWHw";
            const youtubeVideoId = await VideoService.extractYouTubeVideoId(youtubeLink);
            const video = await Video.create({
                user_id: users[i - 1]._id, // Use the ObjectId of the created User
                title: 'Video ' + i,
                youtube_link: youtubeLink,
                youtube_id: youtubeVideoId,
                thumbnail: `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`,
                views: Math.floor(Math.random() * 1000) + 1,
            });

            // Seed 10 Product data with references to Video
            for (let j = 1; j <= 10; j++) {
                await Product.create({
                    video_id: video._id, // Use the ObjectId of the created Video
                    name: 'Product ' + j,
                    product_link: 'https://shopee.co.id/Dyson-V11-%E2%84%A2-Absolute-Cordless-Vacuum-Cleaner-(Iron-Blue)-Penyedot-Debu-i.317011437.7555323047?sp_atk=0e513674-3bc1-4799-9116-e485fdac81d5&xptdk=0e513674-3bc1-4799-9116-e485fdac81d5',
                    price: Math.floor(Math.random() * 100) + 1,
                });
            }

            // Seed 10 Comment data for each User
            for (let j = 1; j <= 10; j++) {
                await Comment.create({
                    user_id: users[j - 1]._id, // Use the ObjectId of the created User
                    video_id: video._id, // Use the ObjectId of the created Video
                    text: 'Comment ' + j,
                });
            }
        }

        console.log('Seeding User, Comment, Product, and Video data completed successfully!');
    } catch (err) {
        console.error('Error seeding User, Comment, Product, and Video data:', err);
    }
};

export default seedData;
