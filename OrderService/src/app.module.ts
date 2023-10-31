import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { JwtMiddleware } from './Middleware/JwtVerificationMiddleware';
import { JsonWebTokenProvider } from './Providers/Jwt/JwtProvider';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [OrderModule, KafkaModule],
  controllers: [],
  providers: [JsonWebTokenProvider],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes({ path: 'order*', method: RequestMethod.ALL });
  }
}
