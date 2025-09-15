import fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import { multipartPlugin } from './plugins/multipart'
import { uploadRoutes } from './routes/upload'
import { fileRoutes } from './routes/files'

const server: FastifyInstance = fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
})

async function startServer(): Promise<void> {
  try {
    await server.register(cors, {
      origin: true,
      methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type'],
    })

    await server.register(multipartPlugin)

    await server.register(uploadRoutes)
    await server.register(fileRoutes)

    const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000
    const HOST = process.env.HOST || '0.0.0.0'

    await server.listen({ port: PORT, host: HOST })

    server.log.info(`Server started at http://${HOST}:${PORT}`)
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
}

;['SIGINT', 'SIGTERM'].forEach((signal) => {
  process.on(signal, async () => {
    server.log.info(`Received ${signal} signal, stopping server...`)
    await server.close()
    process.exit(0)
  })
})

startServer()
