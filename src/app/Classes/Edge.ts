import { Point } from "./Point";

export class Edge {
    id!: number;
    symbol!: string;
    endPoint1!: Point;
    endPoint2!: Point;
    gain!: number;

    constructor(id: number, endPoint1: Point, endPoint2: Point, gain: number) {
        this.id = id;
        this.endPoint1 = endPoint1;
        this.endPoint2 = endPoint2;
        this.gain = gain;
        this.symbol = 'e' + id;
    }

}