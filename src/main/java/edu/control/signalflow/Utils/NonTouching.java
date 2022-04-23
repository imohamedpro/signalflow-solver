package edu.control.signalflow.Utils;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;

import edu.control.signalflow.Model.Path;

public class NonTouching{
    List<Path> loops;
    HashSet<Integer> vertcies;
    boolean valid;
    NonTouching(){
        loops = new LinkedList<Path>();
        vertcies = new HashSet<Integer>();
        valid = false;
    }
    boolean touches(Path path){
        for(int x: path.vertcies){
            if(vertcies.contains(x)){
                return true;
            }
        }
        return false;
    }
    void add(Path path){
        valid = true;
        if(!touches(path)){
            loops.add(path);
            for(int x: path.vertcies){
                vertcies.add(x);
            }
        }else{
            valid = false;
        }
    }

    double gain(){
        double gain = 1;
        for(Path p: loops){
            gain *= p.calculateGain();
        }
        return gain;
    }
    @Override
    public String toString(){
        String str = "";
        for(Path p: loops){
            str += p.toString();
        }
        return str;
    }

}
