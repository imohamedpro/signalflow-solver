import { Drawable } from "./Drawable";
import { Point } from "./Point";
import { Queue } from "./Queue";

export class Machine extends Drawable{
    nextQueue!: Queue;
    machineNumber!: number;
    
    constructor(id: number,machineNumber: number, center: Point){
        super(id, 'machine', center);
        this.machineNumber = machineNumber;
    }

}