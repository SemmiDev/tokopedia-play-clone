import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    youtube_link: { type: String, required: true },
    thumbnail: { type: String },
    timestamp: { type: Date, default: Date.now },
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
