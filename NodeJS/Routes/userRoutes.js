import { loginUser, registerUser } from "../Controller/userController.js";

export function userRoutes(app){
    app.post("/register-user",registerUser);
    app.post("/login-user",loginUser);
} 