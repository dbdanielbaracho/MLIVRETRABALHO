import 'reflect-metadata';
import { randomUUID } from 'node:crypto';
import { privateApplicationLogger, privateHttpLogger } from './privacy-logging';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { parseCorsOrigins } from './cors';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: privateHttpLogger, requestIdHeader: false, genReqId: () => randomUUID() }),
    { rawBody: true, logger: privateApplicationLogger },
  );

  app.enableShutdownHooks();
  app.setGlobalPrefix('v1');

  const corsOrigins = parseCorsOrigins(process.env.CORS_ORIGINS);
  if (corsOrigins.length > 0) {
    app.enableCors({
      origin: corsOrigins,
      methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['authorization', 'content-type', 'x-tenant-id'],
    });
  }

  const port = Number(process.env.PORT ?? 3000);
  const host = process.env.HOST ?? '0.0.0.0';

  await app.listen(port, host);
}

void bootstrap().catch(error=>{privateApplicationLogger.error(error,'Bootstrap');process.exitCode=1;});
