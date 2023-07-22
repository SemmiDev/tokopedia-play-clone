import Comment from '../model/comment.js';

const CommentRepository = {
    create: (commentData) => Comment.create(commentData),
    findById: (commentId) => Comment.findById(commentId),
    findByVideoId: (videoId) => Comment.find({video_id: videoId}).populate('user_id').sort({timestamp: 1}),
    findAll: () => Comment.find(),
    update: (commentId, commentData) => Comment.findByIdAndUpdate(commentId, commentData, {new: true}),
    delete: (commentId) => Comment.findByIdAndDelete(commentId),
};

export default CommentRepository;
