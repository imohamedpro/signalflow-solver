package edu.control.signalflow.Model;

public class Edge {
    int id;
    double gain;
    Vertex source, destination;

    @Override
    public String toString(){
        return "e" + id;
    }
}
