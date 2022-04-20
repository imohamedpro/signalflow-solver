import { Edge } from './Edge';
import { Point } from "./Point";

export class Node {
    id!: number;
    center!: Point;
    symbol!: string;
    edges: Edge[];
    fill!: string;

    constructor(id: number, center: Point) {
        this.id = id;
        this.symbol = "x" + id;
        this.center = center;
        this.edges = new Array();
        this.fill = "#5B9BD5";
    }

    addEdge(edge: Edge){
        this.edges.push(edge);
    }

    removeEdge(edge: Edge){
        const index = this.edges.indexOf(edge, 0);
        if (index > -1)
            this.edges.splice(index, 1);
    }

    makeSource(){
        this.symbol = "R";
        this.fill = "#d28843";
    }

    makeDestination(){
        this.symbol = "C";
        this.fill = "#d28843";
    }

    /**
     * Resets node's fill color and symbol to its initial ones
     */
    unmake(){
        this.symbol = "x" + this.id;
        this.fill = "#5B9BD5";
    }

}