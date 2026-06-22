var numberDataTypes = ["Integer", "Decimal", "BigDecimal", "Float", "Number", "IntegerValue", "DecimalValue", "FloatValue"];
export function getRealValueByType(type, value) {
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
export function isValueValid(type, value) {
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
export function isLeftConditionValid(leftCondition) {
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
export function validateInput(value, validationFormat) {
  var re = new RegExp(validationFormat);
  if (re.test(value)) {
    return true;
  }
  return "Value is not valid.";
}
export function getNumberDataTypes() {
  return numberDataTypes;
}
export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1);
  });
}
export function convertToBool(existingValue) {
  for (var i in existingValue) {
    if (existingValue[i] === "true") {
      existingValue[i] = true;
    } else if (existingValue[i] === "false") {
      existingValue[i] = false;
    }
  }
  return existingValue;
}
export function convertToStringOfBool(existingValue) {
  for (var i in existingValue) {
    if (existingValue[i] === true) {
      existingValue[i] = true.toString();
    } else if (existingValue[i] === false) {
      existingValue[i] = false.toString();
    }
  }
  return existingValue;
}
export function download(filename, text) {
  var element = document.createElement("a");
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(atob(text)));
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
//# sourceMappingURL=CommonRuleFunctions.js.map