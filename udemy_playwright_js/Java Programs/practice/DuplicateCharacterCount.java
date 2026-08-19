import java.util.HashMap;
import java.util.Set;

public class DuplicateCharacterCount{

public static void main(String[] args){

duplicateCharacterCount("Automation");

}

static void duplicateCharacterCount(String inputString){

    HashMap<Character,Integer> charCountHashMap = new HashMap<>();

    char[] charArray = inputString.toCharArray();

    for(char c : charArray){

        if(charCountHashMap.containsKey(c)){

            charCountHashMap.put(c, charCountHashMap.get(c)+1);
        }else{

            charCountHashMap.put(c,1);
        }
    }

    Set<Character> charCountHashMapKeys = charCountHashMap.keySet();

System.out.println("Duplicate characters:");

    for(char ch : charCountHashMapKeys){

            if(charCountHashMap.get(ch)>1){

                System.out.println(ch + " " + charCountHashMap.get(ch));
            }

    }


}

}