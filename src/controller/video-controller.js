import VideoService from '../service/video-service.js';
import isAuthorized from './authorization.js'
import { ErrorResponse, SuccessResponse } from './http-response.js';
import { validateVideoTitle } from './validator.js';

async function createVideo(req, res) {
    try {
        const user_id = req.user._id;
        const { youtube_link, title } = req.body;

        const videoTitleValidation = validateVideoTitle(title);
        if (!videoTitleValidation.valid) {
            return ErrorResponse({
                res,
                statusCode: 400,
                message: videoTitleValidation.errors,
            });
        }

        const videoData = {
            user_id,
            title,
            youtube_link,
        };

        const youtubeVideoId = await VideoService.extractYouTubeVideoId(
            videoData.youtube_link
        );

        videoData.youtube_id = youtubeVideoId
        videoData.thumbnail = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;

        const newVideo = await VideoService.createVideo(videoData);
        return SuccessResponse({
            res,
            statusCode: 201,
            message: 'Video created.',
            payload: newVideo,
        });
    } catch (error) {

        return ErrorResponse({
            res,
            statusCode: 500,
            message: 'Failed to create video.',
        });
    }
}

async function getAllVideos(req, res) {
    try {
        const videos = await VideoService.findAllVideosAndUsers();
        return SuccessResponse({
            res,
            statusCode: 200,
            message: 'Success',
            payload: videos,
        });
    } catch (error) {

        return ErrorResponse({
            res,
            statusCode: 500,
            message: 'Failed to fetch videos.',
        });
    }
}

async function getVideoById(req, res) {
    try {
        const { id } = req.params;
        const video = await VideoService.findVideoAndUserById(id);

        if (!video) {
            return ErrorResponse({
                res,
                statusCode: 404,
                message: 'Video not found.',
            });
        }

        video.views = video.views + 1;

        await VideoService.updateVideo(id, { views: video.views });

        return SuccessResponse({
            res,
            statusCode: 200,
            message: 'Success',
            payload: video,
        });
    } catch (error) {

        return ErrorResponse({
            res,
            statusCode: 500,
            message: 'Failed to fetch video.',
        });
    }
}

async function updateVideo(req, res) {
    try {
        const { user } = req;
        const { id } = req.params;
        const { youtube_link, title } = req.body;

        const video = await VideoService.findVideoById(id);
        if (!video) {
            return ErrorResponse({
                res,
                statusCode: 404,
                message: 'Video not found.',
            });
        }

        if (!isAuthorized(video.user_id.toString(), user._id.toString())) {
            return ErrorResponse({
                res,
                statusCode: 403,
                message: 'Forbidden',
            });
        }

        const videoTitleValidation = validateCommentText(title);
        if (!videoTitleValidation.valid) {
            return ErrorResponse({
                res,
                statusCode: 400,
                message: videoTitleValidation.errors,
            });
        }

        const videoData = { youtube_link, title };

        const youtubeVideoId = await VideoService.extractYouTubeVideoId(
            videoData.youtube_link
        );

        videoData.youtube_id = youtubeVideoId
        videoData.thumbnail = `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`;

        const updatedVideo = await VideoService.updateVideo(id, videoData);
        return SuccessResponse({
            res,
            statusCode: 200,
            message: 'Video updated.',
            payload: updatedVideo,
        });
    } catch (error) {

        return ErrorResponse({
            res,
            statusCode: 500,
            message: 'Failed to update video.',
        });
    }
}

async function deleteVideo(req, res) {
    try {
        const { user } = req;
        const { id } = req.params;

        const video = await VideoService.findVideoById(id);
        if (!video) {
            return ErrorResponse({
                res,
                statusCode: 404,
                message: 'Video not found.',
            });
        }

        if (!isAuthorized(video.user_id.toString(), user._id.toString())) {
            return ErrorResponse({
                res,
                statusCode: 403,
                message: 'Forbidden',
            });
        }

        await VideoService.deleteVideo(id);
        return SuccessResponse({
            res,
            statusCode: 200,
            message: 'Video deleted.',
        });
    } catch (error) {

        return ErrorResponse({
            res,
            statusCode: 500,
            message: 'Failed to delete video.',
        });
    }
}

export { createVideo, getAllVideos, getVideoById, updateVideo, deleteVideo };
