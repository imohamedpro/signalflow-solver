import { Edge } from './../../Classes/Edge';
import { Node } from 'src/app/Classes/Node';
import { Injectable } from '@angular/core';
import { ManagerService } from '../manager/manager.service';
import { Point } from 'src/app/Classes/Point';

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  constructor(private manager: ManagerService) { }

  nullNode: Node = new Node(-1, new Point(-1,-1));
  nullEdge: Edge = new Edge(-1,-1,-1,new Point(-1,-1), new Point(-1,-1), -1);
  movingNode!: Node;
  movingEdge!: Edge;
  initialClick!: Point;

  mouseDownNode(node: Node, e: MouseEvent){
    console.log("Mouse Down Node")
    console.log(node);
    if (e.button == 0 && this.manager.state == "move") {
      this.movingNode = node;
      this.movingEdge = this.nullEdge;
      this.initialClick = new Point(e.clientX, e.clientY);
    }
  }

  mouseDownEdge(edge: Edge, e: MouseEvent){
    if (e.button == 0 && (this.manager.state == "addEdge" || this.manager.state == "move")) {
      this.movingEdge = edge;
      this.movingNode = this.nullNode;
      edge.isDragging = true;
      this.initialClick = new Point(e.clientX, e.clientY);
    }
  }

  mouseMove(e: MouseEvent){
    if(this.movingEdge != this.nullEdge){
      let offsetX = e.clientX - this.initialClick.x;
      let offsetY = e.clientY - this.initialClick.y;
      this.movingEdge.curveCenter.x += offsetX;
      this.movingEdge.curveCenter.y += offsetY;
      this.movingEdge.updatePath().then(() => this.movingEdge.updateArrowText());
      this.initialClick = new Point(e.clientX, e.clientY);
    }else if(this.movingNode != this.nullNode){
      let offsetX = e.clientX - this.initialClick.x;
      let offsetY = e.clientY - this.initialClick.y;
      this.movingNode.center.x += offsetX;
      this.movingNode.center.y += offsetY;
      this.updateEdges(this.movingNode);
      this.initialClick = new Point(e.clientX, e.clientY);
    }else{
      e.stopPropagation();
    }
  }

  mouseUp(e: MouseEvent){
    if(this.movingEdge != this.nullEdge){
      this.movingEdge.isDragging = false;
    }else if(this.movingNode != this.nullNode){
      //Node Movement
    }
    this.movingEdge = this.nullEdge;
    this.movingNode = this.nullNode;
  }

  updateEdges(node: Node){
    if(node != undefined){
      node.edges.forEach((edge) => {
        if(edge.isSelfLoop){
          edge.curveCenter = new Point(edge.endPoint1.x+edge.selfRadius, edge.endPoint1.y+edge.selfRadius)
        }
        edge.updatePath();
        edge.updateArrowText();
      })
    }
  }
}
