import CommentService from '../service/comment-service.js';
import { ErrorResponse, SuccessResponse } from './http-response.js';
import { validateCommentText } from './validator.js';

async function createComment(req, res) {
    try {
        const user_id = req.user.id;
        const { video_id, text } = req.body;

        const commentTextValidation = validateCommentText(text);
        if (!commentTextValidation.valid) {
            return ErrorResponse({
                res,
                statusCode: 400,
                message: commentTextValidation.errors,
            });
        }

        const newComment = await CommentService.createComment({
            user_id,
            video_id,
            text,
        });
        return SuccessResponse({
            res,
            statusCode: 201,
            message: 'Comment created.',
            payload: newComment,
        });
    } catch (error) {
        return ErrorResponse({
            res,
            statusCode: 500,
            message: 'Failed to create comment.',
        });
    }
}

async function getCommentsByVideoId(req, res) {
    try {
        const { id } = req.params;
        const comments = await CommentService.findCommentByVideoId(id);
        return SuccessResponse({
            res,
            statusCode: 200,
            message: 'Success',
            payload: comments,
        });
    } catch (error) {
        return ErrorResponse({
            res,
            statusCode: 500,
            message: 'Failed to fetch comments.',
        });
    }
}

// SSE route to send live comments
async function liveComment(req, res) {
    const { id } = req.params;
    console.log('Client connected to live comments:', id);

    // Set response headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    let lastCommentTimestamp = 0;

    // Function to send live comments to the client
    const sendLiveComments = async () => {
        try {
            // Get comments created after the last comment timestamp
            const comments = await CommentService.findCommentByVideoIdAfterTimestamp(
                id,
                lastCommentTimestamp
            );

            // Update the last comment timestamp
            if (comments.length > 0) {
                lastCommentTimestamp = comments[comments.length - 1].timestamp;
            }

            console.log('Sending live comments:', comments);
            res.write(`data: ${JSON.stringify(comments)}\n\n`);
        } catch (error) {
            console.error('Error occurred while sending live comments:', error);
        }
    };

    // Immediately send the initial comments to the client
    await sendLiveComments();

    // Periodically send comments to the client (adjust the interval as needed)
    const interval = setInterval(sendLiveComments, 2000);

    // Clean up when the client disconnects
    res.on('close', () => {
        clearInterval(interval);
    });
}


export { createComment, getCommentsByVideoId, liveComment };
