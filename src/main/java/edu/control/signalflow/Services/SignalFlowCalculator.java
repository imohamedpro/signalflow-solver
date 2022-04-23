package edu.control.signalflow.Services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map.Entry;

import edu.control.signalflow.Model.Path;
import edu.control.signalflow.Utils.NonTouching;
import edu.control.signalflow.Utils.Pair;
import edu.control.signalflow.Utils.Result;






public class SignalFlowCalculator {
    private HashMap<Integer, List<NonTouching>> FindNonTouching(List<Path> paths){
        HashMap<Integer, List<NonTouching>> powerSet = new HashMap<Integer, List<NonTouching>>();
        // for(int i = 0; i < paths.size(); i++){
        //     NonTouching x = new NonTouching();
        //     x.add(paths.get(i), false);
        //     for(int j = i + 1; j < paths.size(); j++){
        //         x.add(paths.get(j), true);
        //     }
        //     if(x.size() > 1){
        //         nonTouching.add(x);
        //     }
        // }
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
        // int i = 1;
        HashMap<Integer, List<NonTouching>> determinant = new HashMap<Integer, List<NonTouching>>();
        // boolean end = false;
        // while(!end){
        //     end = true;
        //     LinkedList<NonTouching> touching = new LinkedList<NonTouching>();
        //     for(int i = 0; i < nonTouching.size(); i++){

        //     }
        //     for(NonTouching x: nonTouching){
        //         if(p == null || !x.touches(p)){
        //             // List<NonTouching> l = x.powerSet().get(i);
        //             // if(l != null){
        //             //     end = false;
        //             //     touching.addAll(l);
        //             // }
        //         }
        //     }
        //     if(!end)
        //         determinant.add(touching);
        //     // i++;
        // }
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

    // private List<List<NonTouching>> calculatesubDeterminant(List<List<NonTouching>> determinant, Path p){
    //     List<List<NonTouching>> subDeterminant = new LinkedList<List<NonTouching>>();
    //     for()
    // }
    public String compute(List<Path> paths, List<Path> loops){
        // String finalResult = "";
        HashMap<Integer, List<NonTouching>> determinant = FindNonTouching(loops);
        // List<List<NonTouching>> determinant = calculateDeterminant(nonTouching, null);
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
        // System.out.println("Paths:");
        // finalResult += "Forward\\ Paths:\\\\";
        // for(Pair p: res.paths){
        //     String str = p.str + " = " + p.val;
        //     finalResult += str + "\\\\";
        //     System.out.println(str);
        // }
        // if(res.loops.size() > 0){
        //     System.out.println("Loops:");
        //     finalResult += "Loops:\\\\";
        //     for(Pair p: res.loops){
        //         String str = p.str + " = " + p.val;
        //         finalResult += str + "\\\\";
        //         System.out.println(str);
        //     }
        //     if(res.nonTouchingLoops.size() > 0){
        //         System.out.println("Non Touching Loops:");
        //         finalResult += "Non\\ Touching\\ Loops:\\\\";
        //         for(Entry<Integer, String> e: res.nonTouchingLoops.entrySet()){
        //             String str = e.getValue();
        //             finalResult += str + "\\\\";
        //             System.out.println(str);
        //         }
        //     }
        // }

        // System.out.println("deltas:");
        // finalResult += "Deltas:\\\\";
        // for(Pair p: res.deltas){
        //     // String s = p.str.split("= ")[1].replaceAll("{|}", "");
        //     String str = p.str + " = " + p.val;
        //     finalResult += str + "\\\\";
        //     System.out.println(str);
        // }
        // String str = "Overall\\ Transfer\\ Function: {" + res.transferFunction.str + "} = " + res.transferFunction.val;
        // finalResult += str;
        // System.out.println(str);
        // return finalResult;
    }
} 
