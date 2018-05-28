'use strict'

var fs = require('fs');
var allInputLines = fs.readFileSync('./input.txt').toString().split('\n');
var allLinesLength = allInputLines.length;
var solution = 0;

const substituteEscapedCharacters = function(lineOfInput) {
  const A_SINGLE_CHAR = 'o'
  let specialCharRegex = /\\\\|\\\"|\\x[a-fA-F\d]{2}/g;
  let newLine = lineOfInput.replace(specialCharRegex, A_SINGLE_CHAR);
  return newLine;
}

for (let i = 0; i < allLinesLength; i++) {
  let line = allInputLines[i];
  let newLine = substituteEscapedCharacters(line);
  let difference = line.length - (newLine.length - 2);
  solution = solution + difference;
}

console.log(solution);