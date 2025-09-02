import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { multipartPlugin } from './plugins/multipart.js';
import { uploadRoutes } from './routes/upload.js';
import { fileRoutes } from './routes/files.js';

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
  }
});

async function startServer(): Promise<void> {
  try {
    // Регистрируем CORS
    await server.register(cors, {
      origin: true,
      methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type']
    });

    // Регистрируем плагины
    await server.register(multipartPlugin);

    // Регистрируем роуты
    await server.register(uploadRoutes);
    await server.register(fileRoutes);

    // Запускаем сервер
    const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    const HOST = process.env.HOST || '0.0.0.0';
    
    await server.listen({ port: PORT, host: HOST });
    
    server.log.info(`Сервер запущен на http://${HOST}:${PORT}`);

  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

// Обработка graceful shutdown
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, async () => {
    server.log.info(`Получен сигнал ${signal}, останавливаем сервер...`);
    await server.close();
    process.exit(0);
  });
});

startServer();