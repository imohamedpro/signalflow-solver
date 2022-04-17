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
  nextEdgeNumber!: number;
  nextNodeNumber!: number;

  constructor(controller: ControllerService) {
    this.edges = new Map<number, Edge>();
    this.nodes = new Map<number, Node>();
    this.nextEdgeId = 0;
    this.nextNodeId = 0;
    this.nextEdgeNumber = 0;
    this.nextNodeNumber = 0;
  }

  createEdge(id: number, center1: Point, center2: Point) {
    this.edges.set(this.nextEdgeId++, new Edge(this.nextEdgeId, this.nextEdgeNumber++, center1, center2));
  }

  createNode(center: Point) {
    this.nodes.set(this.nextNodeId++, new Node(this.nextNodeId, this.nextNodeNumber++, center));
  }

  select(node: Node) {
    if(this.selectedNode == null){
      this.selectedNode = node;
    } else {
      this.createEdge(this.nextEdgeId++, this.selectedNode.center, node.center);
      this.selectedNode = null;
    }
  }

  clear() {
    this.edges.clear();
    this.nodes.clear();
    this.nextEdgeId = 0;
    this.nextNodeId = 0;
    this.nextEdgeNumber = 0;
    this.nextNodeNumber = 0;
    this.selectedNode = null;
  }

}