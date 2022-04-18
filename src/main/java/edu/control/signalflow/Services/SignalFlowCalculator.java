package edu.control.signalflow.Services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;

import edu.control.signalflow.Model.Path;
class NonTouching{
    public List<Path> paths;
    HashSet<Integer> vertcies;
    HashMap<Integer, List<NonTouching>> powerSet;
    NonTouching(){
        paths = new LinkedList<Path>();
        vertcies = new HashSet<Integer>();
    }
    void add(Path path, boolean touching){
        if(!touching || !touches(path)){
            paths.add(path);
            for(int x: path.vertcies){
                vertcies.add(x);
            }
        }
    }
    int size(){
        return paths.size();
    }
    boolean touches(Path path){
        for(int x: path.vertcies){
            if(vertcies.contains(x)){
                return true;
            }
        }
        return false;
    }
    double gain(){
        double gain = 1;
        for(Path p: paths){
            gain *= p.calculateGain();
        }
        return gain;
    }
    HashMap<Integer, List<NonTouching>> powerSet(){
        if(powerSet == null){
            powerSet = new HashMap<Integer, List<NonTouching>>();
            int power = 1 << size();
            for(int i = 0; i < power; i++){
                int x = i;
                NonTouching element = new NonTouching();
                int j = 0, count = 0;
                while(x > 0){
                    if(x % 2 == 1){
                        element.add(paths.get(j), false);
                        count++;
                    }
                    j++;
                    x /= 2;
                }
                List<NonTouching> l = powerSet().get(count);
                if(l == null){
                    l = new LinkedList<NonTouching>();
                    powerSet.put(count, l);
                }
                l.add(element);
            }
        }
        return powerSet;
    }
    @Override
    public String toString(){
        String str = "";
        for(Path p: paths){
            str += p.toString();
        }
        return str;
    }
}



public class SignalFlowCalculator {
    private List<NonTouching> FindNonTouching(List<Path> paths){
        LinkedList<NonTouching> nonTouching = new LinkedList<NonTouching>();
        for(int i = 0; i < paths.size(); i++){
            NonTouching x = new NonTouching();
            x.add(paths.get(i), false);
            for(int j = i + 1; j < paths.size(); j++){
                x.add(paths.get(j), true);
            }
            if(x.size() > 1){
                nonTouching.add(x);
            }
        }
        return nonTouching;
    }
    private List<List<NonTouching>> calculateDeterminant(List<NonTouching> nonTouching, Path p){
        int i = 1;
        LinkedList<List<NonTouching>> determinant = new LinkedList<List<NonTouching>>();
        boolean end = false;
        while(!end){
            end = true;
            LinkedList<NonTouching> touching = new LinkedList<NonTouching>();
            for(NonTouching x: nonTouching){
                if(p == null || !x.touches(p)){
                    List<NonTouching> l = x.powerSet().get(i);
                    if(l != null){
                        end = false;
                        touching.addAll(l);
                    }
                }
            }
            if(!end)
                determinant.add(touching);
            i++;
        }

        return determinant;
    }

    // private List<List<NonTouching>> calculatesubDeterminant(List<List<NonTouching>> determinant, Path p){
    //     List<List<NonTouching>> subDeterminant = new LinkedList<List<NonTouching>>();
    //     for()
    // }
    public void compute(List<Path> paths, List<Path> loops){
        List<NonTouching> nonTouching = FindNonTouching(loops);
        List<List<NonTouching>> determinant = calculateDeterminant(nonTouching, null);
        List<List<List<NonTouching>>> subDeterminant = new ArrayList<List<List<NonTouching>>>();
        for(Path p: paths){
            subDeterminant.add(calculateDeterminant(nonTouching, p));
        }

    }
} 
