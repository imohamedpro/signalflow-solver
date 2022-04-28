package edu.control.signalflow.Model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Stack;

public class LoopsFinder {
    Graph g;
    HashMap<Integer, List<Vertex>> b;
    HashSet<Integer> blocked;
    Stack<Edge> stack;
    List<List<Edge>> loops;
    Vertex s;
    LoopsFinder(Graph g){
        this.g = g;
        b = new HashMap<Integer, List<Vertex>>();
        blocked = new HashSet<Integer>();
        loops = new ArrayList<List<Edge>>();
        stack = new Stack<Edge>();
    }

    private boolean circuit(Vertex v){
        boolean f = false;
        blocked.add(v.id);
        for(Edge e: v.edges){
            Vertex w = e.destination;
            if(w.equals(s)){
                f = true;
                List<Edge> l = new ArrayList<Edge>(stack);
                l.add(e);
                loops.add(l);
                System.out.println(l.toString());
            }else if(!blocked.contains(w.id)){
                stack.push(e);
                if(circuit(w))  f = true;
            }
        }
        if(f){
            unblock(v);
        }else{
            for(Edge e: v.edges){
                Vertex w = e.destination;
                List<Vertex> list = b.get(w.id);
                if(!list.contains(v)){
                    list.add(v);
                }
            }
        }
        
        if(!stack.isEmpty())
            stack.pop();
        return f;
    }
    private void unblock(Vertex u){
        blocked.remove(u.id);
        List<Vertex> l = b.get(u.id);
        while(l != null && !l.isEmpty()){
            Vertex w = l.remove(0);
            if(blocked.contains(w.id)){
                unblock(w);
            }
        }
    }

    public List<Path> getLoops(){
        List<Vertex> vertcies = new LinkedList<Vertex>(g.vertices.values());
        for(Vertex u: vertcies){
            b = new HashMap<Integer, List<Vertex>>();
            blocked = new HashSet<Integer>();

            for(Vertex v: g.vertices.values()){
                b.put(v.id, new ArrayList<Vertex>());
            }
            s = u;
            circuit(s);
            g.removeVertex(s.id);
        }
        List<Path> loops = new ArrayList<Path>();
        int i = 0;
        for(List<Edge> l: this.loops){
            loops.add(new Path(l, ++i));
        }
        return loops;

    }
}
