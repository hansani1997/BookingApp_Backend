import express from "express";
import { getAllPaitent, signup, login } from "../controller/paitentController";

const userRouter = express.Router();


userRouter.get("/", getAllPaitent);
userRouter.post("/signup", signup);
userRouter.post("/login", login);

export default userRouter;