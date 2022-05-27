import bcrypt from "bcrypt"
import { User } from "../models/user.js"
import Router from 'express'
import jwt from "jsonwebtoken"
import 'dotenv/config'


export const loginRouter=Router()


loginRouter.post('/', async (req, res) => {
    const {body} = req
    const {username,password}= body

    const user = await User.findOne({username})
    const passwordCorrect = user=== null
        ? false
        : await bcrypt.compare(password,user.password)
        if(!(user&&passwordCorrect)) {

        res.status(401).json({
                eror:"invalid user o password"
            })
        }
     
    const userForToken=  {
        id:user._id,
        username:user.username
        }     
        
        const token = jwt.sign(userForToken,process.env.SECRET) 
        const objeto={
            name:user.name,
            username:user.username,
            token
        }
        console.log(token)
    res.send({
        auth:true,token
    })
    
})
export default loginRouter