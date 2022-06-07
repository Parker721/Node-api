import express from 'express';
import 'dotenv/config'
import "./mongo.js"
import notesRoute from './routes/routes.notes.js'
import userRouter from './routes/routes.user.js'
import loginRouter from './routes/routes.login.js'
import handleError  from './middleware/handleError.js'
import notFound from './middleware/notFound.js'
import cors from 'cors'

const app= express()
app.use(express.json())
app.use(cors())
app.use(loginRouter);
app.use(notesRoute)
app.use(userRouter)
app.use(handleError)
app.use(notFound)

export default app