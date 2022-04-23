package edu.control.signalflow.Services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map.Entry;

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
class Pair{
    String str;
    Double val;
}
class Result{

    // List<Pair> pathStr, loopStr, deltaStr;
    List<Pair> paths, loops, deltas;
    HashMap<Integer, String> nonTouchingLoops;
    Pair transferFunction;


    public void stringfyPaths(List<Path> paths){
        this.paths = new LinkedList<Pair>();
        for(Path p: paths){
            Pair pair = new Pair();
            pair.str = p.toString() + ":\\ " + p.edgesToString();
            pair.val = p.calculateGain();
            this.paths.add(pair);
        }
    }
    public void stringfyLoops(List<Path> loops){
        this.loops = new LinkedList<Pair>();
        for(Path l: loops){
            Pair pair = new Pair();
            pair.str = l.toString() + ":\\ " + l.edgesToString();
            pair.val = l.calculateGain();
            this.loops.add(pair);
        }
    }

    public void stringfyNonTouchingLoops(HashMap<Integer, List<NonTouching>> determinant){
        this.nonTouchingLoops = new HashMap<Integer, String>();

        for(int i = 1; i < determinant.size(); i++){
            List<NonTouching> l = determinant.get(i);
            if(l.size() > 0){
                String str =  i + "-non\\ touching\\ loops:\\\\";
                for(NonTouching nt: l){
                    str += nt.toString() + ",\\ ";
                }
                str = str.substring(0, str.length() - 2);
                this.nonTouchingLoops.put(i, str);
            }
        }
    }

    private Pair calculateDelta(HashMap<Integer, List<NonTouching>> nt){
        Pair pair = new Pair();
        pair.str = "1";
        pair.val = 1.0;
        for(int i = 1; i < nt.size(); i++){
            List<NonTouching> l = nt.get(i);
            if(l.size() > 0){
                String str = "(";
                double val = 0;
                boolean first = true;
                for(NonTouching non: l){
                    if(!first){
                        str += " + ";
                    }else{
                        first = false;
                    }
                    str += non.toString();
                    val += non.gain();
                }
                str += ")";
                if(i % 2 == 1){
                    pair.str += " - " + str;
                    pair.val -= val;
                    
                }else{
                    pair.str += " + " + str;
                    pair.val += val;
                }
            }
        }
        if(pair.str.equals("1")){
            pair.str = "";
        }
        return pair;
    }

    public void stringfyDeltas(HashMap<Integer, List<NonTouching>> determinant, List<HashMap<Integer, List<NonTouching>>> subDeterminant){
        this.deltas = new LinkedList<Pair>();
        Pair p = calculateDelta(determinant);
        if(p.str.isBlank()){
            p.str = "\\Delta";
        }else{
            p.str = "\\Delta" + " = {" + p.str + "}";
        }
        
        this.deltas.add(p);
        int i = 1;
        for(HashMap<Integer, List<NonTouching>> map: subDeterminant){
            p = calculateDelta(map);
            if(p.str.isBlank()){
                p.str = "\\Delta_" + i;
            }else{
                p.str = "\\Delta_" + i + " = {" + p.str + "}";
            }
            this.deltas.add(p);
            i++;
        }
    }

    public void stringfyTF(){
        this.transferFunction = new Pair();
        this.transferFunction.str = "{";
        this.transferFunction.val = 0.0;

        Iterator<Pair> path = this.paths.iterator();
        Iterator<Pair> delta = this.deltas.iterator();
        Pair determinant = delta.next();
        boolean first = true;
        while(path.hasNext()){
            Pair iPath = path.next();
            Pair iDelta = delta.next();
            if(!first){
                this.transferFunction.str += " + ";
            }else{
                first = false;
            }
            this.transferFunction.str += iPath.str.split(":")[0] + iDelta.str.split(" =")[0];
            this.transferFunction.val += iPath.val * iDelta.val;
        }

        this.transferFunction.str += "} \\over " +  "{" + determinant.str.split(" =")[0] + "}";
        this.transferFunction.val /= determinant.val;
        // System.out.println(this.transferFunction.str + " = " + this.transferFunction.val);
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
    public String compute(List<Path> paths, List<Path> loops){
        String finalResult = "";
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
        System.out.println("Paths:");
        finalResult += "Forward\\ Paths:\\\\";
        for(Pair p: res.paths){
            String str = p.str + " = " + p.val;
            finalResult += str + "\\\\";
            System.out.println(str);
        }
        if(res.loops.size() > 0){
            System.out.println("Loops:");
            finalResult += "Loops:\\\\";
            for(Pair p: res.loops){
                String str = p.str + " = " + p.val;
                finalResult += str + "\\\\";
                System.out.println(str);
            }
            if(res.nonTouchingLoops.size() > 0){
                System.out.println("Non Touching Loops:");
                finalResult += "Non\\ Touching\\ Loops:\\\\";
                for(Entry<Integer, String> e: res.nonTouchingLoops.entrySet()){
                    String str = e.getValue();
                    finalResult += str + "\\\\";
                    System.out.println(str);
                }
            }
        }

        System.out.println("deltas:");
        finalResult += "Deltas:\\\\";
        for(Pair p: res.deltas){
            // String s = p.str.split("= ")[1].replaceAll("{|}", "");
            String str = p.str + " = " + p.val;
            finalResult += str + "\\\\";
            System.out.println(str);
        }
        String str = "Overall\\ Transfer\\ Function: {" + res.transferFunction.str + "} = " + res.transferFunction.val;
        finalResult += str;
        System.out.println(str);
        return finalResult;
    }
} 
