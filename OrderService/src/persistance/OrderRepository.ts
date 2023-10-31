import { InjectModel } from "@nestjs/mongoose";
import { Order } from "../order/entities/order.entity";
import { Model } from "mongoose";
import { InternalException } from "src/Exceptions/InternalException";
import { ConflictException, Injectable } from "@nestjs/common";
import { BadRequestException } from "src/Exceptions/BadRequestException";
import { IDriver } from "../order/entities/interface/IDriver";
import { IClient } from "src/order/entities/interface/IClient";

@Injectable()
export class OrderRepository {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>) { }

    async findAcceptedOrders(driver: IDriver): Promise<Order[]> {
        try {
            return await this.orderModel.find({ driver: driver }).exec();
        } catch {
            throw new InternalException("Erro interno, tente novamente mais tarde.")
        }
    }
    async create(order: Order): Promise<Order> {
        try {
            const createdCat = new this.orderModel(order);
            return await createdCat.save();
        } catch {
            throw new InternalException("Erro interno, tente novamente mais tarde.")
        }
    }
    async findById(id: string): Promise<Order> {
        try {
            return await this.orderModel.findOne({ _id: id }).exec();
        } catch (e) {
            if (e.reason == "BSONError: Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer") throw new BadRequestException("Id Inválido.")
            throw new InternalException("Erro interno, tente novamente mais tarde.")
        }
    }
    async findAll(): Promise<Order[]> {
        try {
            return await this.orderModel.find().exec();
        } catch {
            throw new InternalException("Erro interno, tente novamente mais tarde.")
        }
    }
    async delete(id: string): Promise<void> {
        try {
            const deletedOrder = await this.orderModel
                .findByIdAndDelete({ _id: id })
                .exec();
            deletedOrder;
        } catch {
            throw new InternalException("Erro interno, tente novamente mais tarde.")
        }
    }
    async update(order: Order): Promise<Order> {
        try {
            const existingOrder = await this.orderModel.findById(order._id).exec();
            if (!existingOrder) {
                throw new ConflictException("Pedido não existe.")
            }
            existingOrder.set(order)
            const updatedOrder = await existingOrder.save();

            return updatedOrder;
        } catch (error) {
            console.log(error)
            throw new InternalException("Erro interno, tente novamente mais tarde.")
        }
    }
    async findOrdersByClient(client: IClient): Promise<Order[]> {
        try {
            return await this.orderModel.find({ client: client }).exec();
        } catch {
            throw new InternalException("Erro interno, tente novamente mais tarde.")
        }
    }
}