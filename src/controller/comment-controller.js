import CommentService from "../service/comment-service.js";
import { ErrorResponse, SuccessResponse } from "./http-response.js";
import {validateCommentText} from "./validator.js";

async function createComment(req, res) {
    try {
        const user_id = req.user.id;
        const { video_id, text } = req.body;

        const { valid: textValid, message: textMessage } = validateCommentText(text);
        if (!textValid) {
            return ErrorResponse({ res, statusCode: 400, message: textMessage });
        }

        const newComment = await CommentService.createComment({ user_id, video_id, text });
        return SuccessResponse({ res, statusCode: 201, message: 'Comment created.', payload: newComment });
    } catch (error) {
        return ErrorResponse({ res, statusCode: 500, message: 'Failed to create comment.' });
    }
}

async function getCommentsByVideoId(req, res) {
    try {
        const { id } = req.params;
        const { valid, message } = validator.validateVideoId(id);
        if (!valid) {
            return ErrorResponse({ res, statusCode: 400, message });
        }

        const comments = await CommentService.findCommentByVideoId(id);
        return SuccessResponse({ res, statusCode: 200, message: 'Success', payload: comments });
    } catch (error) {
        return ErrorResponse({ res, statusCode: 500, message: 'Failed to fetch comments.' });
    }
}

export { createComment, getCommentsByVideoId };
