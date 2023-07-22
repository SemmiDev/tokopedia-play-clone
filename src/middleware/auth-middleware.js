import UserService from "../service/user-service.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end();
    } else {
        const user = await UserService.findUserByToken(token);
        if (!user) {
            res.status(401).json({
                errors: "Unauthorized"
            }).end();
        } else {
            req.user = user;
            next();
        }
    }
}