import { Point } from "./Point";

export class Node {
    id!: number;
    center!: Point;
    symbol!: string;

    constructor(id: number, center: Point) {
        this.id = id;
        this.symbol = 'x' + id;
        this.center = center;
    }

}