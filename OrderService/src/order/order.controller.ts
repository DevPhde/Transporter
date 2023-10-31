import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Request } from 'express';
import { OrderDTO } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() request: Request) {
    return this.orderService.create(createOrderDto, request.headers.authorization);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }
  @Get('/findAcceptedsOrders')
  findAcceptedsOrders(@Req() request: Request) {
    return this.orderService.findAcceptedsOrders(request.headers.authorization)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch('/accept')
  acceptOrder(@Body() order: OrderDTO, @Req() request: Request) {
    return this.orderService.driverAcceptOrder(order, request.headers.authorization);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
