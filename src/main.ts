import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KafkaModule } from './kafka/kafka.module';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const restPort = process.env.PORT || 3000;
  //Swagger Config
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Swagger Documentation")
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('doc', app, document)

  await app.listen(restPort);
  const kafkaMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    KafkaModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092']
        },
      },
    },
  );
  await kafkaMicroservice.listen();
  console.log("Rest API litenning at port " + restPort)
  console.log("KAFKA Microservice connected.")
}
bootstrap();
