/**
 * @file Json grammar for tree-sitter
 * @author George Tsopanoglou
 * @license AGPLv3
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "json",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
