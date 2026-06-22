"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertToBool = convertToBool;
exports.convertToStringOfBool = convertToStringOfBool;
exports.download = download;
exports.getNumberDataTypes = getNumberDataTypes;
exports.getRealValueByType = getRealValueByType;
exports.isLeftConditionValid = isLeftConditionValid;
exports.isValueValid = isValueValid;
exports.toTitleCase = toTitleCase;
exports.validateInput = validateInput;
var numberDataTypes = ["Integer", "Decimal", "BigDecimal", "Float", "Number", "IntegerValue", "DecimalValue", "FloatValue"];
function getRealValueByType(type, value) {
  if (type === "Boolean") {
    if (value.toString().toLowerCase() === "true") {
      return true;
    }
    return false;
  } else if (numberDataTypes.indexOf(type) !== -1) {
    return Number(value);
  }
  return value;
}
function isValueValid(type, value) {
  if (value === "" || value === null) {
    return false;
  }
  if (type === "Boolean" || type === "BooleanValue") {
    if (value.toString().toLowerCase() === "true" || value.toString().toLowerCase() === "false") {
      return true;
    }
    return false;
  } else if (numberDataTypes.indexOf(type) !== -1) {
    return !isNaN(value);
  }
  return true;
}
function isLeftConditionValid(leftCondition) {
  if (leftCondition.value === "" || leftCondition.value === null) {
    return false;
  }
  if (leftCondition.root === "BooleanValue") {
    if (leftCondition.value.toString().toLowerCase() === "true" || leftCondition.value.toString().toLowerCase() === "false") {
      return true;
    }
    return false;
  } else if (leftCondition.root === "IntegerValue" || leftCondition.root === "DecimalValue" || leftCondition.root === "LongValue") {
    return !isNaN(leftCondition.value);
  }
  return true;
}
function validateInput(value, validationFormat) {
  var re = new RegExp(validationFormat);
  if (re.test(value)) {
    return true;
  }
  return "Value is not valid.";
}
function getNumberDataTypes() {
  return numberDataTypes;
}
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
}
function convertToBool(existingValue) {
  for (var i in existingValue) {
    if (existingValue[i] === "true") {
      existingValue[i] = true;
    } else if (existingValue[i] === "false") {
      existingValue[i] = false;
    }
  }
  return existingValue;
}
function convertToStringOfBool(existingValue) {
  for (var i in existingValue) {
    if (existingValue[i] === true) {
      existingValue[i] = true.toString();
    } else if (existingValue[i] === false) {
      existingValue[i] = false.toString();
    }
  }
  return existingValue;
}
function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(atob(text)));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
//# sourceMappingURL=CommonRuleFunctions.js.map