package edu.control.signalflow.Controller;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin()
public class Controller {
    //Dummy variables for testing controller
    int nextEdgeID = 0;
    int nextNodeID = 0;

    /**
     * Takes a node data from front end
     * @return id for new node
     */
    @GetMapping ("/node/add")
    public int addNode(){
        System.out.println("Adding new node with id " + (nextNodeID));
        return nextNodeID++;
    }

    @DeleteMapping("/node/delete")
    public void deleteNode(@RequestParam int nodeID){
        System.out.println("Deleting node with id " + nodeID);
        //delete node with id
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
        System.out.println("Adding new edge from" + fromNodeID + ", to " + toNodeID + ", gain = " + gain + ", with id " + (nextEdgeID));
        return nextEdgeID++;
    }

    @PutMapping("/edge/reverse")
    public void reverseEdge(@RequestParam int edgeID){
        System.out.println("Reversing edge " + edgeID);
        //reverse edge ends
    }

    @DeleteMapping ("/edge/delete")
    public void deleteEdge(@RequestParam int edgeID){
        System.out.println("Deleting edge with id " + edgeID);
        //delete edge with id
    }

    @PutMapping("/edge/gain")
    public void updateEdgeGain(@RequestParam int edgeID,
                               @RequestParam double gain){
        System.out.println("Updating gain of edge " + edgeID + " to " + gain);
        //update gain
    }

    @GetMapping("/result")
    public String result(@RequestParam int inputNodeID,
                         @RequestParam int outputNodeID){
        System.out.println("received input node: "+ inputNodeID);
        System.out.println("received output node: " + outputNodeID);
        //compute answer
        return "test";
    }

    @PutMapping("/clear")
    public void clear(){
        System.out.println("Clearing..");
        nextEdgeID = 0;
        nextNodeID = 0;
    }
}
