function reverseEachWord(str) {
      // Step 1: Split sentence into array of words
      const words = str.split(' ');
      // words = ["My", "name", "is", "John"]

      // Step 2: Create empty array to store reversed words
      const reversedWords = [];

      // Step 3: Loop through each word
      for (let i = 0; i < words.length; i++) {
          const word = words[i];

          // Step 4: Split word into characters
          const characters = word.split('');
          // "My" → ['M', 'y']

          // Step 5: Reverse the characters array
          const reversedChars = characters.reverse();
          // ['M', 'y'] → ['y', 'M']

          // Step 6: Join characters back into a string
          const reversedWord = reversedChars.join('');
          // ['y', 'M'] → "yM"

          // Step 7: Add reversed word to results array
          reversedWords.push(reversedWord);
      }

      // Step 8: Join all reversed words with space
      const result = reversedWords.join(' ');
      // ["yM", "eman", "si", "nhoJ"] → "yM eman si nhoJ"

      return result;
  }

  console.log(reverseEachWord("My name is John"));