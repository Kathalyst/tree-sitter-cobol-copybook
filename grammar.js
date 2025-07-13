module.exports = grammar({
  name: 'cobol_copybook',

  extras: $ => [
    /\s/,
    $.comment,
  ],

  rules: {
    copybook: $ => repeat($.data_description_entry),

    data_description_entry: $ => seq(
      $.level_number,
      $.data_name,
      optional($.redefines_clause),
      repeat(choice(
        $.picture_clause,
        $.usage_clause,
        $.value_clause,
        $.occurs_clause,
        $.sign_clause,
        $.sync_clause,
        $.justified_clause,
        $.blank_when_zero_clause,
        $.data_clause
      )),
      '.'
    ),

    level_number: $ => token(choice(
      /0[1-9]/,
      /[1-4][0-9]/,
      '66',
      '77',
      '88'
    )),

    data_name: $ => choice(
      $.identifier,
      'FILLER'
    ),

    identifier: $ => /[A-Za-z][A-Za-z0-9-]*/,

    redefines_clause: $ => seq(
      'REDEFINES',
      $.identifier
    ),

    picture_clause: $ => seq(
      choice('PIC', 'PICTURE'),
      optional('IS'),
      $.picture_string
    ),

    // Make picture_string match any non-whitespace, non-period characters after PIC
    picture_string: $ => /[^ \t\n\r.]+/,

    usage_clause: $ => seq(
      optional('USAGE'),
      optional('IS'),
      choice(
        'BINARY',
        'COMP',
        'COMP-1',
        'COMP-2',
        'COMP-3',
        'COMP-4',
        'COMP-5',
        'COMPUTATIONAL',
        'COMPUTATIONAL-1',
        'COMPUTATIONAL-2',
        'COMPUTATIONAL-3',
        'COMPUTATIONAL-4',
        'COMPUTATIONAL-5',
        'DISPLAY',
        'INDEX',
        'PACKED-DECIMAL',
        'POINTER',
        'PROCEDURE-POINTER',
        'FUNCTION-POINTER',
        'OBJECT-REFERENCE'
      )
    ),

    value_clause: $ => seq(
      choice('VALUE', 'VALUES'),
      optional('IS'),
      choice(
        $.literal,
        seq($.literal, 'THROUGH', $.literal),
        seq($.literal, 'THRU', $.literal),
        seq(
          $.literal,
          repeat(seq(',', $.literal))
        )
      )
    ),

    occurs_clause: $ => seq(
      'OCCURS',
      $.integer,
      optional(seq('TO', $.integer)),
      optional('TIMES'),
      optional(seq(
        'DEPENDING',
        optional('ON'),
        $.identifier
      )),
      optional($.key_clause),
      optional(repeat($.indexed_by_clause))
    ),

    key_clause: $ => seq(
      choice('ASCENDING', 'DESCENDING'),
      optional('KEY'),
      optional('IS'),
      $.identifier,
      repeat(seq(',', $.identifier))
    ),

    indexed_by_clause: $ => seq(
      'INDEXED',
      optional('BY'),
      $.identifier,
      repeat(seq(',', $.identifier))
    ),

    sign_clause: $ => seq(
      optional('SIGN'),
      optional('IS'),
      choice('LEADING', 'TRAILING'),
      optional('SEPARATE'),
      optional('CHARACTER')
    ),

    sync_clause: $ => choice(
      'SYNC',
      'SYNCHRONIZED',
      seq('SYNC', choice('LEFT', 'RIGHT')),
      seq('SYNCHRONIZED', choice('LEFT', 'RIGHT'))
    ),

    justified_clause: $ => seq(
      choice('JUST', 'JUSTIFIED'),
      optional('RIGHT')
    ),

    blank_when_zero_clause: $ => seq(
      'BLANK',
      optional('WHEN'),
      choice('ZERO', 'ZEROS', 'ZEROES')
    ),

    data_clause: $ => choice(
      'EXTERNAL',
      'GLOBAL',
      seq('BASED', optional('ON'), $.identifier)
    ),

    literal: $ => choice(
      $.numeric_literal,
      $.string_literal,
      $.hexadecimal_literal,
      $.boolean_literal,
      $.figurative_constant
    ),

    numeric_literal: $ => token(/[+-]?[0-9]+(\.[0-9]+)?/),

    string_literal: $ => choice(
      token(seq('"', /[^"]*/, '"')),
      token(seq("'", /[^']*/, "'"))
    ),

    hexadecimal_literal: $ => choice(
      token(seq(choice('X', 'H'), '"', /[0-9A-Fa-f]+/, '"')),
      token(seq(choice('X', 'H'), "'", /[0-9A-Fa-f]+/, "'"))
    ),

    boolean_literal: $ => choice(
      'TRUE',
      'FALSE'
    ),

    figurative_constant: $ => choice(
      'ZERO', 'ZEROS', 'ZEROES',
      'SPACE', 'SPACES',
      'HIGH-VALUE', 'HIGH-VALUES',
      'LOW-VALUE', 'LOW-VALUES',
      'QUOTE', 'QUOTES',
      'ALL',
      'NULL', 'NULLS'
    ),

    integer: $ => token(/[0-9]+/),

    comment: $ => token(/\*>.*/),
  }
});