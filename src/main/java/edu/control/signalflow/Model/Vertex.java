package edu.control.signalflow.Model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import edu.control.signalflow.Services.Subscript;

public class Vertex {
    int id;
    List<Edge> edges;

    public Vertex(){
        edges = new ArrayList<Edge>();
    }

    @Override
    public String toString(){
        return "v_{" + id + "}";
    }
    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Vertex)) {
            return false;
        }
        Vertex vertex = (Vertex) o;
        return id == vertex.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}


