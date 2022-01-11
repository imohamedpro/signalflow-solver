import { Drawable } from "./Drawable";
import { Point } from "./Point";
import { Queue } from "./Queue";

export class Machine extends Drawable{
    nextQueue!: Queue;

    constructor(id: number, center: Point){
        super(id, 'machine', center);
    }

}