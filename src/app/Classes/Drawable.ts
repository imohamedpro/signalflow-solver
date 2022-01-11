import { Point } from "./Point";

export class Drawable{
    id: number;
    type: string;
    center: Point;
    isSelected: boolean;

    constructor(id: number, type: string, center: Point){
        this.id = id;
        this.type = type;
        this.center = center;
        this.isSelected = false;
    }

    getType(){
        return this.type;
    }

}