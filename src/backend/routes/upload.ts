import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { pipeline } from 'stream/promises'
import fs from 'fs'
import { FileUtils } from '../utils/fileUtils'
import { UploadResponse } from '../index'

interface UploadRequest extends FastifyRequest {
  file: () => AsyncIterableIterator<any> & {
    filename: string
    mimetype: string
    file: NodeJS.ReadableStream
  }
}

export async function uploadRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/api/upload',
    async (request: UploadRequest, reply: FastifyReply): Promise<UploadResponse> => {
      try {
        const data = await request.file()

        if (!data) {
          reply.code(400)
          return {
            success: false,
            error: 'File not provided',
          }
        }

        if (!FileUtils.isAllowedFileType(data.filename, data.mimetype)) {
          reply.code(400)
          return {
            success: false,
            error: 'Only PDF and Markdown files are allowed',
          }
        }

        await FileUtils.ensureUploadDir()

        const filename = `${Date.now()}-${data.filename}`
        const filePath = FileUtils.getUploadPath(filename)

        await pipeline(data.file, fs.createWriteStream(filePath))

        return {
          success: true,
          message: 'File uploaded successfully',
          filename: filename,
          originalName: data.filename,
        }
      } catch (error) {
        fastify.log.error(error)
        reply.code(500)
        return {
          success: false,
          error: 'Error uploading file',
        }
      }
    },
  )
}
