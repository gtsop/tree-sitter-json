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
    source_file: ($) => $._value,

    _value: ($) =>
      choice($.object, $.array, $.number, $.string, $.false, $.null, $.true),

    object: ($) =>
      seq(
        $._begin_object,
        optional(seq($.member, repeat(seq($._value_separator, $.member)))),
        $._end_object,
      ),

    array: ($) =>
      seq(
        $._begin_array,
        optional(seq($._value, repeat(seq($._value_separator, $._value)))),
        $._end_array,
      ),

    null: () => token("null"),
    false: () => token("false"),
    true: () => token("true"),
    string: ($) => $._literal_string,
    number: () =>
      token(
        seq(
          optional("-"),
          choice("0", /[1-9][0-9]*/),
          optional(seq(".", /[0-9]+/)),
          optional(seq(/[eE]/, optional(choice("-", "+")), /[0-9]+/)),
        ),
      ),

    /* */
    member: ($) => seq($.member_name, $._name_separator, $.member_value),
    member_name: ($) => $._literal_string,
    member_value: ($) => $._value,

    _begin_array: () => token("["),
    _begin_object: () => token("{"),
    _end_array: () => token("]"),
    _end_object: () => token("}"),
    _name_separator: () => token(":"),
    _value_separator: () => token(","),

    _literal_string: () =>
      token(
        seq(
          '"',
          repeat(
            choice(/[^"\\\x00-\x1F]/, /\\["\\/bfnrt]/, /\\u[0-9a-fA-F]{4}/),
          ),
          '"',
        ),
      ),
  },
});
