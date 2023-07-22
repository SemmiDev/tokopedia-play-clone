import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    video_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
