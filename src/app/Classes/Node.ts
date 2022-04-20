import { Edge } from './Edge';
import { Point } from "./Point";

export class Node {
    id!: number;
    center!: Point;
    symbol!: string;
    edges: Edge[];

    constructor(id: number, center: Point) {
        this.id = id;
        this.symbol = 'x' + id;
        this.center = center;
        this.edges = new Array();
    }

    addEdge(edge: Edge){
        this.edges.push(edge);
    }

    removeEdge(edge: Edge){
        const index = this.edges.indexOf(edge, 0);
        if (index > -1)
            this.edges.splice(index, 1);
    }

}