package edu.control.signalflow.Model;

import java.util.List;

public class Vertex {
    int id;
    List<Edge> edges;

    @Override
    public String toString(){
        return "v" + id;
    }
}
