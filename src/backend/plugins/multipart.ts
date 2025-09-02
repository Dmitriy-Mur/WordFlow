import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import multipart from '@fastify/multipart';

export async function multipartPlugin(fastify: FastifyInstance, options: FastifyPluginOptions) {
  await fastify.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024,
      files: 1
    }
  });
}

export default multipartPlugin;