package edu.control.signalflow.Utils;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map.Entry;

import edu.control.signalflow.Model.Path;

public class Result{

    // List<Pair> pathStr, loopStr, deltaStr;
    public List<Pair> paths;
    public List<Pair> loops;
    public List<Pair> deltas;
    public HashMap<Integer, String> nonTouchingLoops;
    public Pair transferFunction;


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

    public String generateResult(){
        String finalResult = "";
        System.out.println("Paths:");
        finalResult += "Forward\\ Paths:\\\\";
        for(Pair p: this.paths){
            String str = p.str + " = " + p.val;
            finalResult += str + "\\\\";
            System.out.println(str);
        }
        if(this.loops.size() > 0){
            System.out.println("Loops:");
            finalResult += "Loops:\\\\";
            for(Pair p: this.loops){
                String str = p.str + " = " + p.val;
                finalResult += str + "\\\\";
                System.out.println(str);
            }
            if(this.nonTouchingLoops.size() > 0){
                System.out.println("Non Touching Loops:");
                finalResult += "Non\\ Touching\\ Loops:\\\\";
                for(Entry<Integer, String> e: this.nonTouchingLoops.entrySet()){
                    String str = e.getValue();
                    finalResult += str + "\\\\";
                    System.out.println(str);
                }
            }
        }

        System.out.println("deltas:");
        finalResult += "Deltas:\\\\";
        for(Pair p: this.deltas){
            // String s = p.str.split("= ")[1].replaceAll("{|}", "");
            String str = p.str + " = " + p.val;
            finalResult += str + "\\\\";
            System.out.println(str);
        }
        String str = "Overall\\ Transfer\\ Function: {" + this.transferFunction.str + "} = " + this.transferFunction.val;
        finalResult += str;
        System.out.println(str);
        return finalResult;
    }
}
