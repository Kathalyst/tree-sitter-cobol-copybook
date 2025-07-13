; queries/highlights.scm

; Comments
(comment) @comment

; Level numbers
(level_number) @constant.numeric

; Keywords
"PIC" @keyword
"PICTURE" @keyword
"REDEFINES" @keyword
"OCCURS" @keyword
"TIMES" @keyword
"DEPENDING" @keyword
"ON" @keyword
"INDEXED" @keyword
"BY" @keyword
"ASCENDING" @keyword
"DESCENDING" @keyword
"KEY" @keyword
"VALUE" @keyword
"VALUES" @keyword
"THROUGH" @keyword
"THRU" @keyword
"USAGE" @keyword
"IS" @keyword
"SIGN" @keyword
"LEADING" @keyword
"TRAILING" @keyword
"SEPARATE" @keyword
"CHARACTER" @keyword
"SYNC" @keyword
"SYNCHRONIZED" @keyword
"LEFT" @keyword
"RIGHT" @keyword
"JUST" @keyword
"JUSTIFIED" @keyword
"BLANK" @keyword
"WHEN" @keyword
"EXTERNAL" @keyword
"GLOBAL" @keyword
"BASED" @keyword

; Special identifiers
"FILLER" @constant.builtin

; Usage types
[
  "BINARY"
  "COMP"
  "COMP-1"
  "COMP-2"
  "COMP-3"
  "COMP-4"
  "COMP-5"
  "COMPUTATIONAL"
  "COMPUTATIONAL-1"
  "COMPUTATIONAL-2"
  "COMPUTATIONAL-3"
  "COMPUTATIONAL-4"
  "COMPUTATIONAL-5"
  "DISPLAY"
  "INDEX"
  "PACKED-DECIMAL"
  "POINTER"
  "PROCEDURE-POINTER"
  "FUNCTION-POINTER"
  "OBJECT-REFERENCE"
] @type.builtin

; Figurative constants
[
  "ZERO"
  "ZEROS"
  "ZEROES"
  "SPACE"
  "SPACES"
  "HIGH-VALUE"
  "HIGH-VALUES"
  "LOW-VALUE"
  "LOW-VALUES"
  "QUOTE"
  "QUOTES"
  "NULL"
  "NULLS"
  "ALL"
  "TRUE"
  "FALSE"
] @constant.builtin

; Identifiers
(identifier) @variable

; Picture strings
(picture_string) @string.special

; Literals
(string_literal) @string
(numeric_literal) @constant.numeric
(hexadecimal_literal) @constant.numeric
(integer) @constant.numeric

; Punctuation
"." @punctuation.delimiter
"," @punctuation.delimiter