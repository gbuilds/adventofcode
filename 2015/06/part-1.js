var fs = require('fs');

class Light {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.on = false;
  }

  turnOn() {
    this.on = true;
  }

  turnOff() {
    this.on = false;
  }

  toggle() {
    if (this.on === true) {
      this.on = false;
    } else {
      this.on = true;
    }
  }

  isOn() {
    if (this.on === true) {
      return true;
    }
    return false;
  }
}

class Grid {
  constructor() {
    const SIZE = 1000;
    this.lights = [];

    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        let light = new Light(x, y);
        this.lights.push(light);
      }
    }
  }

  getLights(coordsArray) {
    let x1 = coordsArray[0];
    let x2 = coordsArray[2];
    let y1 = coordsArray[1];
    let y2 = coordsArray[3];
    let lights = this.lights.filter((l) => {
      let x = (l.x >= x1) && (l.x <= x2);
      let y = (l.y >= y1) && (l.y <= y2);
      return x && y;
    });
    return lights;
  }

  turnOn(coordsArray) {
    console.log('on', coordsArray);
    this.getLights(coordsArray).forEach((l) => {
      l.turnOn();
    });
  }

  turnOff(coordsArray) {
    console.log('off', coordsArray);
    this.getLights(coordsArray).forEach((l) => {
      l.turnOff();
    });
  }

  toggle(coordsArray) {
    console.log('toggle', coordsArray);
    this.getLights(coordsArray).forEach((l) => {
      l.toggle();
    });
  }
}

class LightSystem {
  constructor(path) {
    this.path = path;
    this.grid = new Grid();
    this.instructions = fs.readFileSync(this.path).toString().split('\n');
  }

  run() {
    let instructionsLength = this.instructions.length;
    for(let i = 0; i < instructionsLength; i++) {
      this.doLine(this.instructions[i]);
    }
  }

  doLine(line) {
    const matchDigits = /(\d+)/g;
    let coordinates = line.match(matchDigits);
    coordinates = coordinates.map((s) => { return parseInt(s) });
    if (line.indexOf('toggle') === 0) {
      this.grid.toggle(coordinates);
    } else if (line.indexOf('turn on') === 0) {
      this.grid.turnOn(coordinates);
    } else if (line.indexOf('turn off') === 0) {
      this.grid.turnOff(coordinates);
    }
  }

  countLightsOn() {
    let lights = this.grid.lights.filter((l) => {
      return l.isOn();
    });
    return lights.length;
  }
}

system = new LightSystem('input.txt');
system.run();
console.log(system.countLightsOn());
