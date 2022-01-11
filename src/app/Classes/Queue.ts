import { Drawable } from "./Drawable";
import { Machine } from "./Machine";
import { Point } from "./Point";

export class Queue extends Drawable{
    numberOfProducts: number;
    nextMachine!: Array<Machine>;

    constructor(id: number, center: Point){
        super(id, 'queue', center);
        this.numberOfProducts = 0;
    }
    
}