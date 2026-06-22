"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.number = number;
exports.required = required;
function required(value) {
  if (value == null || value.trim() === "") return "This field is required.";
  return true;
}
function number(value) {
  if (value == null || isNaN(value)) return "Value must be a number.";
  return true;
}
//# sourceMappingURL=index.js.map