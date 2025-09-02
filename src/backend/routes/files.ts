import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import fs from 'fs/promises'
import pdf from 'pdf-parse'
import { FileUtils } from '../utils/fileUtils'
import { FileContentResponse, FilesListResponse, DeleteResponse } from '../index'

interface FileParams {
  filename: string
}

export async function fileRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/api/files',
    async (_request: FastifyRequest, reply: FastifyReply): Promise<FilesListResponse> => {
      try {
        const files = await FileUtils.listUploadFiles()
        return {
          success: true,
          files,
        }
      } catch (error) {
        fastify.log.error(error)
        reply.code(500)
        return {
          success: false,
          error: 'Error getting file list',
        }
      }
    },
  )

  fastify.get(
    '/api/file/:filename',
    async (
      request: FastifyRequest<{ Params: FileParams }>,
      reply: FastifyReply,
    ): Promise<FileContentResponse> => {
      try {
        const { filename } = request.params

        if (!FileUtils.isValidFilename(filename)) {
          reply.code(400)
          return {
            success: false,
            error: 'Invalid filename',
          }
        }

        const filePath = FileUtils.getUploadPath(filename)

        try {
          await fs.access(filePath)
        } catch {
          reply.code(404)
          return {
            success: false,
            error: 'File not found',
          }
        }

        if (filename.endsWith('.pdf')) {
          const dataBuffer = await fs.readFile(filePath)
          const data = await pdf(dataBuffer)

          return {
            success: true,
            content: data.text,
            type: 'pdf',
          }
        } else if (filename.match(/\.(md|markdown)$/i)) {
          const content = await fs.readFile(filePath, 'utf8')

          return {
            success: true,
            content: content,
            type: 'markdown',
          }
        } else {
          reply.code(400)
          return {
            success: false,
            error: 'Unsupported file format',
          }
        }
      } catch (error) {
        fastify.log.error(error)
        reply.code(500)
        return {
          success: false,
          error: 'Error reading file',
        }
      }
    },
  )

  fastify.delete(
    '/api/file/:filename',
    async (
      request: FastifyRequest<{ Params: FileParams }>,
      reply: FastifyReply,
    ): Promise<DeleteResponse> => {
      try {
        const { filename } = request.params

        if (!FileUtils.isValidFilename(filename)) {
          reply.code(400)
          return {
            success: false,
            error: 'Invalid filename',
          }
        }

        const filePath = FileUtils.getUploadPath(filename)

        try {
          await fs.access(filePath)
        } catch {
          reply.code(404)
          return {
            success: false,
            error: 'File not found',
          }
        }

        await fs.unlink(filePath)

        return {
          success: true,
          message: 'File deleted',
        }
      } catch (error) {
        fastify.log.error(error)
        reply.code(500)
        return {
          success: false,
          error: 'Error deleting file',
        }
      }
    },
  )
}
