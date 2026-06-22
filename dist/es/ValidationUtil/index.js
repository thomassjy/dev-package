export function required(value) {
  if (value == null || value.trim() === "") return "This field is required.";
  return true;
}
export function number(value) {
  if (value == null || isNaN(value)) return "Value must be a number.";
  return true;
}
//# sourceMappingURL=index.js.map