"use strict";

window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("init");

  colorPicker.addEventListener("input", getInput);
}

function getInput(event) {
  const hexValue = event.target.value;

  selectedColor(hexValue);
}

function selectedColor(hexValue) {
  console.log(hexValue);

  const rgb = hexToRGB(hexValue);
  const hsl = rgbToHSL(rgb);

  getHarmony(hsl, rgb);
}

function getHarmony(hsl, rgb) {
  let harmony = document.querySelector('input[name="harmony"]:checked').value;
  console.log(harmony);

  if (harmony == "analogous") {
    console.log("harmony is analogous");
    console.log(hsl);
    const hslColors = calcAnalogousColors(hsl);
    console.log(hslColors);
    const anolgousRgbColors = hslToRgb(hslColors, rgb);
    showColoredBoxes(anolgousRgbColors, rgb);

    // showHSL(hslColors);
    // console.log(anolgousRgbColors);
  } else if (harmony == "monochromatic") {
    console.log("harmony is monochromatic");
    const monoHslColors = calcMonocromaticColors(hsl);
    const monochromatigRgbColors = hslToRgb(monoHslColors, rgb);
    showColoredBoxes(monoHslColors, rgb);
  } else if (harmony == "triad") {
    console.log("harmony is triad");
    const triadHslColors = calcTriadColors(hsl);
    const triadRgbColors = hslToRgb(triadHslColors, rgb);
    showColoredBoxes(triadHslColors, rgb);
    // console.log(triadColorArr);
  } else if (harmony == "complementary") {
    const complementaryHslColors = calcComplementaryColors(hsl);
    const complementaryRgbColors = hslToRgb(complementaryHslColors, rgb);
    showColoredBoxes(complementaryHslColors, hsl);
  } else if (harmony == "compound") {
    const compoundHslColors = calcCompoundColors(hsl);
    const compoundRgbColors = hslToRgb(compoundHslColors, rgb);
    showColoredBoxes(compoundHslColors, rgb);
  } else if (harmony == "shades") {
    const shadesHslColors = calcShadesColors(hsl);
    const shadesRgbColors = hslToRgb(shadesHslColors, rgb);
    showColoredBoxes(shadesHslColors, rgb);
  }
}

function calcShadesColors(hsl) {
  const shadesColorArr = [];
  for (let counter = 1; counter <= 4; counter++) {
    const newL = Number.parseInt(hsl.l) + 20 * counter;
    const NewHsl = {
      h: hsl.h,
      s: hsl.s,
      l: newL.toString(),
    };
    shadesColorArr.unshift(NewHsl);
  }
  console.log(shadesColorArr);
  return shadesColorArr;
}

function calcCompoundColors(hsl) {
  const compoundColorArr = [];
  for (let counter = 1; counter <= 2; counter++) {
    const newH = Number.parseInt(hsl.h) + 30 * counter;
    const NewHsl = {
      h: newH.toString(),
      s: hsl.s,
      l: hsl.l,
    };
    compoundColorArr.unshift(NewHsl);
  }
  const newH = Number.parseInt(hsl.h) + 180;
  const NewHslH180 = {
    h: newH.toString(),
    s: hsl.s,
    l: hsl.l,
  };
  compoundColorArr.push(NewHslH180);
  const newL = Number.parseInt(hsl.l) + 40;
  const NewHslH180L40 = {
    h: newH.toString(),
    s: hsl.s,
    l: newL.toString(),
  };
  compoundColorArr.push(NewHslH180L40);
  console.log(compoundColorArr);
  return compoundColorArr;
}

function calcComplementaryColors(hsl) {
  const complementaryColorArr = [];
  for (let counter = 1; counter <= 2; counter++) {
    const newL = Number.parseInt(hsl.l) + 30 * counter;
    const NewHsl = {
      h: hsl.h,
      s: hsl.s,
      l: newL.toString(),
    };
    complementaryColorArr.push(NewHsl);
  }
  const newH = Number.parseInt(hsl.h) + 180;
  const NewHslH180 = {
    h: newH.toString(),
    s: hsl.s,
    l: hsl.l,
  };
  complementaryColorArr.push(NewHslH180);
  const newL = Number.parseInt(hsl.l) + 40;
  const NewHslH180L40 = {
    h: newH.toString(),
    s: hsl.s,
    l: newL.toString(),
  };
  complementaryColorArr.push(NewHslH180L40);
  console.log(complementaryColorArr);
  return complementaryColorArr;
}

