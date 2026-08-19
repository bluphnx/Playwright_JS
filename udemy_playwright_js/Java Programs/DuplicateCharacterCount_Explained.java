import java.util.HashMap;
import java.util.Set;

public class DuplicateCharacterCount {

    public static void main(String[] args) {
        duplicateCharacterCount("Learn Java Programming");
    }

    static void duplicateCharacterCount(String inputString) {

        // STEP 1: Create a HashMap to store character → count
        // HashMap stores key-value pairs: Character → Integer
        // Example: {'a' → 4, 'r' → 3, 'g' → 2}
        HashMap<Character, Integer> charCountMap = new HashMap<>();

        // STEP 2: Convert the string into a character array
        // "Learn" → ['L', 'e', 'a', 'r', 'n']
        // This lets us loop through each character one by one
        char[] strArray = inputString.toCharArray();

        // STEP 3: Loop through each character and count occurrences
        for (char c : strArray) {

            // STEP 3a: Check if this character already exists in the map
            if (charCountMap.containsKey(c)) {
                // YES — character seen before → increment its count by 1
                // charCountMap.get(c) retrieves current count
                // +1 increments it
                // put() updates the value for that key
                charCountMap.put(c, charCountMap.get(c) + 1);
            } else {
                // NO — first time seeing this character → add with count 1
                charCountMap.put(c, 1);
            }
        }
        // After loop, charCountMap contains:
        // {L=1, e=1, a=4, r=3, n=2, ' '=2, J=1, v=1, P=1, o=1, g=2, m=2, i=1}

        // STEP 4: Get all the keys (unique characters) from the map
        Set<Character> charsInString = charCountMap.keySet();
        // charsInString = {L, e, a, r, n, ' ', J, v, P, o, g, m, i}

        System.out.println("Duplicate Characters in : " + inputString);

        // STEP 5: Loop through each unique character
        // Print only those with count > 1 (duplicates)
        for (Character ch : charsInString) {
            if (charCountMap.get(ch) > 1) {
                System.out.println(ch + " : " + charCountMap.get(ch));
            }
        }
    }
}

/*
================================================================
HOW THIS PROGRAM WORKS — STEP BY STEP
================================================================

INPUT: "Learn Java Programming"

STEP 1: Create empty HashMap
  charCountMap = {}

STEP 2: Convert string to char array
  strArray = ['L','e','a','r','n',' ','J','a','v','a',' ','P','r','o','g','r','a','m','m','i','n','g']

STEP 3: Loop through each character and count

  c='L' → not in map → put('L', 1)     → {L=1}
  c='e' → not in map → put('e', 1)     → {L=1, e=1}
  c='a' → not in map → put('a', 1)     → {L=1, e=1, a=1}
  c='r' → not in map → put('r', 1)     → {L=1, e=1, a=1, r=1}
  c='n' → not in map → put('n', 1)     → {..., n=1}
  c=' ' → not in map → put(' ', 1)     → {..., ' '=1}
  c='J' → not in map → put('J', 1)     → {..., J=1}
  c='a' → IN MAP!    → get('a')=1, put('a', 2) → {a=2}
  c='v' → not in map → put('v', 1)     → {..., v=1}
  c='a' → IN MAP!    → get('a')=2, put('a', 3) → {a=3}
  c=' ' → IN MAP!    → get(' ')=1, put(' ', 2) → {' '=2}
  c='P' → not in map → put('P', 1)
  c='r' → IN MAP!    → get('r')=1, put('r', 2) → {r=2}
  c='o' → not in map → put('o', 1)
  c='g' → not in map → put('g', 1)
  c='r' → IN MAP!    → get('r')=2, put('r', 3) → {r=3}
  c='a' → IN MAP!    → get('a')=3, put('a', 4) → {a=4}
  c='m' → not in map → put('m', 1)
  c='m' → IN MAP!    → get('m')=1, put('m', 2) → {m=2}
  c='i' → not in map → put('i', 1)
  c='n' → IN MAP!    → get('n')=1, put('n', 2) → {n=2}
  c='g' → IN MAP!    → get('g')=1, put('g', 2) → {g=2}

FINAL MAP: {L=1, e=1, a=4, r=3, n=2, ' '=2, J=1, v=1, P=1, o=1, g=2, m=2, i=1}

STEP 5: Print only entries where count > 1

  a : 4
  r : 3
  n : 2
  ' ' : 2 (space character)
  g : 2
  m : 2

OUTPUT:
  Duplicate Characters in : Learn Java Programming
  a : 4
  r : 3
  n : 2
    : 2
  g : 2
  m : 2


================================================================
KEY CONCEPTS USED
================================================================

1. HashMap<Character, Integer>
   → Stores key-value pairs.
   → Key = character, Value = how many times it appears.
   → .put(key, value) adds/updates a pair.
   → .get(key) retrieves the value for a key.
   → .containsKey(key) checks if key exists (true/false).

2. String.toCharArray()
   → Converts "hello" to ['h','e','l','l','o'].
   → Lets us loop through individual characters.

3. for (char c : strArray)
   → Enhanced for loop (for-each loop).
   → Iterates through each element in the array.
   → 'c' holds the current character in each iteration.

4. Set<Character> keySet()
   → Returns all unique keys from the HashMap.
   → We loop through this to check which characters are duplicates.

5. charCountMap.get(ch) > 1
   → If count is greater than 1, it appeared more than once = duplicate.


================================================================
JAVASCRIPT EQUIVALENT
================================================================

function duplicateCharacterCount(str) {
    const charCount = {};

    for (const c of str) {
        charCount[c] = (charCount[c] || 0) + 1;
    }

    console.log("Duplicate Characters in: " + str);
    for (const ch in charCount) {
        if (charCount[ch] > 1) {
            console.log(ch + " : " + charCount[ch]);
        }
    }
}

duplicateCharacterCount("Learn Java Programming");


================================================================
INTERVIEW TIP
================================================================

"This program uses HashMap for O(1) lookup and insertion.
Time complexity is O(n) — one pass through the string.
Space complexity is O(k) where k is unique characters.

Alternative approach: Sort the string first, then count
adjacent duplicates. But HashMap is simpler and faster."

*/
