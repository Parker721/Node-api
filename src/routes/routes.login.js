import bcrypt from "bcrypt"
import { User } from "../models/user.js"
import Router from 'express'
import express  from "express"
import jwt from "jsonwebtoken"
import 'dotenv/config'

export const loginRouter=Router()

loginRouter.post('/api/login' ,async (req, res) => {
    
    const {username,password}= req.body

    const user = await User.findOne({username})
    const passwordCorrect = user=== null
        ?   false   : await bcrypt.compare(password, user.password)  
        if(!(user && passwordCorrect)){
            return res.status(401).send({error: "invalid username or password"})
        }   
     
    const userForToken = {  username: user.username, id: user._id }
        
        const token = jwt.sign(userForToken,process.env.SECRET) 
        const objeto={
            name:user.name,
            username:user.username,
            token
        }
        console.log(token)
        res.send({
            
            username: user.username,
            userId: user.userId,
            token
          })
    
})
export default loginRouter