"use strict";

const { default: babelConfig } = require("@pandazy/mole-config/dist/babel.config.js");
babelConfig.ignore = ["**/*.d.ts", "**/*.spec.ts", "**/*.spec.tsx", "**/*.test.ts", "**/*.test.tsx"];
module.exports = babelConfig;
