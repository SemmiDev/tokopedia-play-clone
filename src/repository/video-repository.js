import Video from '../model/video.js';

const VideoRepository = {
    create: (videoData) => Video.create(videoData),
    findById: (videoId) => Video.findById(videoId),
    findAll: () => Video.find().sort({timestamp: -1}),
    update: (videoId, videoData) => Video.findByIdAndUpdate(videoId, videoData, {new: true}),
    delete: (videoId) => Video.findByIdAndDelete(videoId),
    findVideoAndUserById: (videoId) => Video.findById(videoId).populate('user_id', '_id username'),
    findAllVideosAndUsers: () => Video.find().populate('user_id', '_id username'),
};

export default VideoRepository;
