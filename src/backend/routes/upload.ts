import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { pipeline } from 'stream/promises';
import fs from 'fs';
import path from 'path';
import { FileUtils } from '../utils/fileUtils.js';
import { UploadResponse } from '../types/index.js';

interface UploadRequest extends FastifyRequest {
  file: () => AsyncIterableIterator<any> & {
    filename: string;
    mimetype: string;
    file: NodeJS.ReadableStream;
  };
}

export async function uploadRoutes(fastify: FastifyInstance) {
  fastify.post('/api/upload', async (request: UploadRequest, reply: FastifyReply): Promise<UploadResponse> => {
    try {
      const data = await request.file();
      
      if (!data) {
        reply.code(400);
        return {
          success: false,
          error: 'Файл не предоставлен'
        };
      }

      if (!FileUtils.isAllowedFileType(data.filename, data.mimetype)) {
        reply.code(400);
        return {
          success: false,
          error: 'Разрешены только PDF и Markdown файлы'
        };
      }

      await FileUtils.ensureUploadDir();

      const filename = `${Date.now()}-${data.filename}`;
      const filePath = FileUtils.getUploadPath(filename);

      await pipeline(data.file, fs.createWriteStream(filePath));

      return {
        success: true,
        message: 'Файл загружен',
        filename: filename,
        originalName: data.filename
      };

    } catch (error) {
      fastify.log.error(error);
      reply.code(500);
      return {
        success: false,
        error: 'Ошибка при загрузке файла'
      };
    }
  });
}