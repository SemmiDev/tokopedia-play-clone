import VideoRepository from '../repository/video-repository.js';

const VideoService = {
    async createVideo(videoData) {
        return VideoRepository.create(videoData);
    },

    async findVideoById(videoId) {
        return VideoRepository.findById(videoId);
    },

    async findVideoAndUserById(videoId) {
        return VideoRepository.findVideoAndUserById(videoId);
    },

    async findAllVideosAndUsers() {
        return VideoRepository.findAllVideosAndUsers();
    },

    async findAllVideos() {
        return VideoRepository.findAll();
    },

    async updateVideo(videoId, videoData) {
        return VideoRepository.update(videoId, videoData);
    },

    async deleteVideo(videoId) {
        return VideoRepository.delete(videoId);
    },

    async extractYouTubeVideoId(link) {
        const videoIdRegex = /(?:\/embed\/|watch\?v=|\/\d{1,3}x\d{1,3}\/|vi?\/|u\/\w\/|v=|e\/|embed\/|youtu.be\/|v\/)([^#\&\?]*).*/i;
        const match = link.match(videoIdRegex);

        if (match && match[1]) {
            return match[1];
        }

        throw new Error('Invalid YouTube video link');
    },
};

export default VideoService;
