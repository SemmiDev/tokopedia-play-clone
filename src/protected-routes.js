import express from "express";
import {authMiddleware} from "./middleware/auth-middleware.js";
import userController from "./controller/user-controller.js";
import videoController from "./controller/video-controller.js";
import productController from "./controller/product-controller.js";
import commentController from "./controller/comment-controller.js";

const protectedRouter = new express.Router();
protectedRouter.use(authMiddleware);

protectedRouter.post("/api/auth/logout", userController.logout)
protectedRouter.put("/api/users", userController.updateUser)

protectedRouter.post("/api/videos", videoController.createVideo)
protectedRouter.put("/api/videos/:id", videoController.updateVideo)
protectedRouter.delete("/api/videos/:id", videoController.deleteVideo)

protectedRouter.post("/api/products", productController.createProduct)
protectedRouter.put("/api/products/:id", productController.updateProduct)
protectedRouter.delete("/api/products/:id", productController.deleteProduct)

protectedRouter.post("/api/comments", commentController.createComment)

export default protectedRouter;