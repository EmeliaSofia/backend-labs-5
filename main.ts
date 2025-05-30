import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Щоб swagger oauth2 редіректи працювали
  app.use(express.static(join(__dirname, '..', 'public')));

  const config = new DocumentBuilder()
      .setTitle('Products API')
      .setDescription('API docs')
      .setVersion('1.0')
      .addOAuth2({
        type: 'oauth2',
        flows: {
          authorizationCode: {
            authorizationUrl: 'http://localhost:8080/realms/Sofa/protocol/openid-connect/auth',
            tokenUrl: 'http://localhost:8080/realms/Sofa/protocol/openid-connect/token',
            scopes: { openid: 'OpenID Connect scope' }
          },
          password: {
            tokenUrl: 'http://localhost:8080/realms/Sofa/protocol/openid-connect/token',
            scopes: { openid: 'OpenID Connect scope' }
          }
        }
      })
      .addBearerAuth(
          { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
          'bearer'
      )
      .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      oauth2RedirectUrl: 'http://localhost:3000/oauth2-redirect.html'
    }
  });

  await app.listen(3000);
}

bootstrap();


