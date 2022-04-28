package edu.control.signalflow.Controller;

import edu.control.signalflow.Model.Graph;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin()
public class Controller {
    Graph graph;
    //Dummy variables for testing controller
    int nextEdgeID;
    int nextNodeID;
    public Controller(){
        this.graph = new Graph();
        nextEdgeID = 1;
        nextNodeID = 1;
    }

    /**
     * Takes a node data from front end
     * @return id for new node
     */
    @GetMapping ("/node/add")
    public int addNode(){
        int id = this.graph.addVertex();
        System.out.println("Adding new node with id " + (id));
        return id;
    }

    @DeleteMapping("/node/delete")
    public void deleteNode(@RequestParam int nodeID){
        System.out.println("Deleting node with id " + nodeID);
        //delete node with id
        this.graph.removeVertex(nodeID);
    }

    /**
     * Takes edge data from front end
     * @return id for new edge
     */
    @GetMapping("/edge/add")
    public int addEdge(@RequestParam int fromNodeID,
                       @RequestParam int toNodeID,
                       @RequestParam double gain
                        ){
        int id = this.graph.addEdge(fromNodeID, toNodeID, gain);
        System.out.println("Adding new edge from" + fromNodeID + ", to " + toNodeID + ", gain = " + gain + ", with id " + (id));
        return id;
    }

    @PutMapping("/edge/reverse")
    public void reverseEdge(@RequestParam int edgeID){
        System.out.println("Reversing edge " + edgeID);
        this.graph.reverseEdge(edgeID);
        //reverse edge ends
    }

    @DeleteMapping ("/edge/delete")
    public void deleteEdge(@RequestParam int edgeID){
        System.out.println("Deleting edge with id " + edgeID);
        //delete edge with id
        this.graph.deleteEdge(edgeID);
    }

    @PutMapping("/edge/gain")
    public void updateEdgeGain(@RequestParam int edgeID,
                               @RequestParam double gain){
        System.out.println("Updating gain of edge " + edgeID + " to " + gain);
        //update gain
        this.graph.updateGain(edgeID, gain);
    }

    @GetMapping("/result")
    public String result(@RequestParam int inputNodeID,
                         @RequestParam int outputNodeID){
        System.out.println("received input node: "+ inputNodeID);
        System.out.println("received output node: " + outputNodeID);
        //compute answer
        
        return this.graph.signalFlow(inputNodeID, outputNodeID);
    }

    @PutMapping("/clear")
    public void clear(){
        this.graph = new Graph();
        System.out.println("Clearing..");
        nextEdgeID = 0;
        nextNodeID = 0;
    }
}
