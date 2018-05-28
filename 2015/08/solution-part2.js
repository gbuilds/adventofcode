'use strict'

var fs = require('fs');
var allInputLines = fs.readFileSync('./input.txt').toString().split('\n');
var allLinesLength = allInputLines.length;
var solution = 0;

const expandSpecialCharacters = function(lineOfInput) {
  const TWO_CHARS = 'oo';
  let specialCharRegex = /\\|\"/g;
  let newLine = lineOfInput.replace(specialCharRegex, TWO_CHARS);
  return newLine;
}

for (let i = 0; i < allLinesLength; i++) {
  let line = allInputLines[i];
  let newLine = expandSpecialCharacters(line);
  let difference = (newLine.length + 2) - line.length;
  solution = solution + difference;
}

console.log(solution);