import { Drawable } from "./Drawable";
import { Machine } from "./Machine";
import { Point } from "./Point";

export class Queue extends Drawable{
    numberOfProducts: number;
    queueNumber: number;
    nextMachine!: Array<Machine>;

    constructor(id: number, queueNumber: number, center: Point){
        super(id, 'queue', center);
        this.numberOfProducts = 0;
        this.queueNumber = queueNumber;
        this.nextMachine = Array<Machine>();
    }

    setNumberOfProducts(numberOfProducts: number){
        this.numberOfProducts = numberOfProducts;
    }
    
}