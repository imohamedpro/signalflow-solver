import { Drawable } from "./Drawable";
import { Point } from "./Point";

export class Edge extends Drawable{
    center2!: Point;

    constructor(id: number, center1: Point, center2: Point){
        super(id, 'edge', center1);
        this.center2 = center2;
    }

}