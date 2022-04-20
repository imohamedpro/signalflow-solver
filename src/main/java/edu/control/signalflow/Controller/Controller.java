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

    @PutMapping("/node/delete")
    public void deleteNode(@RequestBody int id){
        System.out.println("Deleting node with id " + id);
        //delete node with id
    }

    /**
     * Takes edge data from front end
     * @return id for new edge
     */
    @PutMapping("/edge/add")
    public int addEdge(@RequestParam int fromNodeID,
                       @RequestParam int toNodeID,
                       @RequestParam double gain
                        ){
        System.out.println("Adding new edge from" + fromNodeID + ", to " + toNodeID + ", gain = " + gain + ", with id " + (nextEdgeID));
        return nextEdgeID++;
    }

    @PutMapping("/edge/reverse")
    public void reverseEdge(@RequestBody int id){
        System.out.println("Reversing edge " + id);
        //reverse edge ends
    }

    @PutMapping("/edge/delete")
    public void deleteEdge(@RequestBody int id){
        System.out.println("Deleting edge with id " + id);
        //delete edge with id
    }

    @PutMapping("/edge/gain")
    public void updateEdgeGain(@RequestParam int id,
                               @RequestParam double gain){
        System.out.println("Updating gain of edge " + id + " to " + gain);
        //update gain
    }

    @GetMapping("/result")
    public Object result(){
        System.out.println("Solving.. Getting result..");
        return null;
    }

    @PutMapping("/clear")
    public void clear(){
        System.out.println("Clearing..");
        nextEdgeID = 0;
        nextNodeID = 0;
    }
}
