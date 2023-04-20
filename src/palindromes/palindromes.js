const Stack = require("../lib/stack");

const isPalindrome = (sentence) => {
  // Remove punctuation and spaces
  sentence = sentence.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  
  const length = sentence.length;
  // Find middle of sentence (round down if sentence length is odd)
  const middle = Math.floor(length / 2);
  // Check if sentence length is even or odd
  const even = (length % 2 === 0) ? true : false;
  
  let stack = new Stack();

  let index = 0
  // Iterate up to middle character, adding each character to the stack
  while (index < middle) {
    stack.push(sentence.charAt(index));
    index++;
  }
  // Skip middle character, if sentence length is odd
  if (!even) index++;

  // Iterate to end of sentence, popping from the stack. If character does not match popped character,
  // sentence is not a palindrome, return false
  while (index < length) {
    const popped = stack.pop();
    if (popped !== sentence.charAt(index)) return false;
    index++;
  }
  // If end of stack is reached, sentence is a palindrome, return true
  return true;
};

module.exports = isPalindrome;
