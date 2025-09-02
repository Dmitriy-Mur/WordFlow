import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fs from 'fs/promises';
import path from 'path';
import pdf from 'pdf-parse';
import { FileUtils } from '../utils/fileUtils.js';
import { FileContentResponse, FilesListResponse, DeleteResponse } from '../types/index.js';

interface FileParams {
  filename: string;
}

export async function fileRoutes(fastify: FastifyInstance) {
  fastify.get('/api/files', async (request: FastifyRequest, reply: FastifyReply): Promise<FilesListResponse> => {
    try {
      const uploadDir = path.join(__dirname, '..', '..', 'uploads');
      
      try {
        await fs.access(uploadDir);
      } catch {
        return { success: true, files: [] };
      }

      const files = await fs.readdir(uploadDir);
      const filteredFiles = files.filter(file => 
        file.match(/\.(pdf|md|markdown)$/i)
      );

      return {
        success: true,
        files: filteredFiles
      };

    } catch (error) {
      fastify.log.error(error);
      reply.code(500);
      return {
        success: false,
        error: 'Ошибка при получении списка файлов'
      };
    }
  });

  fastify.get('/api/file/:filename', async (request: FastifyRequest<{ Params: FileParams }>, reply: FastifyReply): Promise<FileContentResponse> => {
    try {
      const { filename } = request.params;
      
      if (!FileUtils.isValidFilename(filename)) {
        reply.code(400);
        return {
          success: false,
          error: 'Некорректное имя файла'
        };
      }

      const filePath = FileUtils.getUploadPath(filename);

      try {
        await fs.access(filePath);
      } catch {
        reply.code(404);
        return {
          success: false,
          error: 'Файл не найден'
        };
      }

      if (filename.endsWith('.pdf')) {
        const dataBuffer = await fs.readFile(filePath);
        const data = await pdf(dataBuffer);
        
        return {
          success: true,
          content: data.text,
          type: 'pdf'
        };
      } 
      else if (filename.match(/\.(md|markdown)$/i)) {
        const content = await fs.readFile(filePath, 'utf8');
        
        return {
          success: true,
          content: content,
          type: 'markdown'
        };
      }
      else {
        reply.code(400);
        return {
          success: false,
          error: 'Неподдерживаемый формат файла'
        };
      }

    } catch (error) {
      fastify.log.error(error);
      reply.code(500);
      return {
        success: false,
        error: 'Ошибка при чтении файла'
      };
    }
  });

  fastify.delete('/api/file/:filename', async (request: FastifyRequest<{ Params: FileParams }>, reply: FastifyReply): Promise<DeleteResponse> => {
    try {
      const { filename } = request.params;
      
      if (!FileUtils.isValidFilename(filename)) {
        reply.code(400);
        return {
          success: false,
          error: 'Некорректное имя файла'
        };
      }

      const filePath = FileUtils.getUploadPath(filename);

      try {
        await fs.access(filePath);
      } catch {
        reply.code(404);
        return {
          success: false,
          error: 'Файл не найден'
        };
      }

      await fs.unlink(filePath);

      return {
        success: true,
        message: 'Файл удален'
      };

    } catch (error) {
      fastify.log.error(error);
      reply.code(500);
      return {
        success: false,
        error: 'Ошибка при удалении файла'
      };
    }
  });
}