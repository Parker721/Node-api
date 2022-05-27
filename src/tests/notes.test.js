import supertest  from "supertest";
import mongoose from "mongoose";
import { Note } from "../models/Note.js";
import {app , server} from "../index.js"

const api = supertest(app)
const initialNotes=[
    {
    content:"Algo importante va aquí",
    important:true
    },
    {
        content:"Algo importante2",
        important:false
    }
]

test('Notes are returned as json', async () => {
   await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type' ,/application\/json/)
})
test('there are two notes',async () => {
    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length)
})

afterAll(() =>{
    mongoose.connection.close()
    server.close()
})

beforeEach(async() =>{
 /* Paralelo
 promiseObjects=initialNotes.map(note=> new Note(note))
  const promises = notesObjects.map(note=>note.save)
  await promise.all(promises)
  */ 
 
 /* Secuencial */
  for (const note of initialNotes){
      const noteObject = new Note(note)
      await noteObject.save()
  }
})
test('a valid note can be added', async () => {
    const note= {
        content:"una nueva nota!",
        important:true
    }
    await api
            .post('/api/notes')
            .send(note)
            .expect(200)
            .expect('Content-Type' ,/application\/json/)
            const response = await api.get('/api/notes')
            const contents = response.body.map(note1=> note1.content)
            expect(response.body).toHaveLength(initialNotes.length+1)
            expect(contents).toContain(note.content)
    })
       
        