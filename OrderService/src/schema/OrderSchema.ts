import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
    @Prop({ required: true, type: Object })
    destiny: object;

    @Prop({ required: true, type: Object })
    sended: object;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    createdAt: Date;

    @Prop({ required: true, type: Object })
    client: object;

    @Prop({ type: Object })
    driver: object;
}

export const OrderSchema = SchemaFactory.createForClass(Order)