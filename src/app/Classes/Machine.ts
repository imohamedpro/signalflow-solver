import { Drawable } from "./Drawable";
import { Point } from "./Point";
import { Queue } from "./Queue";

export class Machine extends Drawable{
    nextQueue!: Queue;
    machineNumber!: number;
    hasRightEdge!: boolean;
    hasLeftEdge!: boolean;

    constructor(id: number, machineNumber: number, center: Point){
        super(id, 'machine', center);
        this.machineNumber = machineNumber;
        this.hasRightEdge = false;
        this.hasLeftEdge = false;
    }

}