package edu.control.signalflow.Model;

import java.util.HashSet;
import java.util.List;

import edu.control.signalflow.Services.Subscript;

public class Path {
    private int id;
    // private String idStr;
    private double gain;
    private String representation;
    boolean loop;
    public List<Edge> edges;
    public HashSet<Integer> vertcies;
    public Path(List<Edge> edges, int id){
        this.id = id;
        // this.idStr = Subscript.convert(id);
        this.gain = 1;
        this.edges = edges;
        vertcies = new HashSet<Integer>();
        for(Edge e: edges){
            vertcies.add(e.source.id);
        }
        this.loop = edges.get(0).source == edges.get(edges.size() - 1).destination;
    }
    public boolean touches(Path p){
        for(Edge e: p.edges){
            if(vertcies.contains(e.source.id)){
                return true;
            }
        }
        return false;
    }
    public double calculateGain(){
        if(this.gain == 1){
            for(Edge e: edges){
                this.gain *= e.gain;
            }
        }
        return this.gain;
    }
    @Override
    public String toString(){
        return loop? "L_{" + id + "}": "P_{" + id + "}"; 
    }
    public String edgesToString(){
        if(representation == null){
            representation = "";
            for(Edge e: edges){
                this.representation += e.toString() + ", ";
            }
            this.representation = this.representation.substring(0, this.representation.length() - 2);
        }
        return representation;
    }
}
