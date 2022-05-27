
import app from "../src/app.js";


const PORT=process.env.PORT ||3006
console.log()
export const server = app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
