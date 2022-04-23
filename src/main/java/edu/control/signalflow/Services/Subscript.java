package edu.control.signalflow.Services;


public class Subscript {
    static char[] map = {'\u2080', '\u2081', '\u2082', '\u2083', '\u2084', '\u2085', '\u2086', '\u2087', '\u2088', '\u2089'};
    static public String convert(int x){
        String str = "";
        int reversed = 0;
        while(x > 0){
            reversed *= 10;
            reversed += x % 10;
            x /= 10; 
        }
        while(reversed > 0){
            // System.out.println(map[reversed%10]);
            str += String.valueOf(map[reversed%10]);
            reversed /= 10;
        }
        return str;
    }
    
}
