import {Note} from '../models/Note.js'
import {User} from '../models/user.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import userExtractor from '../middleware/userExtractor.js'

export const  get_notes = async (request,response) =>{
   const notes = await Note.find({})
    response.json(notes)

}


export const get_note = async (request,response,next) =>{
    const {id}=request.params
    try{
    const note = await Note.findById(id)
        note?
            response.json(note)
        :
        
            response.status(404).end()
        
        }catch(err){ 
            next(err)
        }
}

export const post_note =(  async  (request,response)=>{
    try{
    const {user_Id} = request.body
    
   
    const user = await User.findOne({user_Id})
    const note= Note(request.body)
 
    
    const savedNote= await note.save()
    user.Notes=user.Notes.concat(savedNote._id)
    await user.save()
    response.json(savedNote)
    }catch(err){
        console.log(err)
    }
 })

 export const put_note =(async (request,response,next)=>{
    const {id}=request.params
  
    
    
  
    const results = await Note.findByIdAndUpdate({_id:id},request.body,{new:true})
    response.json(results)
    
})

export const delete_note =async (request,response,next)=>{
    const {id}=request.params
    try
    {

       await Note.findByIdAndDelete(id)
    }catch(err){
        next(err)
    }
}