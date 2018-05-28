'use strict'

var fs = require('fs');
var allInputLines = fs.readFileSync('./input.txt').toString().split('\n');
var inputLength = allInputLines.length;
var allWires = {};

const convertStringNumberToNumber = function(string) {
  let parsed = parseInt(string)
  if (isNaN(parsed) && typeof string === 'string') {
    return string;
  }
  if (typeof parsed === 'number') {
    return parsed;
  }
}

const processLine = function(line) {
  let wireIds = line.match(/[a-z]+/g);
  let reversedWireIds = wireIds.reverse();
  let outputWireId = reversedWireIds.shift();
  let wireSetup = {};
  wireSetup.id = outputWireId;
  wireSetup.verb = line.match(/[A-Z]+/);
  wireSetup.args = line.split(' -> ')[0].match(/[a-z]+|\d+/g);
  wireSetup.args = wireSetup.args.map((arg) => {
    return convertStringNumberToNumber(arg);
  })
  allWires[outputWireId] = wireSetup;
}

for (let i = 0; i < inputLength; i++) {
  processLine(allInputLines[i]);
}

const wireValueIsUndefined = function(id) {
  return allWires[id] && (typeof allWires[id].value === 'undefined');
}

const unsolvedIdsForWire = function(wire) {
  let unsolvedIds = wire.args.filter((arg) => {
    return !(typeof arg === 'number')
  }).filter((id) => {
    return wireValueIsUndefined(id);
  });
  return unsolvedIds;
}

const wireArgsHaveValues = function(wire) {
  return unsolvedIdsForWire(wire).length === 0;
}

const calculateWireValueFromArgs = function(wire) {
  let argValuesForWire = wire.args.map((arg) => {
    if (typeof arg === 'number') {
      return arg;
    } else if (allWires[arg].value) {
      return allWires[arg].value;
    }
  });
  if (!wire.verb) { return argValuesForWire[0] };
  return bitWiseCalculation(wire.verb[0], argValuesForWire);
}

const bitWiseCalculation = function(verb, values) {
  switch(verb) {
    case 'AND':
      return values[0] & values[1];
    case 'OR':
      return values[0] | values[1];
    case 'NOT':
      return ~ values[0];
    case 'LSHIFT':
      return values[0] << values[1];
    case 'RSHIFT':
      return values[0] >> values[1];
    default:
      console.log('UNEXPECTED CALCULATION');
  }
}

const evaluate = function(id) {
  let wire = allWires[id];
  console.log('Evaluating wire', id);
  if (wire.value) { return value }
  if (wireArgsHaveValues(wire)) {
    let val = calculateWireValueFromArgs(wire);
    allWires[id].value = val;
    console.log('set value', val, 'for', id);
    return val;
  }

  let unsolvedIds = unsolvedIdsForWire(wire);
  console.log('unsolved ids', unsolvedIds.length, 'from args', wire.args)

  if (unsolvedIds.length > 0) {
    evaluate(unsolvedIds[0]);
    return evaluate(id);
  }
  return evaluate(id);
}

let x = evaluate('a');
console.log('value', x);