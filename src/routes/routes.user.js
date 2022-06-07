import Router from 'express';

import{get_users,get_user,post_user,put_user} from '../controllers/user.controller.js'
const userRouter=Router()


userRouter.post('/api/users',post_user)

userRouter.get('/api/users',get_users)

userRouter.get('/api/users/:id',get_user)
userRouter.put('/api/users/:id',put_user)

export default userRouter