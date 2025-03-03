import userModel from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register User
export function registerUser(req,res){
      const {fullName, email, password} = req.body;
       userModel.findOne({email}).then(data => {
        if(data){
            return res.status(403).json({message:"User already exist"})
        }
        const newUser = new userModel({
            fullName, 
            email,
            password: bcrypt.hashSync(password, 10),
        });
        newUser.save().then((data)=>{
            return res.status(201).json({message: data})
        }).catch((err) => res.status(500).json({message: err.message}))
       })
}

// Login User
export function loginUser(req,res){
    const {email, password} = req.body;

    userModel.findOne({email}).then(data => {
        if(!data){
            return res.status(404).json({message: "User not Found"})
        }
        let validPassword = bcrypt.compareSync(password, data.password);
        if(!validPassword){
            return res.status(404).json({message: "Invalid password"})
        }

        let token = jwt.sign({id:data._id},"secretkey",{expiresIn:"10m"});

        res.send({
            user: {
                email:data.email,
                fullName: data.fullName
            },
            accessToken : token,
        })
    }).catch((err) => res.status(500).send({message: err.message}));
}