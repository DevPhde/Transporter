import { Injectable } from '@nestjs/common';
import { KafkaNewAndOldUserInfo } from './dto/kafkaNewAndOldUserInfo.dto';
import { OrderRepository } from 'src/persistance/OrderRepository';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class KafkaService {
  constructor(private orderRepository: OrderRepository) { }
  async updateDriverOrders(userUpdateObj: KafkaNewAndOldUserInfo) {
    try {
      const listOfDriverOrders: Order[] = await this.orderRepository.findAcceptedOrders({
        id: userUpdateObj.oldId,
        name: userUpdateObj.oldName,
        email: userUpdateObj.oldEmail
      });
      listOfDriverOrders.map((i) => {
        i.driver = {
          id: userUpdateObj.id,
          name: userUpdateObj.name,
          email: userUpdateObj.email
        }
      })
      for(let i = 0; i< listOfDriverOrders.length; i++) {
        await this.orderRepository.update(listOfDriverOrders[i]);
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  async updateClientOrders(userUpdateObj: KafkaNewAndOldUserInfo) {
    try {
      const listOfClientOrders: Order[] = await this.orderRepository.findOrdersByClient({
        id: userUpdateObj.oldId,
        name: userUpdateObj.oldName,
        email: userUpdateObj.oldEmail
      });
      listOfClientOrders.map((i) => {
        i.client = {
          id: userUpdateObj.id,
          name: userUpdateObj.name,
          email: userUpdateObj.email
        }
      })
      for(let i = 0; i< listOfClientOrders.length; i++) {
        await this.orderRepository.update(listOfClientOrders[i]);
      }
    } catch (error) {
      console.error(error.message)
    }
  }
}
