import {fastify} from 'fastify'
// import { DatabaseMemory } from './database_memory.js'
import { DatabasePostgres } from './database_postgres.js';

// GET, POST, PUT, DELETE, PATCH

const server = fastify()
// const database = new DatabaseMemory();
const database = new DatabasePostgres();

server.get('/', () => {
    return 'home'
})

// POST localhost:3000/videos
// PUT localhost:3000/videos/3

server.post('/videos', async (request, reply) => {
    const {title, description, duration} = request.body
    
    await database.create({
        title: title,
        description: description,
        duration: duration,
    })
    // console.log(database.list())
    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search

    console.log(search)
    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body
    
    await database.update(videoId, {
        title,
        description,
        duration
    })
    return reply.status(204)
})

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port:3000,
})
