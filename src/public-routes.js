import express from "express";

import userController from "./controller/user-controller.js";
import videoController from "./controller/video-controller.js";
import productController from "./controller/product-controller.js";
import commentController from "./controller/comment-controller.js";

const publicRouter = new express.Router();

publicRouter.post("/api/auth/register", userController.register)
publicRouter.post("/api/auth/login", userController.login)

publicRouter.get("/api/videos", videoController.getAllVideos)
publicRouter.get("/api/videos/:id", videoController.getVideoById)

publicRouter.get("/api/products", productController.getAllProducts)
publicRouter.get("/api/products/:id", productController.getProductbyId)
publicRouter.get("/api/products/video/:id", productController.getProductsByVideoId)

publicRouter.get("/api/comments/video/:id", commentController.getCommentsByVideoId)

export default publicRouter;