import { Point } from "./Point";

export class Drawable{
    id: number;
    type: string;
    center: Point;

    constructor(id: number, type: string, center: Point){
        this.id = id;
        this.type = type;
        this.center = center;
    }

    getType(){
        return this.type;
    }

}