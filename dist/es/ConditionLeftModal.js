import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import PropTypes from "prop-types";
import React from "react";
import applyReducers from "@traveloka/soya-components/lib/legacy/applyReducers";
import { commonRulesMapDisToProps, commonRulesReducers, commonRulesSelector } from "./CommonRuleRedux";
import { compose } from "redux";
import { connect } from "react-redux";
import { isLeftConditionValid, validateInput, getNumberDataTypes } from "./CommonRuleFunctions";
import { required, number } from "./ValidationUtil";
import { Button } from "@traveloka/soya-components";
import DropdownInput from "./DropdownInput";
import { NotificationManager } from "@traveloka/soya-components";
import TextInput from "./TextInput";
import * as style from "./CommonRule.styles";
var ConditionLeftModal = function (_React$Component) {
  function ConditionLeftModal(props) {
    var _this;
    _classCallCheck(this, ConditionLeftModal);
    _this = _callSuper(this, ConditionLeftModal, [props]);
    _defineProperty(_this, "getDefaultLeftCondition", function () {
      var _this$props = _this.props,
        operator = _this$props.operator,
        ruleStructures = _this$props.ruleStructures;
      var expressionStructure = JSON.parse(ruleStructures.expressionStructure);
      var dataTypeStructure = JSON.parse(ruleStructures.dataTypeStructure);
      var formatterStructure = JSON.parse(ruleStructures.formatterStructure);
      var acceptableLeftType = expressionStructure[operator].input[0];
      var compatibleWith = dataTypeStructure[acceptableLeftType] ? dataTypeStructure[acceptableLeftType].compatibleWith : "";
      for (var i in expressionStructure) {
        if (expressionStructure[i].type === "function" || expressionStructure[i].type === "constant") {
          var leftOutput = expressionStructure[i].output;
          if (_this.isLeftFunctionCompatible(leftOutput, compatibleWith)) {
            var result = {};
            for (var j in formatterStructure[i].property) {
              if (j === "BooleanValue") {
                result[j] = true;
              } else {
                result[j] = "";
              }
            }
            result.root = formatterStructure[i].id;
            return result;
          }
        }
      }
    });
    _defineProperty(_this, "changeDefaultAdditionalField", function (root) {
      var ruleStructures = _this.props.ruleStructures;
      var expressionStructure = JSON.parse(ruleStructures.expressionStructure);
      var formatterStructure = JSON.parse(ruleStructures.formatterStructure);
      var dataTypeStructure = JSON.parse(ruleStructures.dataTypeStructure);
      var result = {};
      for (var i in expressionStructure[root].property) {
        if (dataTypeStructure[expressionStructure[root].input[i]].valueOption.length > 0) {
          if (dataTypeStructure[expressionStructure[root].input[i]].valueOption[0] === "True" || dataTypeStructure[expressionStructure[root].input[i]].valueOption[0] === "False") {
            result[expressionStructure[root].property[i]] = dataTypeStructure[expressionStructure[root].input[i]].valueOption[0].toLowerCase();
          } else {
            result[expressionStructure[root].property[i]] = dataTypeStructure[expressionStructure[root].input[i]].valueOption[0];
          }
        } else {
          for (var j in formatterStructure[root].fields) {
            if (j === expressionStructure[root].property[i]) {
              result[expressionStructure[root].property[i]] = formatterStructure[root].fields[j].defaultValue;
              break;
            }
          }
        }
      }
      return result;
    });
    _defineProperty(_this, "handleChangeAdditionalField", function (name, value) {
      var existingValue = _this.state.existingValue;
      existingValue[name] = value;
      _this.setState({
        existingValue: existingValue
      });
    });
    _defineProperty(_this, "handleChangeRoot", function (name, value) {
      var defaultAdditionalField = _this.changeDefaultAdditionalField(value);
      var existingValue = Object.assign(defaultAdditionalField);
      existingValue[name] = value;
      _this.setState({
        existingValue: existingValue
      });
    });
    _defineProperty(_this, "handleCancel", function () {
      var onCancel = _this.props.onCancel;
      onCancel();
    });
    _defineProperty(_this, "handleSave", function () {
      var onSave = _this.props.onSave;
      var existingValue = _this.state.existingValue;
      if (isLeftConditionValid(existingValue)) {
        var left = {};
        for (var i in existingValue) {
          left[i] = existingValue[i];
        }
        onSave(left);
      } else {
        NotificationManager.showError({
          message: "Input is not valid, please re-check",
          size: "md"
        });
      }
    });
    _this.state = {
      existingValue: props.existingValue === null ? _this.getDefaultLeftCondition() : props.existingValue
    };
    return _this;
  }
  _inherits(ConditionLeftModal, _React$Component);
  return _createClass(ConditionLeftModal, [{
    key: "getModalOptions",
    value: function getModalOptions() {
      var _this$props2 = this.props,
        operator = _this$props2.operator,
        ruleStructures = _this$props2.ruleStructures;
      var leftOptions = [];
      var expressionStructure = JSON.parse(ruleStructures.expressionStructure);
      var dataTypeStructure = JSON.parse(ruleStructures.dataTypeStructure);
      var formatterStructure = JSON.parse(ruleStructures.formatterStructure);
      var acceptableLeftType = expressionStructure[operator].input[0];
      var compatibleWith = dataTypeStructure[acceptableLeftType] ? dataTypeStructure[acceptableLeftType].compatibleWith : "";
      for (var i in expressionStructure) {
        if (expressionStructure[i].type === "function" || expressionStructure[i].type === "constant") {
          var leftOutput = expressionStructure[i].output;
          if (this.isLeftFunctionCompatible(leftOutput, compatibleWith)) {
            leftOptions.push({
              label: formatterStructure[i].label,
              value: formatterStructure[i].id
            });
          }
        }
      }
      leftOptions.sort(function (a, b) {
        if (a.label > b.label) {
          return 1;
        } else if (b.label > a.label) {
          return -1;
        }
        return 0;
      });
      return leftOptions;
    }
  }, {
    key: "isLeftFunctionCompatible",
    value: function isLeftFunctionCompatible(leftOutput, acceptableLeftType) {
      for (var i in acceptableLeftType) {
        if (acceptableLeftType[i] === leftOutput) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: "getLeftAdditionalFieldType",
    value: function getLeftAdditionalFieldType(left) {
      var ruleStructures = this.props.ruleStructures;
      var result = {};
      var formatterStructure = JSON.parse(ruleStructures.formatterStructure);
      var dataTypeStructure = JSON.parse(ruleStructures.dataTypeStructure);
      var expressionStructure = JSON.parse(ruleStructures.expressionStructure);
      var property = expressionStructure[left].property;
      var resultFields = [];
      for (var i in property) {
        for (var j in formatterStructure[left].fields) {
          if (property[i] === formatterStructure[left].fields[j].id) {
            var dataType = dataTypeStructure[expressionStructure[left].input[i]];
            if (dataType.valueOption.length === 0) {
              var isInputDisabled = formatterStructure[left].fields[j].disabled;
              var defaultValue = formatterStructure[left].fields[j].defaultValue;
              if (dataType.type === "String" || dataType.type === "Byte") {
                resultFields.push({
                  type: "String",
                  label: formatterStructure[left].fields[j].displayAs,
                  name: formatterStructure[left].fields[j].id,
                  isDisabled: isInputDisabled,
                  defaultValue: defaultValue
                });
              } else if (getNumberDataTypes().includes(dataType.type)) {
                resultFields.push({
                  type: "Number",
                  label: formatterStructure[left].fields[j].displayAs,
                  name: formatterStructure[left].fields[j].id,
                  isDisabled: isInputDisabled,
                  defaultValue: defaultValue,
                  validationFormat: dataType.validationFormat
                });
              } else {
                resultFields.push({
                  type: "Custom",
                  label: formatterStructure[left].fields[j].displayAs,
                  name: formatterStructure[left].fields[j].id,
                  isDisabled: isInputDisabled,
                  defaultValue: defaultValue,
                  validationFormat: dataType.validationFormat
                });
              }
            } else {
              resultFields.push({
                type: "Option",
                label: formatterStructure[left].fields[j].displayAs,
                value: dataType.valueOption,
                name: formatterStructure[left].fields[j].id
              });
            }
          }
        }
      }
      result.fields = resultFields;
      result.info = formatterStructure[left].info;
      return result;
    }
  }, {
    key: "getDropdownOption",
    value: function getDropdownOption(options) {
      var opt = [{
        value: undefined,
        label: "Select",
        disabled: true
      }];
      for (var i in options) {
        if (options[i] === "True" || options[i] === "False") {
          opt.push({
            value: options[i].toLowerCase(),
            label: options[i]
          });
        } else {
          opt.push({
            value: options[i],
            label: options[i]
          });
        }
      }
      return opt;
    }
  }, {
    key: "getAdditionalField",
    value: function getAdditionalField() {
      var existingValue = this.state.existingValue;
      var additionalFieldToForm = [];
      if (existingValue && existingValue.root) {
        var additionalField = this.getLeftAdditionalFieldType(existingValue.root);
        for (var i in additionalField.fields) {
          var name = additionalField.fields[i].name;
          additionalFieldToForm.push(React.createElement("div", null, React.createElement("label", {
            key: i + "label"
          }, additionalField.fields[i].label), React.createElement("br", null)));
          var value = existingValue[name];
          if (additionalField.fields[i].type !== "Option" && additionalField.fields[i].defaultValue) {
            value = additionalField.fields[i].defaultValue;
          }
          if (additionalField.fields[i].type === "Number") {
            var validationFormat = !additionalField.fields[i].validationFormat ? ".*" : additionalField.fields[i].validationFormat;
            additionalFieldToForm.push(React.createElement(TextInput, {
              key: i + "number",
              name: name,
              placeholder: name,
              onChange: this.handleChangeAdditionalField,
              validators: [required, number, validateInput],
              validationFormat: validationFormat,
              value: value,
              isDisabled: additionalField.fields[i].isDisabled
            }));
          } else if (additionalField.fields[i].type === "String") {
            additionalFieldToForm.push(React.createElement(TextInput, {
              key: i + "string",
              name: name,
              placeholder: name,
              onChange: this.handleChangeAdditionalField,
              validators: [required],
              value: value,
              isDisabled: additionalField.fields[i].isDisabled
            }));
          } else if (additionalField.fields[i].type === "Custom") {
            var _validationFormat = !additionalField.fields[i].validationFormat ? ".*" : additionalField.fields[i].validationFormat;
            additionalFieldToForm.push(React.createElement(TextInput, {
              key: i + "custom",
              name: name,
              placeholder: name,
              onChange: this.handleChangeAdditionalField,
              validators: [required, validateInput],
              validationFormat: _validationFormat,
              value: value,
              isDisabled: additionalField.fields[i].isDisabled
            }));
          } else if (additionalField.fields[i].type === "Option") {
            additionalFieldToForm.push(React.createElement(DropdownInput, {
              key: i + "option",
              name: name,
              onChange: this.handleChangeAdditionalField,
              items: this.getDropdownOption(additionalField.fields[i].value),
              value: existingValue[name]
            }));
          }
        }
        additionalFieldToForm.push(React.createElement("label", {
          key: "info"
        }, additionalField.info));
      }
      return additionalFieldToForm;
    }
  }, {
    key: "render",
    value: function render() {
      var value = this.state.existingValue && this.state.existingValue.root ? this.state.existingValue.root : "";
      var items = this.getModalOptions();
      var additionalField = this.getAdditionalField();
      return React.createElement("div", null, React.createElement("div", null, React.createElement("label", null, "Condition"), React.createElement("br", null), React.createElement(DropdownInput, {
        value: value,
        name: "root",
        items: items,
        onChange: this.handleChangeRoot
      })), React.createElement("div", null, additionalField), React.createElement("div", {
        className: style.modalFooter
      }, React.createElement(Button, {
        onClick: this.handleCancel,
        color: "link"
      }, "Close"), React.createElement(Button, {
        onClick: this.handleSave,
        color: "blue"
      }, "OK")));
    }
  }]);
}(React.Component);
ConditionLeftModal.propTypes = {
  existingValue: PropTypes.shape({
    root: PropTypes.string,
    value: PropTypes.number
  }),
  operator: PropTypes.string.isRequired,
  ruleStructures: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};
var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    ruleStructures: commonRulesSelector.getRuleStructures(state)
  };
};
export default compose(applyReducers(commonRulesReducers), connect(mapStateToProps, commonRulesMapDisToProps))(ConditionLeftModal);
//# sourceMappingURL=ConditionLeftModal.js.map