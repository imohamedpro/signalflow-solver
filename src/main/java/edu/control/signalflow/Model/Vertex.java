package edu.control.signalflow.Model;

import java.util.ArrayList;
import java.util.List;

public class Vertex {
    int id;
    List<Edge> edges;

    public Vertex(){
        edges = new ArrayList<Edge>();
    }

    @Override
    public String toString(){
        return "v" + id;
    }

}
