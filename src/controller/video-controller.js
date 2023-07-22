import VideoService from '../service/video-service.js';
import { ErrorResponse, SuccessResponse } from "./http-response.js";

async function createVideo(req, res) {
    try {
        const user_id = req.user._id;
        const { youtube_link, title } = req.body;

        const videoData = {
            user_id,
            title,
            youtube_link,
        };

        const youtubeVideoId = await VideoService.extractYouTubeVideoId(videoData.youtube_link);
        videoData.thumbnail = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;

        const newVideo = await VideoService.createVideo(videoData);
        return SuccessResponse({ res, statusCode: 201, message: 'Video created.', payload: newVideo });
    } catch (error) {
        return ErrorResponse({ res, statusCode: 500, message: 'Failed to create video.' });
    }
}

async function getAllVideos(req, res) {
    try {
        const videos = await VideoService.findAllVideosAndUsers();
        return SuccessResponse({ res, statusCode: 200, message: 'Success', payload: videos });
    } catch (error) {
        return ErrorResponse({ res, statusCode: 500, message: 'Failed to fetch videos.' });
    }
}

async function getVideoById(req, res) {
    try {
        const { id } = req.params;
        const video = await VideoService.findVideoAndUserById(id);

        if (!video) {
            return ErrorResponse({ res, statusCode: 404, message: 'Video not found.' });
        }

        video.youtube_id = await VideoService.extractYouTubeVideoId(video.youtube_link);
        return SuccessResponse({ res, statusCode: 200, message: 'Success', payload: video });
    } catch (error) {
        return ErrorResponse({ res, statusCode: 500, message: 'Failed to fetch video.' });
    }
}

async function updateVideo(req, res) {
    try {
        const { id } = req.params;
        const { youtube_link, title } = req.body;

        const videoData = { youtube_link };

        const youtubeVideoId = await VideoService.extractYouTubeVideoId(videoData.youtube_link);
        videoData.thumbnail = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;

        const updatedVideo = await VideoService.updateVideo(id, videoData);
        return SuccessResponse({ res, statusCode: 200, message: 'Video updated.', payload: updatedVideo });
    } catch (error) {
        return ErrorResponse({ res, statusCode: 500, message: 'Failed to update video.' });
    }
}

async function deleteVideo(req, res) {
    try {
        const { id } = req.params;
        await VideoService.deleteVideo(id);
        return SuccessResponse({ res, statusCode: 200, message: 'Video deleted.' });
    } catch (error) {
        return ErrorResponse({ res, statusCode: 500, message: 'Failed to delete video.' });
    }
}

export { createVideo, getAllVideos, getVideoById, updateVideo, deleteVideo };
