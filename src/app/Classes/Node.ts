import { Point } from "./Point";

export class Node {
    id!: number;
    nodeNumber!: number;
    center!: Point;

    constructor(id: number, nodeNumber: number, center: Point) {
        this.id = id;
        this.nodeNumber = nodeNumber;
        this.center = center;
    }

}