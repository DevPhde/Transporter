import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderRepository } from '../persistance/OrderRepository';
import { getAddressByCep } from 'src/Providers/Axios/GetAddressByCep';
import { Order } from './entities/order.entity';
import { BadRequestException } from 'src/Exceptions/BadRequestException';
import { JsonWebTokenProvider } from 'src/Providers/Jwt/JwtProvider';
import { communication } from 'src/Providers/Axios/Communication';
import { OrderDTO } from './dto/order.dto';
import { IDriver } from './entities/interface/IDriver';


@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository, private jwtProvider: JsonWebTokenProvider) { }

  async create(createOrderDto: CreateOrderDto, userJwt: string) {
    try {
      const clientEmail = this.jwtProvider.jwtVerifyAndDecode(userJwt)
      const client = await communication("/authentication/getClientByEmail", {clientEmail: clientEmail})
      const destinyAddress = await getAddressByCep(createOrderDto.destiny);
      const sendedAddress = await getAddressByCep(createOrderDto.sended);
      const order = new Order(
        destinyAddress,
        sendedAddress,
        createOrderDto.price,
        client,
      );
      const create = await this.orderRepository.create(order);
      
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.orderRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.orderRepository.findById(id);
      if (order == null) throw new BadRequestException("Id não cadastrado.");
      return order;
    } catch (error) {
      throw error;
    }
  }

  async driverAcceptOrder(orderDto: OrderDTO, userJwt: string) {
    try {
      const driverEmail = this.jwtProvider.jwtVerifyAndDecode(userJwt);
      const driverObjReceived: IDriver = await communication('/authorization/getDriverInformationsByEmail', { driverEmail: driverEmail }) // IMPLEMENTAR NO SERVICE AUTHENTICATION
      const order: Order = new Order(orderDto.destiny, orderDto.sended, orderDto.price, orderDto.client, orderDto._id, driverObjReceived)
      await this.orderRepository.update(order)
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      if (await this.orderRepository.findById(id) == null) throw new BadRequestException("Id não cadastrado.");
      return await this.orderRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }

  async findAcceptedsOrders(userJwt: string) {
    try {
      const driverEmail = this.jwtProvider.jwtVerifyAndDecode(userJwt);
      const driverObjReceived: IDriver = await communication('/authorization/getDriverInformationsByEmail', { driverEmail: driverEmail }) // IMPLEMENTAR NO SERVICE AUTHENTICATION

      return await this.orderRepository.findAcceptedOrders(driverObjReceived);
    } catch (error) {
      throw error;
    }
  }
}

