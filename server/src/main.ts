import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
        .setTitle('Tea-backend')
        .setDescription('Tea store backend docs')
        .setVersion('1.0.0')
        .addTag('GuchVlado')
        .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, document)

  app.enableCors({credentials: true, origin: process.env.CLIENT_URL})
  app.use(cookieParser())

  await app.listen(PORT, () => console.log('server started at port - ' + PORT));
}
bootstrap();
