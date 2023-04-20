const Stack = require("../lib/stack");

const operators = ["+", "-", "*", "/"];
const operands = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

function precedence(character, stack) {
  if (
    (character === "*" || character === "/") &&
    (stack === "+" || stack === "-")
  ) {
    return true;
  }
  return false;
}

const postfix = (expression) => {
  // If empty expression, return empty string
  if (expression.length === 0) return "";

  // Declare new empty stack and empty result array
  const stack = new Stack();
  const result = [];

  // Loop through each character in expression
  for (let i = 0; i < expression.length; i++) {
    const char = expression.charAt(i);

    // If "(", add to stack
    if (char === "(") {
      stack.push("(");
    }
    // If ")", add everything from stack to result array until "(" is reached
    else if (char === ")") {
      while (stack.top.value !== "(") {
        const popped = stack.pop();
        result.push(popped);
      }
      // Remove "(" stack to finish up dealing with parentheses
      stack.pop();
    }
    // If one of +, -, *, /
    else if (operators.includes(char)) {
      // If stack is empty OR top is "(" OR current operator has higher precedence, push operator to stack
      if (
        !stack.top ||
        stack.top.value === "(" ||
        precedence(char, stack.top.value)
      ) {
        stack.push(char);
      }
      // Otherwise, while stack is not empty or open parentheses && popped operator has higher/equal precedence, add stack operator to result
      else {
        while (
          stack.top &&
          stack.top.value !== "(" &&
          !precedence(char, stack.top.value)
        ) {
          const popped = stack.pop();
          result.push(popped);
        }
        // Add current operator to stack
        stack.push(char);
      }
    }
    // If character is an operand, add to result array
    else if (operands.includes(char)) {
      result.push(char);
    }
  }

  // After exprssion has been exhausted, add any remaining operators from stack to result array
  while (stack.top) {
    const popped = stack.pop();
    result.push(popped);
  }

  // Return rsult as string separated by spaces
  const resultStr = result.join(" ");
  return resultStr;
};

module.exports = postfix;
