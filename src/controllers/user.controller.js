import { User } from "../models/user.js";
import bcrypt from "bcrypt";


export const get_users = async (req, res) => {
    const users = await User.find({});
    res.json(users);
    }
export const get_user = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    user ? res.json(user) : res.status(404).end();
}



export const post_user = async (req, res) => {
    const { body } = req;
    const { username } = body;
    const userExist = await User.findOne({ username });
    if (userExist) {
        return res.status(400).send({ error: "user already exist" });
    }
    const user = new User(body);
    const saltRounds = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, saltRounds);
    await user.save();
    res.json(user);
}


export const put_user = async (req, res,next) => {
 const { id } = req.params;
try{
const user = await User.findByIdAndUpdate({_id:id},request.body,{new:true})
    
user ? res.json(user) : res.status(404).end();

}catch(e){
    next(e)
}
 

}