function calcTriadColors(hsl) {
  const triadColorArr = [];
  for (let counter = 1; counter <= 2; counter++) {
    const newH60 = Number.parseInt(hsl.h) + 60 * counter;
    const NewHsl = {
      h: newH60.toString(),
      s: hsl.s,
      l: hsl.l,
    };
    console.log(NewHsl);
    triadColorArr.push(NewHsl);
  }
  for (let counter = 1; counter <= 2; counter++) {
    const newH120 = Number.parseInt(hsl.h) + 120 * counter;
    const newL120 = Number.parseInt(hsl.l) + 30 * counter;
    const NewHsl = {
      h: newH120.toString(),
      s: hsl.s,
      l: newL120.toString(),
    };
    console.log(NewHsl);
    triadColorArr.push(NewHsl);
  }

  console.log(triadColorArr);
  return triadColorArr;
}

function calcMonocromaticColors(hsl) {
  const monochromaticColorArr = [];
  for (let counter = 1; counter <= 4; counter++) {
    const newl = Number.parseInt(hsl.l) + 30 * counter;
    const NewHsl = {
      h: hsl.h,
      s: hsl.s,
      l: newl.toString(),
    };
    //   console.log(newHSL);
    monochromaticColorArr.unshift(NewHsl);
  }
  console.log(monochromaticColorArr);
  return monochromaticColorArr;
}

function calcAnalogousColors(hsl) {
  const colorArr = [];
  for (let counter = 1; counter <= 4; counter++) {
    const newH = Number.parseInt(hsl.h) + 30 * counter;
    const NewHsl = {
      h: newH.toString(),
      s: hsl.s,
      l: hsl.l,
    };
    //   console.log(newHSL);
    colorArr.unshift(NewHsl);
  }
  console.log(colorArr);
  return colorArr;
}

function hexToRGB(hexValue) {
  const rgb = { r: "", g: "", b: "" };
  rgb.r = Number.parseInt(hexValue.substring(1, 3), 16);
  rgb.g = Number.parseInt(hexValue.substring(3, 5), 16);
  rgb.b = Number.parseInt(hexValue.substring(5, 7), 16);

  //   console.log(rgb.r);
  //   console.log(rgb.g);
  //   console.log(rgb.b);
  console.log(`rgb: ${rgb.r}, ${rgb.g}, ${rgb.b}`);
  return rgb;
}

function rgbToHSL(rgb) {
  rgb.r /= 255;
  rgb.g /= 255;
  rgb.b /= 255;
  let h, s, l;

  const min = Math.min(rgb.r, rgb.g, rgb.b);
  const max = Math.max(rgb.r, rgb.g, rgb.b);

  if (max === min) {
    h = 0;
  } else if (max === rgb.r) {
    h = 60 * (0 + (rgb.g - rgb.b) / (max - min));
  } else if (max === rgb.g) {
    h = 60 * (2 + (rgb.b - rgb.r) / (max - min));
  } else if (max === rgb.b) {
    h = 60 * (4 + (rgb.r - rgb.g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  //   console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  // just for testing
  //   const hslBase = `HSL: ${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%`;
  //   console.log(`HSL: ${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%`);
  //   return hslBase;
  h = h.toFixed(0);
  s = s.toFixed(0);
  l = l.toFixed(0);

  const hsl = { h, s, l };
  return hsl;
}

function hslToRgb(hslColors, rgb) {
  let rgbArry = [];
  console.log(hslColors);
  hslColors.forEach((HSLcolor) => {
    let h = HSLcolor.h;
    let s = HSLcolor.s / 100;
    let l = HSLcolor.l / 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;
    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    rgbArry.push({ r, g, b });
  });
  //   console.log(rgbArry);
  return rgbArry;
}

function showHEX(hexValue) {
  Number.parseInt(hexValue);
  document.querySelector(".hex").textContent = `HEX: ${hexValue}`;
}

function showRGB(rgb) {
  document.querySelector(".rgb").textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

function showHSL(hsl) {
  document.querySelector(".hsl").textContent = hsl;
}

function showColoredBoxes(anolgousRgbColors, rgb) {
  let colorIndex = 1;
  anolgousRgbColors.splice(2, 0, rgb);
  console.log(rgb);
  anolgousRgbColors.forEach((color) => {
    document.querySelector(`#color${colorIndex} .colorbox`).style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    colorIndex++;
  });
}
