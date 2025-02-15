import {fastify} from 'fastify'
import { DatabaseMemory } from './database_memory.js'

// GET, POST, PUT, DELETE, PATCH

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
    return 'home'
})

// POST localhost:3000/videos
// PUT localhost:3000/videos/3

server.post('/videos', (request, reply) => {
    const {title, description, duration} = request.body
    
    database.create({
        title: title,
        description: description,
        duration: duration,
    })
    // console.log(database.list())
    return reply.status(201).send()
})

server.get('/videos', (request) => {
    const search = request.query.search

    console.log(search)
    const videos = database.list(search)

    return videos
})

server.put('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body
    
    database.update(videoId, {
        title,
        description,
        duration
    })
    return reply.status(204)
})

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id
    database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port:3000,
})
