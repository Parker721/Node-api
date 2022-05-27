import mongoose from 'mongoose'
const {Schema,model}=mongoose

const noteSchema = new Schema({
    content:
    {
       type: String,
       required:true,
       unique: false,
       trim:true
    },
   
    important:{

     type: Boolean,
     required:true,
     trim: true
    },
    
    user_Id:{
        type:Schema.Types.ObjectId,
        ref:'User',
       
    } 
    }
    ,{
    timestamps: true,
    versionKey: false
})
export const Note = model('Note',noteSchema)
noteSchema.set('toJSON',{
    transform: (document,returnedObject)=>{
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    }
})


