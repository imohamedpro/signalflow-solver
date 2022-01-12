import { Point } from "./Point";

export class Edge {
    center1!: Point;
    center2!: Point;

    constructor(center1: Point, center2: Point){
        this.center1 = center1;
        this.center2 = center2;
    }

}