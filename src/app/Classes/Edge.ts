import { Point } from "./Point";

export class Edge {
    center1!: Point;
    center2!: Point;
    id!: number;

    constructor(center1: Point, center2: Point, id: number){
        this.center1 = center1;
        this.center2 = center2;
        this.id = id;
    }
    
}