package edu.control.signalflow.Model;

import java.util.Objects;

import edu.control.signalflow.Services.Subscript;

public class Edge {
    int id;
    double gain;
    Vertex source, destination;

    @Override
    public String toString(){
        return "e" + Subscript.convert(id);
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof Edge)) {
            return false;
        }
        Edge edge = (Edge) o;
        return id == edge.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

}