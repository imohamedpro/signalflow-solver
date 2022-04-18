package edu.control.signalflow.Model;

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

}



class Test {
    public static void main(String[] args) {
        Graph graph = new Graph();
        for(int i=0; i<6; i++){
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
        graph.addEdge(3, 5, 5);
        graph.addEdge(4, 2, 5);
        graph.addEdge(5, 3, 5);

        graph.print();
        graph.removeVertex(4);
        graph.print();
        graph.addVertex();
        graph.print();



    }
}