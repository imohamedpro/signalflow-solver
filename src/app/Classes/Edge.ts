import { Point } from "./Point";

export class Edge {
    id!: number;
    edgeNumber!: number;
    center1!: Point;
    center2!: Point;

    constructor(id: number, edgeNumber: number, center1: Point, center2: Point) {
        this.id = id;
        this.edgeNumber = edgeNumber;
        this.center1 = center1;
        this.center2 = center2;
    }

}