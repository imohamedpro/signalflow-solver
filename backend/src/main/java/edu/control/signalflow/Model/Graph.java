package edu.control.signalflow.Model;
import edu.control.signalflow.Services.SignalFlowCalculator;

import java.io.File;
import java.io.FileWriter;
import java.util.*;


public class Graph {
    int vertexID, edgeID;
    HashMap<Integer, Vertex> vertices;
    HashMap<Integer, Edge> edges;

    private ArrayList<Path> allPaths;
    // private HashSet<Edge> visitedEdges = new HashSet<>();

    public Graph(){
        vertices = new HashMap<Integer, Vertex>();
        edges = new HashMap<Integer, Edge>();
        edgeID = 0;
        vertexID = 0;
    }
    public int addVertex(){
        Vertex vertex = new Vertex();
        vertex.id = vertexID++;
        vertices.put(vertex.id, vertex);
        return vertex.id;
    }
    public int addVertex(int id){
        Vertex vertex = new Vertex();
        vertex.id = id;
        vertices.put(vertex.id, vertex);
        return vertex.id;
    }

    public void removeVertex(int vertexID){
        /*
            To be implemented: removing all incident edges: done
        */
        Vertex vertex = this.vertices.remove(vertexID);
        List<Edge> edgeList = new LinkedList<Edge>(vertex.edges);
        for(Edge e: edgeList){
            this.removeEdge(e);
        }
        for(Vertex v: this.vertices.values()){
            edgeList = new LinkedList<Edge>(v.edges);
            for(Edge e: edgeList){
                if(vertex.equals(e.destination)){
                    this.removeEdge(e);

                }
            }
        }
    }

    /*
    Approach:
    Each vertex has a list of edges incident "from it"
     */
    public int addEdge(int srcID, int destID, double gain){
        Edge edge = new Edge();
        Vertex src = vertices.get(srcID);
        Vertex dest = vertices.get(destID);
//      Initializing the new edge values:
        try {
            edge.source = src;
            edge.destination = dest;
            edge.gain = gain;
//          Each vertex has a list of edges incident "from it"
            src.edges.add(edge);
            edge.id = edgeID++;
            edges.put(edge.id, edge);
        }
        catch (NullPointerException e) {
            System.out.println("Caught the NullPointerException");
        }
        return edge.id;
    }

    public int addEdge(int srcID, int destID, double gain, int id){
        Edge edge = new Edge();
        Vertex src = vertices.get(srcID);
        Vertex dest = vertices.get(destID);
//      Initializing the new edge values:
        try {
            edge.source = src;
            edge.destination = dest;
            edge.gain = gain;
//          Each vertex has a list of edges incident "from it"
            src.edges.add(edge);
            edge.id = id;
            edges.put(edge.id, edge);
        }
        catch (NullPointerException e) {
            System.out.println("Caught the NullPointerException");
        }
        return edge.id;
    }

    public void deleteEdge(int edgeID){
        removeEdge(this.edges.remove(edgeID));
    }
    private void removeEdge(Edge edge) {
        Vertex vertex = edge.source;
        for(int i=0; i<vertex.edges.size(); i++){
            if(vertex.edges.get(i)==edge){
                vertex.edges.remove(vertex.edges.get(i));
                return;
            }
        }
        System.out.println("Edge not found!");
    }

    public void reverseEdge(int edgeID){
        Edge e = this.edges.get(edgeID);
        e.source.edges.remove(e);
        e.destination.edges.add(e);
        Vertex temp = e.source;
        e.source = e.destination;
        e.destination = temp;

    }

    public void updateGain(int edgeID, double gain){
        Edge e = this.edges.get(edgeID);
        e.gain = gain;
    }

    public void print(){
        for (Vertex vertex : vertices.values()) {
            System.out.println("Vertex " + vertex.id + ": ");

            for (int j = 0; j < vertex.edges.size(); j++) {
                System.out.print(vertex.edges.get(j).id);
                if(j<vertex.edges.size()-1)
                    System.out.print(" --> ");
            }
            System.out.println();
        }
    }

    


    public void getPaths (int sourceID, int destinationID) {
        this.allPaths = new ArrayList<>();
        Vertex start = vertices.get(sourceID);
        Vertex end = vertices.get(destinationID);
        Stack<Edge> pathList = new Stack<Edge>();
        HashSet<Vertex> visitedVertices = new HashSet<>();
        getAllPaths(start, end, pathList, visitedVertices);
        // printAllPaths();
    }

