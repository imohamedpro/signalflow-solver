package edu.control.signalflow.Services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import edu.control.signalflow.Model.Path;
import edu.control.signalflow.Utils.NonTouching;
import edu.control.signalflow.Utils.Result;
public class SignalFlowCalculator {
    private HashMap<Integer, List<NonTouching>> FindNonTouching(List<Path> paths){
        HashMap<Integer, List<NonTouching>> powerSet = new HashMap<Integer, List<NonTouching>>();
        int power = 1 << paths.size();
        for(int i = 0; i < power; i++){
            int x = i;
            NonTouching element = new NonTouching();
            int j = 0, count = 0;
            while(x > 0){
                if(x % 2 == 1){
                    element.add(paths.get(j));
                    if(!element.valid)  break;
                    count++;
                }
                j++;
                x /= 2;
            }
            List<NonTouching> l = powerSet.get(count);
            if(l == null){
                l = new LinkedList<NonTouching>();
                powerSet.put(count, l);
            }
            if(element.valid){
                l.add(element);
            }
        }
        System.out.println(powerSet.toString());

        return powerSet;
    }
    private HashMap<Integer, List<NonTouching>> calculateDeterminant(HashMap<Integer, List<NonTouching>> nonTouching, Path p){
        HashMap<Integer, List<NonTouching>> determinant = new HashMap<Integer, List<NonTouching>>();
        for(int i = 1; i < nonTouching.size(); i++){
            List<NonTouching> l = nonTouching.get(i);
            List<NonTouching> nw = new ArrayList<NonTouching>();
            determinant.put(i, nw);
            if(l != null){
                for(NonTouching nt: l){
                    if(!nt.touches(p)){
                        nw.add(nt);
                    }
                }
            }
        }
        System.out.println(determinant);

        return determinant;
    }
    public String compute(List<Path> paths, List<Path> loops){
        HashMap<Integer, List<NonTouching>> determinant = FindNonTouching(loops);
        List<HashMap<Integer, List<NonTouching>>> subDeterminant = new ArrayList<HashMap<Integer, List<NonTouching>>>();
        for(Path p: paths){
            subDeterminant.add(calculateDeterminant(determinant, p));
        }

        Result res = new Result();
        res.stringfyPaths(paths);
        res.stringfyLoops(loops);
        res.stringfyNonTouchingLoops(determinant);
        res.stringfyDeltas(determinant, subDeterminant);
        res.stringfyTF();
        return res.generateResult();
    }
} 
