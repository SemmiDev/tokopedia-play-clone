import CommentRepository from '../repository/comment-repository.js';

const CommentService = {
    async createComment(commentData) {
        return CommentRepository.create(commentData);
    },

    async findCommentById(commentId) {
        return CommentRepository.findById(commentId);
    },

    async findCommentByVideoId(videoId) {
        return CommentRepository.findByVideoId(videoId);
    },

    async findAllComment() {
        return CommentRepository.findAll();
    },

    async updateComment(commentId, commentData) {
        return CommentRepository.update(commentId, commentData);
    },

    async deleteComment(commentId) {
        return CommentRepository.delete(commentId);
    },
};

export default CommentService;
