import { Drawable } from "./Drawable";
import { Point } from "./Point";
import { Queue } from "./Queue";

export class Machine extends Drawable {
    nextQueue!: Queue;
    machineNumber!: number;
    hasRightEdge!: boolean;
    hasLeftEdge!: boolean;
    fillColor!: string;

    constructor(id: number, machineNumber: number, center: Point) {
        super(id, 'machine', center);
        this.machineNumber = machineNumber;
        this.hasRightEdge = false;
        this.hasLeftEdge = false;
        this.fillColor = '#ffffff'
    }

    setFillColor(fillColor: string) {
        this.fillColor = fillColor;
    }
    
}