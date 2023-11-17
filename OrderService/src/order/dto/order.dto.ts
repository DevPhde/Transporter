import { IClient } from "../entities/interface/IClient";
import { IDriver } from "../entities/interface/IDriver";

export class OrderDTO {
    _id?: string;
    destiny: object;
    sended: object;
    price: number;
    createdAt: Date;

    client: IClient;
    driver?: IDriver;
}