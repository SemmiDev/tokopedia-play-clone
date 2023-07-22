import express from "express";
import {login, register} from "./controller/user-controller.js";
import {getAllVideos, getVideoById} from "./controller/video-controller.js";
import {getAllProducts, getProductbyId, getProductsByVideoId} from "./controller/product-controller.js";
import {getCommentsByVideoId, liveComment} from "./controller/comment-controller.js";

const publicRouter = new express.Router();

publicRouter.post("/api/auth/register", register)
publicRouter.post("/api/auth/login", login)

publicRouter.get("/api/videos", getAllVideos)
publicRouter.get("/api/videos/:id", getVideoById)

publicRouter.get("/api/products", getAllProducts)
publicRouter.get("/api/products/:id", getProductbyId)
publicRouter.get("/api/products/video/:id", getProductsByVideoId)

publicRouter.get("/api/comments/video/:id", getCommentsByVideoId)
publicRouter.get("/api/comments/live/video/:id", liveComment)

export default publicRouter;
