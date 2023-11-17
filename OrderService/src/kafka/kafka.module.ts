import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { KafkaController } from './kafka.controller';
import { OrderRepository } from 'src/persistance/OrderRepository';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/schema/OrderSchema';

@Module({
  imports:[MongooseModule.forRoot('mongodb://localhost/order'),MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  controllers: [KafkaController],
  providers: [KafkaService, OrderRepository],
})
export class KafkaModule {}
