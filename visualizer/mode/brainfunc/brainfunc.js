// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/LICENSE

// Brainfuck mode created by Michael Kaminsky https://github.com/mkaminsky11

(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    mod(require("../../lib/codemirror"))
  else if (typeof define == "function" && define.amd)
    define(["../../lib/codemirror"], mod)
  else
    mod(CodeMirror)
})(function(CodeMirror) {
  "use strict"
  CodeMirror.defineMode("brainfunc", function() {
    return {
      startState: function() {
        return {
          commentLine: false,
          inFunction: false,
          commentLoop: false
        }
      },
      token: function(stream, state) {
        if (stream.eatSpace()) return null
        if(stream.sol()){
          state.commentLine = false;
        }
        var ch = stream.next().toString();
        if (state.commentLine){
          state.commentLine = true;
          if(stream.eol()){
            state.commentLine = false;
          }
          return "comment";
        }
        else if(state.inFunction){
          if(ch === "(" || ch === ")" || ch === "}"){
            if (ch === "}") {
              state.inFunction = false;
            }
            return "bracket";
          }
          else if(ch === "+" || ch === "-" || ch === "<" || ch === ">"){
            return "keyword";
          }
          else if(ch === "." || ch === ","){
            return "constant";
          }
          else if(ch === "_" || 
            ("0" <= ch && ch <= "9") ||
            ("A" <= ch && ch <= "Z") ||
            ("a" <= ch && ch <= "z")){
            return "entity";
          }
          else if(ch === "#"){
            state.commentLine = true;
            if(stream.eol()){
              state.commentLine = false;
            }
            return "comment";
          }
          else{
            return "default"
          }
        }
        else{
          if(ch === "{"){
            state.inFunction = true;
            return "bracket";
          }
          else if(ch === "_" || 
            ("0" <= ch && ch <= "9") ||
            ("A" <= ch && ch <= "Z") ||
            ("a" <= ch && ch <= "z")){
            return "entity";
          }
          else if(ch === "#"){
            state.commentLine = true;
            if(stream.eol()){
              state.commentLine = false;
            }
            return "comment";
          }
          else{
            return "default"
          }
        }
      }
    };
  });
CodeMirror.defineMIME("text/x-brainfunc","brainfunc")
});
