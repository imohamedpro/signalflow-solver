import { Injectable } from '@angular/core';
import { Edge } from '../../Classes/Edge';
import { Node } from '../../Classes/Node';
import { Point } from '../../Classes/Point';
import { ControllerService } from '../controller/controller.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  edges!: Map<number, Edge>;
  nodes!: Map<number, Node>;
  selectedNode!: any;
  //nextEdgeId!: number; // for test purposes (api should get the edge id)
  //nextNodeId!: number; // for test purposes (api should get the node id)
  answer!: string;
  state!: string;   //to get state from toolbar
  initialClick!: Point;
  isEdgeMoving: boolean = false;
  isNodeMoving: boolean = false;
  movingID!: number;

  constructor(private controller: ControllerService) {
    this.edges = new Map<number, Edge>();
    this.nodes = new Map<number, Node>();
    //this.nextEdgeId = 0;
    //this.nextNodeId = 0;
    this.state = "";
    this.answer = 'Answer should be here';
    this.initialClick = new Point(0,0);
    this.movingID = -1;
  }

  createEdge(fromNode: number, toNode: number, endPoint1: Point, endPoint2: Point, gain: number){
    // if(endPoint1.x < endPoint2.x){
    //   this.edges.set(this.nextEdgeId, new Edge(this.nextEdgeId, fromNode, toNode, endPoint1, endPoint2, gain));
    // } else {
    //   this.edges.set(this.nextEdgeId, new Edge(this.nextEdgeId, fromNode, toNode, endPoint1, endPoint2, gain));
    // }
    // return this.nextEdgeId++;
    this.controller.addEdge(fromNode, toNode, gain).subscribe(id => {
      this.edges.set(id, new Edge(id, fromNode, toNode, endPoint1, endPoint2, gain));
      const node: any = this.nodes.get(toNode);
      if(this.selectedNode == node){
        node.addEdge(id);
      }else{
        this.selectedNode.addEdge(id);
        node.addEdge(id);
      }
      this.selectedNode = null;
    })
  }

  createNode(center: Point) {
    this.controller.addNode().subscribe(id => {
      this.nodes.set(id, new Node(id, center));
    });
    //this.nodes.set(this.nextNodeId, new Node(this.nextNodeId, center));
    //++this.nextNodeId;
  }

  select(node: Node) {
    if(this.selectedNode == null){
      this.selectedNode = node;
    } else {
      let gain: any;
      gain = prompt('please enter the gain:');
      if(isNaN(gain) || gain == null || gain == ""){ 
        alert("Invalid input!");
        this.selectedNode = null;
      } else {
        this.createEdge(this.selectedNode.id, node.id, this.selectedNode.center, node.center, gain);
      }
    }
  }

  editGain(edge: Edge){
    let gain: any;
    gain = prompt('please enter the new gain of '+ edge.symbol +' :');
    if(isNaN(gain) || gain == null || gain == ""){ 
      alert("Invalid input!");
    } else {
      edge.gain = gain;
      this.controller.updateGain(edge.id, gain).subscribe();
    }
  }

  clear() {
    if(confirm('Are you sure ?')){
      this.edges.clear();
      this.nodes.clear();
      // this.nextEdgeId = 0;
      // this.nextNodeId = 0;
      this.selectedNode = null;
      this.controller.clear().subscribe();
    }
  }

  changeState(newState: string){
    if(newState == "addNode" || newState == "delete"){
      this.edges.forEach((values,keys) => values.isSelected = false);
      this.isEdgeMoving = false;
      this.isNodeMoving = false;
      this.movingID = -1;
    }
    this.state = newState;
  }

  showEdgeTangent(id: number, e: MouseEvent){
    let edge: any = this.edges.get(id);
    if((this.state == 'addEdge') || (this.state == 'move')){
      if(e.button == 0){
        edge.isSelected = !edge.isSelected;
      }
      else if(e.button == 2){
        this.flipEdge(id);
      }
    }
  }

  flipEdge(id: number){
    let edge: any = this.edges.get(id);
    let temp = edge.endPoint1;
    edge.endPoint1 = edge.endPoint2;
    edge.endPoint2 = temp;
    temp = edge.fromNode;
    edge.fromNode = edge.toNode;
    edge.toNode = temp;
    edge.updatePath().then(() => edge.updateArrowText());
    this.controller.reverseEdge(id).subscribe();
  }

  mouseDownNode(id: number, e: MouseEvent){
    console.log("Mouse Down Node")
    console.log(this.nodes.get(id));
    if (e.button == 0 && this.state == "move") {
      this.isEdgeMoving = false;
      this.isNodeMoving = true;
      this.movingID = id;
      this.initialClick = new Point(e.clientX, e.clientY);
    }
  }

  mouseDownEdge(id: number, e: MouseEvent){
    if (e.button == 0 && (this.state == "addEdge" || this.state == "move")) {
      let edge: any = this.edges.get(id);
      this.isEdgeMoving = true;
      this.isNodeMoving = false;
      this.movingID = id;
      edge.isDragging = true;
      this.initialClick = new Point(e.clientX, e.clientY);
    }
  }

  mouseMove(e: MouseEvent){
    if(this.isEdgeMoving){
      let edge: any = this.edges.get(this.movingID);
      let offsetX = e.clientX - this.initialClick.x;
      let offsetY = e.clientY - this.initialClick.y;
      edge.curveCenter.x += offsetX;
      edge.curveCenter.y += offsetY;
      edge.updatePath().then(() => edge.updateArrowText());
      this.initialClick = new Point(e.clientX, e.clientY);
    }else if(this.isNodeMoving){
      let node: any = this.nodes.get(this.movingID);
      let offsetX = e.clientX - this.initialClick.x;
      let offsetY = e.clientY - this.initialClick.y;
      node.center.x += offsetX;
      node.center.y += offsetY;
      this.updateEdges(this.movingID);
      this.initialClick = new Point(e.clientX, e.clientY);
    }else{
      e.stopPropagation();
    }
  }

  mouseUp(e: MouseEvent){
    if(this.isEdgeMoving){
      let edge: any = this.edges.get(this.movingID);
      edge.isDragging = false;
    }else if(this.isNodeMoving){
      //Node Movement
    }
    this.isEdgeMoving = false;
    this.isNodeMoving = false;
    this.movingID = -1;
  }

  updateEdges(nodeID: number){
    const node = this.nodes.get(nodeID);
    if(node != undefined){
      node.edges.forEach((edgeID) => {
        const edge = this.edges.get(edgeID);
        if(edge != undefined){
          if(edge.isSelfLoop){
            edge.curveCenter = new Point(edge.endPoint1.x+edge.selfRadius, edge.endPoint1.y+edge.selfRadius)
          }
          edge.updatePath();
          edge.updateArrowText();
        }
      })
    }
  }





}