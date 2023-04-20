const Stack = require("../lib/stack");

const match = (expression) => {
  // Declare new empty stack
  const stack = new Stack();

  // Loop through each character in expression
  for (let i = 0; i < expression.length; i++) {
    // When an open parentheses is encountered, add one to the stack
    if (expression.charAt(i) === "(") {
      stack.push("(");
    }
    // When a close parentheses is encountered...
    else if (expression.charAt(i) === ")") {
      // If there is nothing in the stack, expression is not valid, return false
      if (!stack.top) return false;
      // Otherwise remove an open parentheses from the stack
      else stack.pop();
    }
    // Do nothing for non-parentheses characters
  }

  // If end of expression is reached and there are still open parentheses in the stack,
  // expression is invalid, return false
  if (stack.top) return false;

  // Otherwise, expression is valid, return true
  return true;
};

module.exports = match;
