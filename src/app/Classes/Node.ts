import { Point } from "./Point";

export class Node {
    id!: number;
    center!: Point;
    symbol!: string;
    edges: number[];

    constructor(id: number, center: Point) {
        this.id = id;
        this.symbol = 'x' + id;
        this.center = center;
        this.edges = new Array();
    }

    addEdge(id: number){
        this.edges.push(id);
    }

    removeEdge(id: number){
        const index = this.edges.indexOf(id, 0);
        if (index > -1)
            this.edges.splice(index, 1);
    }

}