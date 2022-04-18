package edu.control.signalflow.Model;

import java.util.HashSet;
import java.util.List;

public class Path {
    List<Edge> edges;
    HashSet<Integer> vertices;
    public Path(List<Edge> edges){
        this.edges = edges;
        for(Edge e: edges){
            vertices.add(e.source.id);
        }
    }
    public boolean touches(Path p){
        for(Edge e: p.edges){
            if(vertices.contains(e.source.id)){
                return true;
            }
        }
        return false;
    }
}
