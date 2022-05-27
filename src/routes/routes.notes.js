

import Router from 'express';
import  useExtractor from "../middleware/userExtractor.js"
import express from 'express'
import {
    get_notes,
    get_note,
    post_note,
    put_note,
    delete_note
    } from '../controllers/notes.controllers.js'

const notesRoute=Router()
notesRoute.use(express.json())
notesRoute.get("/api/notes",get_notes)
notesRoute.post('/api/notes',useExtractor,post_note)
notesRoute.get('/api/notes/:id',get_note)
notesRoute.put('/api/notes/:id',put_note)
notesRoute.delete('/:id',delete_note)

export default notesRoute