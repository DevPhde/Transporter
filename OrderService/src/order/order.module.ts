import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from '../schema/OrderSchema';
import { OrderRepository } from '../persistance/OrderRepository';
import { JsonWebTokenProvider } from 'src/Providers/Jwt/JwtProvider';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/order'),MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, JsonWebTokenProvider],
})
export class OrderModule {
  
}
