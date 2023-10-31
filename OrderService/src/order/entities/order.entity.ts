import { IClient } from "./interface/IClient";
import { IDriver } from "./interface/IDriver";

export class Order {
    public _id?: string;
    public destiny: object;
    public sended: object;
    public price: number;
    public createdAt: Date;

    public client: IClient;
    public driver?: IDriver;

    constructor(destiny: object, sended: object, price: number, client: IClient, id?: string, driver?: IDriver) {
        if (id) this._id = id;
        this.destiny = destiny;
        this.sended = sended;
        this.price = price;

        this.client = client;
        this.driver = driver ? driver : null; 

        this.createdAt = new Date;
    }

}