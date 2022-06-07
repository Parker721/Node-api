import jwt from 'jsonwebtoken'
import 'dotenv/config'

export default (request, response, next) => {
  const authorization = request.get('authorization')
  let token = ''
  const {user_Id} =request.body
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken){
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  console.log(decodedToken)

  

  next()
}