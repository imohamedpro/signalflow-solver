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
  answer!: string;
  state!: string;   //to get state from toolbar

  constructor(private controller: ControllerService) {
    this.edges = new Map<number, Edge>();
    this.nodes = new Map<number, Node>();
  }


  createEdge(fromNode: number, toNode: number, endPoint1: Point, endPoint2: Point, gain: number) {
    this.controller.addEdge(fromNode, toNode, gain).subscribe(id => {
      const edge = new Edge(id, fromNode, toNode, endPoint1, endPoint2, gain)
      this.edges.set(id, edge);
      const node: any = this.nodes.get(toNode);
      if (this.selectedNode == node) {
        node.addEdge(edge);
      } else {
        this.selectedNode.addEdge(edge);
        node.addEdge(edge);
      }
      this.selectedNode = null;
    });
  }

  createNode(center: Point) {
    this.controller.addNode().subscribe(id => {
      this.nodes.set(id, new Node(id, center));
    });
  }

  select(node: Node) {
    if (this.selectedNode == null) {
      this.selectedNode = node;
    } else {
      let gain: any;
      gain = prompt('please enter the gain:');
      if (isNaN(gain) || gain == "") {
        alert("Invalid input!");
        this.selectedNode = null;
      } else if (gain != null) {
        this.createEdge(this.selectedNode.id, node.id, this.selectedNode.center, node.center, gain);
      }
    }
  }

  editGain(edge: Edge) {
    let gain: any;
    gain = prompt('please enter the new gain of ' + edge.symbol + ' :');
    if (isNaN(gain) || gain == '') {
      alert("Invalid input!");
    } else if (gain != null) {
      edge.gain = gain;
      this.controller.updateGain(edge.id, gain).subscribe();
    }
  }

  deleteNode(node: Node) {
    node.edges.forEach(edge => {
      this.deleteEdge(edge);
    });
    this.controller.deleteNode(node.id).subscribe();
    this.nodes.delete(node.id);
  }

  deleteEdge(edge: Edge) {
    this.controller.deleteEdge(edge.id).subscribe();
    this.nodes.get(edge.fromNode)?.removeEdge(edge);
    this.nodes.get(edge.toNode)?.removeEdge(edge);
    this.edges.delete(edge.id);
  }

  clear() {
    if (confirm('Are you sure ?')) {
      this.edges.clear();
      this.nodes.clear();
      this.selectedNode = null;
      this.controller.clear().subscribe();
    }
  }

  changeState(newState: string) {
    if (newState == "addNode" || newState == "delete") {
      this.edges.forEach((values, keys) => values.isSelected = false);
    }
    this.state = newState;
    this.selectedNode = null;
  }

  showEdgeTangent(id: number, e: MouseEvent) {
    let edge: any = this.edges.get(id);
    if ((this.state == 'addEdge') || (this.state == 'move')) {
      if (e.button == 0) {
        edge.isSelected = !edge.isSelected;
      }
      else if (e.button == 2) {
        this.flipEdge(id);
      }
    }
  }

  flipEdge(id: number) {
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
}