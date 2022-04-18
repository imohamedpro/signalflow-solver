package edu.control.signalflow.Model;
import java.lang.reflect.Array;
import java.util.HashSet;


import java.util.*;

public class Graph {
    int vertexID=1, edgeID=1;
    List<Vertex> vertices = new ArrayList<>();

    public void addVertex(){
        Vertex vertex = new Vertex();
        vertex.id = vertexID ++;
        vertices.add(vertex);
    }

    public void removeVertex(int vertexID){
        /*
            To be implemented: removing all incident edges
        */
        Vertex vertex = getVertexFromID(vertexID);
        for(int i=0; i<vertex.edges.size(); i++){
            vertex.edges.remove(vertex.edges.get(i));
        }
        vertices.remove(vertex);
    }

    /*
    Approach:
    Each vertex has a list of edges incident "from it"
     */
    public void addEdge(int srcID, int destID, double gain){
        Edge edge = new Edge();
        Vertex src = getVertexFromID(srcID);
        Vertex dest = getVertexFromID(destID);
//      Initializing the new edge values:
        try {
            edge.source = src;
            edge.destination = dest;
            edge.gain = gain;
//          Each vertex has a list of edges incident "from it"
            src.edges.add(edge);
            edge.id = edgeID ++;
        }
        catch (NullPointerException e) {
            System.out.print("Caught the NullPointerException");
        }
    }

    public void removeEdge(Edge edge) {
        Vertex vertex = edge.source;
        for(int i=0; i<vertex.edges.size(); i++){
            if(vertex.edges.get(i)==edge){
                vertex.edges.remove(vertex.edges.get(i));
                return;
            }
        }
        System.out.println("Edge not found!");
    }

    public List<Vertex> allPaths () {
        List<Vertex> list = new ArrayList<>();
        

        return list;
    }

    private Vertex getVertexFromID(int id){
        int l = 0, r = vertices.size() - 1, m=0;

        while (l <= r) {
            m = l + (r-l)/2;
            if (vertices.get(m).id == id)
                return vertices.get(m);

            if (vertices.get(m).id < id)
                l = m + 1;
            else
                r = m - 1;
        }
        return vertices.get(m);
    }

    public void print(){
        for (Vertex vertex : vertices) {
            System.out.println("Vertex " + vertex.id + ": ");

            for (int j = 0; j < vertex.edges.size(); j++) {
                System.out.print(vertex.edges.get(j).id);
                if(j<vertex.edges.size()-1)
                    System.out.print(" --> ");
            }
            System.out.println();
        }
    }

    HashSet<Edge> visitedEdges = new HashSet<>();


    public void getPaths () {
        Vertex start = vertices.get(0);
        Vertex end = vertices.get(vertices.size()-1);
        ArrayList<Vertex> pathList = new ArrayList<>();
        HashSet<Vertex> visitedVertices = new HashSet<>();
        getAllPaths(start, end, pathList, visitedVertices);
        printAllPaths();
    }

    private void printAllPaths(){
        System.out.println("Created Path:");
        for(ArrayList<Vertex> list:this.allPaths){
            for(Vertex i:list){
                System.out.print(i.id+"  ");
            }   System.out.println();
        }

    }

    ArrayList<ArrayList<Vertex>> allPaths = new ArrayList<>();

    public void getAllPaths (Vertex start, Vertex end, ArrayList<Vertex> pathList, HashSet<Vertex> visitedVertices) {
        pathList.add(start);
        if(start.equals(end)) {
            ArrayList<Vertex> finalPath = new ArrayList<>(pathList);
//            Collections.copy(finalPath, pathList);
            this.allPaths.add(finalPath);
            pathList.remove(start);
            return;
        }

        visitedVertices.add(start);

        for(Edge i: start.edges){
            if(!visitedVertices.contains(i.destination)) {
                getAllPaths(i.destination, end, pathList, visitedVertices);
            }
        }
        visitedVertices.remove(start);
        pathList.remove(start);
    }


}



class Test {
    public static void main(String[] args) {
        Graph graph = new Graph();
        for(int i=0; i<8; i++){
            graph.addVertex();
        }
//        graph.addEdge();
        for(int i=0; i<graph.vertices.size(); i++){
            Vertex vertex = graph.vertices.get(i);
            System.out.println(vertex.id);
        }

        graph.addEdge(1, 2, 5);
        graph.addEdge(2, 3, 5);
        graph.addEdge(3, 4, 5);
        graph.addEdge(4, 5, 5);
        graph.addEdge(5, 6, 5);
        graph.addEdge(6, 7, 5);
        graph.addEdge(7, 8, 5);
        graph.addEdge(2, 4, 5);
        graph.addEdge(2, 7, 5);
        graph.addEdge(7, 5, 5);
        graph.addEdge(7, 7, 5);
        graph.addEdge(7, 6, 5);
        graph.addEdge(6, 5, 5);
        graph.addEdge(5, 4, 5);
        graph.addEdge(4, 3, 5);
        graph.addEdge(3, 2, 5);


//        graph.print();
//        graph.removeVertex(4);
//        graph.print();
//        graph.addVertex();
//        graph.print();

        graph.getPaths();

    }
}