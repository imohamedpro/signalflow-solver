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
  selectedNode!: Node | null;
  nextEdgeId!: number; // for test purposes (api should get the edge id)
  nextNodeId!: number; // for test purposes (api should get the node id)
  answer!: string;
  state!: string;   //to get state from toolbar

  constructor(controller: ControllerService) {
    this.edges = new Map<number, Edge>();
    this.nodes = new Map<number, Node>();
    this.nextEdgeId = 0;
    this.nextNodeId = 0;
    this.state = "";
    this.answer = 'Answer should be here';
  }

  createEdge(id: number, endPoint1: Point, endPoint2: Point, gain: number) {
    if(endPoint1.x < endPoint2.x){
      this.edges.set(this.nextEdgeId, new Edge(this.nextEdgeId, endPoint1, endPoint2, gain));
    } else {
      this.edges.set(this.nextEdgeId, new Edge(this.nextEdgeId, endPoint1, endPoint2, gain));
    }
    ++this.nextEdgeId;
  }

  createNode(center: Point) {
    this.nodes.set(this.nextNodeId, new Node(this.nextNodeId, center));
    ++this.nextNodeId;
  }

  select(node: Node) {
    if(this.selectedNode == null){
      this.selectedNode = node;
    } else {
      let gain: any;
      gain = prompt('please enter the gain:');
      if(isNaN(gain) || gain == null || gain == ""){ 
        alert("Invalid input!");
      } else {
        this.createEdge(this.nextEdgeId, this.selectedNode.center, node.center, gain);
      }
      this.selectedNode = null;
    }
  }

  editGain(edge: Edge){
    let gain: any;
    gain = prompt('please enter the new gain of '+ edge.symbol +' :');
    if(isNaN(gain) || gain == null || gain == ""){ 
      alert("Invalid input!");
    } else {
      edge.gain = gain;
    }
  }

  clear() {
    if(confirm('Are you sure ?')){
      this.edges.clear();
      this.nodes.clear();
      this.nextEdgeId = 0;
      this.nextNodeId = 0;
      this.selectedNode = null;
    }
  }

}