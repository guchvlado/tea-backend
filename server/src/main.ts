import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, {cors: true});
  
  const config = new DocumentBuilder()
        .setTitle('Tea-backend')
        .setDescription('Tea store backend docs')
        .setVersion('1.0.0')
        .addTag('GuchVlado')
        .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, document)

  await app.listen(PORT, () => console.log('server started at port - ' + PORT));
}
bootstrap();
