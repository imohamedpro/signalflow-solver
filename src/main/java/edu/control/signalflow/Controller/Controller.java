package edu.control.signalflow.Controller;

import edu.control.signalflow.Model.Graph;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin()
public class Controller {
    Graph graph = new Graph();

    /**
     * Takes a node data from front end
     * @param node node to be added
     * @return id for new node
     */
    @PutMapping("/node/add")
    public int addNode(@RequestBody Object node){
        graph.addVertex();
        return 0;
    }

    /**
     * Takes a path data from front end
     * @param path
     * @return id for new path
     */
    @PutMapping("/path/add")
    public int addPath(@RequestBody Object path){

        return 0;
    }

    @DeleteMapping("/node/delete")
    public void deleteNode(@RequestParam int id){
        //delete node with id
    }

    @DeleteMapping("/path/delete")
    public void deletePath(@RequestParam int id){
        //delete path with id
    }

    @PostMapping("/data")
    public void data(@RequestBody Object data){
        //table data
    }

    @GetMapping("/result")
    public Object result(){
        return null;
    }
}
