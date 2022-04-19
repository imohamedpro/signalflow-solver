import { Point } from "./Point";

export class Edge {
    id: number;
    symbol: string;
    endPoint1: Point;
    endPoint2: Point;
    curveCenter: Point;
    gain: number;
    path_value: string;
    arrowPoints: string;
    isSelected: boolean;
    isDragging: boolean;

    constructor(id: number, endPoint1: Point, endPoint2: Point ,gain: number) {
        this.id = id;
        this.endPoint1 = endPoint1;
        this.endPoint2 = endPoint2;
        this.checkSelfLoop();
        let yrange = ((this.endPoint1.y + this.endPoint2.y)/2 - 30);
        this.curveCenter = new Point((this.endPoint1.x + this.endPoint2.x)/2, Math.floor(Math.random() * yrange));
        this.gain = gain;
        this.symbol = 'e' + id;
        this.path_value = "";
        this.arrowPoints ="";
        this.isSelected = false;
        this.isDragging = false;
        this.updatePath();
    }

    private checkSelfLoop(){
        if((this.endPoint1.x == this.endPoint2.x) && (this.endPoint1.y == this.endPoint2.y)){
            console.log("inside if");
            this.endPoint1 = new Point(this.endPoint1.x-20, this.endPoint1.y);
            this.endPoint2 = new Point(this.endPoint2.x+20, this.endPoint2.y);
        }
    }

    updatePath() {
        return new Promise<void>((resolve, reject) => {
          this.path_value = "M" + this.endPoint1.x + "," + this.endPoint1.y + " Q" + this.curveCenter.x + " " + this.curveCenter.y + " " + this.endPoint2.x + "," + this.endPoint2.y;
          resolve();
        });
    }

    getMidPoint(){
        let path: any = document.getElementById("edge" + this.id);
        let pathLength = Math.floor(path.getTotalLength());
        let pt = path.getPointAtLength(0.5 * pathLength);
        return new Point(Math.round(pt.x), Math.round(pt.y));
    }

    updateArrow(){
        let pt = this.getMidPoint();
        let xOffset = this.endPoint2.x - this.endPoint1.x;
        let yOffset = this.endPoint2.y - this.endPoint1.y;
        if(Math.abs(xOffset) > Math.abs(yOffset)){
            if(xOffset > 0){
                this.arrowPoints = pt.x + "," + pt.y + " " + (pt.x-10) + "," + (pt.y-7) + " " + (pt.x-10) + "," + (pt.y+7);
            }else{
                this.arrowPoints = (pt.x-10) + "," + pt.y + " " + pt.x + "," + (pt.y-7) + " " + pt.x + "," + (pt.y+7);
            }
        }else{
            if(yOffset > 0){
                this.arrowPoints = (pt.x+7) + "," + pt.y + " " + (pt.x-7) + "," + pt.y + " " + (pt.x) + "," + (pt.y+10);
            }else{
                this.arrowPoints = pt.x + "," + pt.y + " " + (pt.x+7) + "," + (pt.y+10) + " " + (pt.x-7) + "," + (pt.y+10);
            }
        }
    }


}