    // private void printAllPaths(){
    //     System.out.println("Created Path:");
    //     for(ArrayList<Edge> list:this.allPaths){
    //         System.out.println(list.toString());
    //         // for(Edge i:list){
    //         //     System.out.print(i.toString());
    //         // }   System.out.println();
    //     }

    // }


    public void getAllPaths (Vertex start, Vertex end, Stack<Edge> pathList, HashSet<Vertex> visitedVertices) {
        if(start.equals(end)) {
            ArrayList<Edge> finalPath = new ArrayList<Edge>(pathList);
            this.allPaths.add(new Path(finalPath, 1 + this.allPaths.size()));
            return;
        }

        visitedVertices.add(start);

        for(Edge i: start.edges){
            if(!visitedVertices.contains(i.destination)) {
                pathList.push(i);
                getAllPaths(i.destination, end, pathList, visitedVertices);
                pathList.pop();
            }
        }
        visitedVertices.remove(start);
    }


    public Graph clone(){
        Graph clone = new Graph();
        for(Vertex v: this.vertices.values()){
            clone.addVertex(v.id);
        }
        for(Edge e: this.edges.values()){
            clone.addEdge(e.source.id, e.destination.id, e.gain);
        }
        return clone;
    }

    public List<Path> getLoops(){
        return new LoopsFinder(this.clone()).getLoops();
    }

    public String signalFlow(int sourcID, int destinationID){
        SignalFlowCalculator sf = new SignalFlowCalculator();
        this.getPaths(sourcID, destinationID);
        return sf.compute(this.allPaths, getLoops());
    }

}



class Test {
    public static void main(String[] args) throws Exception {
        Graph graph = new Graph();
        for(int i=0; i<8; i++){
            graph.addVertex();
        }
//        graph.addEdge();
        // for(int i=0; i<graph.vertices.size(); i++){
        //     Vertex vertex = graph.vertices.get(i);
        //     System.out.println(vertex.id);
        // }

        // graph.addEdge(1, 2, 1);
        // graph.addEdge(2, 3, 1);
        // graph.addEdge(3, 2, 1);
        // graph.addEdge(3, 4, 1);
        // graph.addEdge(4, 5, 1);
        // graph.addEdge(5, 4, 1);
        // graph.addEdge(5, 6, 1);
        // graph.addEdge(5, 6, 1);
        // graph.addEdge(6, 4, 1);
        // graph.addEdge(6, 7, 1);
        
        graph.addEdge(0, 1, 1);
        graph.addEdge(1, 2, 1);
        graph.addEdge(2, 3, 1);
        graph.addEdge(3, 4, 1);
        graph.addEdge(0, 5, 1);
        graph.addEdge(5, 6, 1);
        graph.addEdge(6, 7, 1);
        graph.addEdge(7, 4, 1);
        graph.addEdge(2, 1, -1);
        graph.addEdge(3, 2, -1);
        graph.addEdge(6, 5, -1);
        graph.addEdge(7, 6, -1);



        // graph.addEdge(1, 2, 5);
        // graph.addEdge(2, 3, 5);
        // graph.addEdge(3, 4, 5);
        // graph.addEdge(4, 5, 5);
        // graph.addEdge(5, 6, 5);
        // graph.addEdge(6, 7, 5);
        // graph.addEdge(7, 8, 5);
        // graph.addEdge(2, 4, 5);
        // graph.addEdge(2, 7, 5);
        // graph.addEdge(7, 5, 5);
        // graph.addEdge(7, 7, 5);
        // graph.addEdge(7, 6, 5);
        // graph.addEdge(6, 5, 5);
        // graph.addEdge(5, 4, 5);
        // graph.addEdge(4, 3, 5);
        // graph.addEdge(3, 2, 5);

//        graph.print();
//        graph.removeVertex(4);
//        graph.print();
//        graph.addVertex();
//        graph.print();

        // graph.getLoops();
        // String x = Subscript.convert(12345);
        // System.out.println("\n\n\n" + graph.signalFlow());
        File fp =  new File("test.txt");
        FileWriter fw = new FileWriter(fp);
        fw.write(graph.signalFlow(0, 4));
        fw.close();


    }
}