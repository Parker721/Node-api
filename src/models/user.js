import mongoose from 'mongoose'


const {Schema,model}= mongoose

const userSchema = new Schema({
    name: 
    {
       type: String,
       required: false,
       unique: false,
       trim: true,
    },
    username:
    {
        type:String,
        required: true,
        unique: false,
        trim: true,
    } ,
    password:
    {
        type:String,
        required: true,
        unique: false,
        trim: true,
    },
    Notes:[
        {
            type:Schema.Types.ObjectId,
            ref:'Note',
            required: false
        }
    ]
    
})
userSchema.set('toJSON',{
    transform: (document,returnedObject)=>{
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
    }
})

export const User = model('User',userSchema)