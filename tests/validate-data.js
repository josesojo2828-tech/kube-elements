#!/usr/bin/env node
"use strict";

// Valida la integridad de data/elements.js sin navegador ni dependencias.
// Uso: node tests/validate-data.js

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const dataFile = path.join(__dirname, "..", "data", "elements.js");
const requiredFields = ["number", "symbol", "name", "group", "row", "col", "desc"];
const minElements = 120;

let failures = 0;

function check(name, condition, detail = "") {
  if (condition) {
    console.log(`  ok    ${name}`);
    return;
  }
  failures++;
  console.error(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
}

const source = fs.readFileSync(dataFile, "utf8");
const elements = vm.runInNewContext(`${source}\n;KUBE_ELEMENTS`, {});

check("data/elements.js exporta un array", Array.isArray(elements));
check(
  `hay al menos ${minElements} elementos`,
  Array.isArray(elements) && elements.length >= minElements,
  `encontrados: ${Array.isArray(elements) ? elements.length : "n/a"}`
);

if (Array.isArray(elements)) {
  const numbers = new Set();
  const coordinates = new Set();
  const duplicateNumbers = [];
  const duplicateCoordinates = [];
  const missingFields = [];

  for (const element of elements) {
    for (const field of requiredFields) {
      if (element[field] === undefined || element[field] === null || element[field] === "") {
        missingFields.push(`${element.symbol || "?"}.${field}`);
      }
    }

    if (numbers.has(element.number)) duplicateNumbers.push(element.number);
    numbers.add(element.number);

    const key = `${element.row},${element.col}`;
    if (coordinates.has(key)) duplicateCoordinates.push(key);
    coordinates.add(key);
  }

  check("números atómicos únicos", duplicateNumbers.length === 0, duplicateNumbers.join(", "));
  check("coordenadas únicas", duplicateCoordinates.length === 0, duplicateCoordinates.join(", "));
  check("campos requeridos completos", missingFields.length === 0, missingFields.slice(0, 5).join(", "));
}

if (failures > 0) {
  console.error(`\n${failures} verificación(es) fallaron`);
  process.exit(1);
}

console.log(`\n${elements.length} elementos validados correctamente`);
