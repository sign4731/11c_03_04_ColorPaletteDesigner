"use strict";

window.addEventListener("DOMContentLoaded", getValue);

function getValue() {
  console.log("getValue");

  colorSelector.addEventListener("input", colorTheBox);
}

function colorTheBox(event) {
  document.querySelector(".colorBox").style.backgroundColor = event.target.value;

  let hexValue = event.target.value;
  console.log(hexValue);

  showHEX(hexValue);
  hexToRGB(hexValue);
}

function showHEX(hexValue) {
  Number.parseInt(hexValue);
  document.querySelector(".hex").textContent = `HEX: ${hexValue}`;
}

function hexToRGB(hexValue) {
  const r = Number.parseInt(hexValue.substring(1, 3), 16);
  const g = Number.parseInt(hexValue.substring(3, 5), 16);
  const b = Number.parseInt(hexValue.substring(5, 7), 16);

  console.log(r);
  console.log(g);
  console.log(b);
  showRGB(r, g, b);
}

function showRGB(r, g, b) {
  document.querySelector(".rgb").textContent = `RGB: ${r}, ${g}, ${b}`;
  rgbToHSL(r, g, b);
}

function rgbToHSL(r, g, b) {
  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
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
  showHSL(h, s, l);
}

function showHSL(h, s, l) {
  document.querySelector(".hsl").textContent = `HSL: ${h.toFixed(0)}, ${s.toFixed(0)}%, ${l.toFixed(0)}%`;
}
