import { Point } from "./Point";

export class Edge {
    id: number;
    symbol: string;
    fromNode: number;
    toNode: number;
    endPoint1: Point;
    endPoint2: Point;
    curveCenter: Point;
    gain: number;
    path_value: string;
    arrowPoints: string;
    transformArrow: string;
    transformText: string;
    isSelected: boolean;
    isDragging: boolean;

    constructor(id: number, fromNode: number, toNode: number , endPoint1: Point, endPoint2: Point ,gain: number) {
        this.id = id;
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.endPoint1 = endPoint1;
        this.endPoint2 = endPoint2;
        let yrange = ((this.endPoint1.y + this.endPoint2.y)/2 - 30);
        this.curveCenter = new Point((this.endPoint1.x + this.endPoint2.x)/2, Math.floor(Math.random() * yrange));
        this.gain = gain;
        this.symbol = 'e' + id;
        this.path_value = "";
        this.arrowPoints ="";
        this.transformArrow = "";
        this.transformText = "";
        this.isSelected = false;
        this.isDragging = false;
        this.updatePath();
    }

    private checkSelfLoop(): boolean{
        return (this.endPoint1.x == this.endPoint2.x) && (this.endPoint1.y == this.endPoint2.y)
    }

    updatePath() {
        return new Promise<void>((resolve, reject) => {
            if(this.checkSelfLoop()){
                this.path_value = "M" + (this.endPoint1.x-20) + "," + this.endPoint1.y + " Q" + this.curveCenter.x + " " + this.curveCenter.y + " " + (this.endPoint2.x+20) + "," + this.endPoint2.y;
            }else{
                this.path_value = "M" + this.endPoint1.x + "," + this.endPoint1.y + " Q" + this.curveCenter.x + " " + this.curveCenter.y + " " + this.endPoint2.x + "," + this.endPoint2.y;
            }
            resolve();
        });
    }

    getMidPoint(){
        let path: any = document.getElementById("edge" + this.id);
        let pathLength = Math.floor(path.getTotalLength());
        let pt = path.getPointAtLength(0.5 * pathLength);
        return new Point(Math.round(pt.x), Math.round(pt.y));
    }

    updateArrowText(){
        let pt = this.getMidPoint();
        let xOffset = this.endPoint2.x - this.endPoint1.x;
        let yOffset = this.endPoint2.y - this.endPoint1.y;
        let angle = Math.atan2(this.endPoint2.y-this.endPoint1.y, this.endPoint2.x-this.endPoint1.x)*180/Math.PI;
        if(Math.abs(xOffset) > Math.abs(yOffset)){
            if(xOffset > 0){    //arrow right
                this.arrowPoints = pt.x + "," + pt.y + " " + (pt.x-10) + "," + (pt.y-7) + " " + (pt.x-10) + "," + (pt.y+7);
                this.transformArrow = "rotate(" + angle + "," + pt.x + "," + pt.y + ")";
                this.transformText = "translate(10,-10) rotate(" + angle + "," + pt.x + "," + pt.y + ")";
            }else{  //arrow left
                this.arrowPoints = pt.x + "," + pt.y + " " + (pt.x+10) + "," + (pt.y-7) + " " + (pt.x+10) + "," + (pt.y+7);
                this.transformArrow = "rotate(" + (angle+180) + "," + pt.x + "," + pt.y + ")";
                this.transformText = "translate(10,20) rotate(" + angle + "," + pt.x + "," + pt.y + ")";
            }
        }else{
            if(yOffset > 0){    //arrow down
                this.arrowPoints = pt.x + "," + pt.y + " " + (pt.x-10) + "," + (pt.y-7) + " " + (pt.x-10) + "," + (pt.y+7);
                this.transformArrow = "rotate(" + angle + "," + pt.x + "," + pt.y + ")";
                this.transformText = "translate(10,10) rotate(" + (-1*angle) + "," + pt.x + "," + pt.y + ")";
            }else{      //arrow up
                this.arrowPoints = pt.x + "," + pt.y + " " + (pt.x+7) + "," + (pt.y+10) + " " + (pt.x-7) + "," + (pt.y+10);
                this.transformArrow = "rotate(" + (angle+90) + "," + pt.x + "," + pt.y + ")";
                this.transformText = "translate(-25,10) rotate(" + (-1*angle) + "," + pt.x + "," + pt.y + ")";
            }
        }
        
    }


}