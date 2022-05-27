import Router from 'express';
import bcrypt from 'bcrypt';

import {User} from '../models/user.js';

 const userRouter=Router()


userRouter.post('/',async (request,response) => {
    const {body} = request
    const user = User(body)
    const saltRounds = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,saltRounds)
    console.log(user)
    await user.save()
    response.json(user)

})

userRouter.get('/', async (request,response) => {
    const users=await User.find({})
    response.json(users)
})

userRouter.get('/:id', async (request,response,next) => {
    const {id}=request.params

    
    try{
        const user = await User.findById(id)
            user?
                response.json(user)
            :
            
                response.status(404).end()
            
            }catch(err){ 
                next(err)
            }

    
})

export default userRouter