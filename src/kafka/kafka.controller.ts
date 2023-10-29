import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { KafkaNewAndOldUserInfo } from './dto/kafkaNewAndOldUserInfo.dto';

@Controller()
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) { }

  @MessagePattern('updateDriverOrders')
  updateDriverOrders(@Payload() driverUpdatedAndOldInfo: KafkaNewAndOldUserInfo) {
    console.log(driverUpdatedAndOldInfo)
    return this.kafkaService.updateDriverOrders(driverUpdatedAndOldInfo);
  }

  @MessagePattern('updateClientOrders')
  updateClientOrders(@Payload() driverUpdatedAndOldInfo: KafkaNewAndOldUserInfo) {
    return this.kafkaService.updateClientOrders(driverUpdatedAndOldInfo);
  }
}
