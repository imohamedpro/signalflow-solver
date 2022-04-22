package edu.control.signalflow.Services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;

import edu.control.signalflow.Model.Path;
// class NonTouching{
//     public List<Path> paths;
//     HashSet<Integer> vertcies;
//     HashMap<Integer, List<NonTouching>> powerSet;
//     NonTouching(){
//         paths = new LinkedList<Path>();
//         vertcies = new HashSet<Integer>();
//     }
//     void add(Path path, boolean touching){
//         if(!touching || !touches(path)){
//             paths.add(path);
//             for(int x: path.vertcies){
//                 vertcies.add(x);
//             }
//         }
//     }
//     int size(){
//         return paths.size();
//     }
//     boolean touches(Path path){
//         for(int x: path.vertcies){
//             if(vertcies.contains(x)){
//                 return true;
//             }
//         }
//         return false;
//     }
//     double gain(){
//         double gain = 1;
//         for(Path p: paths){
//             gain *= p.calculateGain();
//         }
//         return gain;
//     }
//     HashMap<Integer, List<NonTouching>> powerSet(){
//         if(powerSet == null){
//             powerSet = new HashMap<Integer, List<NonTouching>>();
//             int power = 1 << size();
//             for(int i = 0; i < power; i++){
//                 int x = i;
//                 NonTouching element = new NonTouching();
//                 int j = 0, count = 0;
//                 while(x > 0){
//                     if(x % 2 == 1){
//                         element.add(paths.get(j), false);
//                         count++;
//                     }
//                     j++;
//                     x /= 2;
//                 }
//                 List<NonTouching> l = powerSet().get(count);
//                 if(l == null){
//                     l = new LinkedList<NonTouching>();
//                     powerSet.put(count, l);
//                 }
//                 l.add(element);
//             }
//         }
//         return powerSet;
//     }
//     @Override
//     public String toString(){
//         String str = "";
//         for(Path p: paths){
//             str += p.toString();
//         }
//         return str;
//     }
// }

class NonTouching{
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
    @Override
    public String toString(){
        String str = "";
        for(Path p: loops){
            str += p.toString();
        }
        return str;
    }

}

class Result{
    List<String> paths, loops, deltas;
    List<List<String>> nonTouchingLoops;
    String transferFunction;

    public void stringfyPaths(List<Path> paths){
        for(Path p: paths){
            this.paths.add(p.toString() + " = " + p.calculateGain());
        }
    }
    public void stringfyLoops(List<Path> loops){
        for(Path l: loops){
            this.loops.add(l.toString() + " = " + l.calculateGain());
        }
    }

    public void stringfyNonTouchingLoops(List<List<NonTouching>> determinant){

    }

    public void stringfyDeltas(List<List<NonTouching>> determinant, List<List<List<NonTouching>>> subDeterminant){

    }
}



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
    public void compute(List<Path> paths, List<Path> loops){
        HashMap<Integer, List<NonTouching>> determinant = FindNonTouching(loops);
        // List<List<NonTouching>> determinant = calculateDeterminant(nonTouching, null);
        List<HashMap<Integer, List<NonTouching>>> subDeterminant = new ArrayList<HashMap<Integer, List<NonTouching>>>();
        for(Path p: paths){
            subDeterminant.add(calculateDeterminant(determinant, p));
        }
        

    }
} 
