import express from "express";
import {authMiddleware} from "./middleware/auth-middleware.js";
import {logout, updateUser} from "./controller/user-controller.js";
import {createVideo, deleteVideo, updateVideo} from "./controller/video-controller.js";
import {createProduct, deleteProduct, updateProduct} from "./controller/product-controller.js";
import {createComment} from "./controller/comment-controller.js";

const protectedRouter = new express.Router();
protectedRouter.use(authMiddleware);

protectedRouter.post("/api/auth/logout", logout)
protectedRouter.put("/api/users", updateUser)

protectedRouter.post("/api/videos", createVideo)
protectedRouter.put("/api/videos/:id", updateVideo)
protectedRouter.delete("/api/videos/:id", deleteVideo)

protectedRouter.post("/api/products", createProduct)
protectedRouter.put("/api/products/:id", updateProduct)
protectedRouter.delete("/api/products/:id", deleteProduct)

protectedRouter.post("/api/comments", createComment)

export default protectedRouter;
