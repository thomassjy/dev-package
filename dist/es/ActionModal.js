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
import { compose } from "redux";
import { connect } from "react-redux";
import { commonRulesMapDisToProps, commonRulesReducers, commonRulesSelector } from "./CommonRuleRedux";
import { number, required } from "./ValidationUtil";
import { toTitleCase, validateInput, getNumberDataTypes, convertToStringOfBool, convertToBool } from "./CommonRuleFunctions";
import applyReducers from "@traveloka/soya-components/lib/legacy/applyReducers";
import DropdownInput from "./DropdownInput";
import TextInput from "./TextInput";
import { Button } from "@traveloka/soya-components";
import * as style from "./CommonRule.styles";
var ActionsModal = function (_React$Component) {
  function ActionsModal(props) {
    var _this;
    _classCallCheck(this, ActionsModal);
    _this = _callSuper(this, ActionsModal, [props]);
    _defineProperty(_this, "handleChangeRoot", function (name, value) {
      var stateValue = Object.assign(_this.getAdditionalFieldValue(value));
      stateValue[name] = value;
      _this.setState({
        existingValue: stateValue
      });
    });
    _defineProperty(_this, "handleChangeAdditionalField", function (name, value, isValid) {
      var existingValue = _this.state.existingValue;
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
      onSave(convertToBool(existingValue));
    });
    _this.state = {
      existingValue: props.existingValue ? convertToStringOfBool(props.existingValue) : _this.getDefaultValue()
    };
    return _this;
  }
  _inherits(ActionsModal, _React$Component);
  return _createClass(ActionsModal, [{
    key: "getDefaultValue",
    value: function getDefaultValue() {
      var ruleStructures = this.props.ruleStructures;
      var expressionStructure = JSON.parse(ruleStructures.expressionStructure);
      for (var i in expressionStructure) {
        if (expressionStructure[i].type === "procedure") {
          var defaultValue = Object.assign(this.getAdditionalFieldValue(expressionStructure[i].id));
          defaultValue.root = expressionStructure[i].id;
          return defaultValue;
        }
      }
    }
  }, {
    key: "getAdditionalFieldValue",
    value: function getAdditionalFieldValue(root) {
      var existingValue;
      if (this.state && this.state.existingValue) {
        existingValue = this.state.existingValue;
      }
      var ruleStructures = this.props.ruleStructures;
      var expressionStructure = JSON.parse(ruleStructures.expressionStructure);
      var dataTypeStructure = JSON.parse(ruleStructures.dataTypeStructure);
      var result = {};
      for (var i in expressionStructure[root].input) {
        var type = expressionStructure[root].input[i];
        if (!dataTypeStructure[type].valueOption.length) {
          result[expressionStructure[root].property[i]] = !existingValue ? "" : existingValue[expressionStructure[root].property[i]];
        } else {
          if (type === "Boolean") {
            result[expressionStructure[root].property[i]] = "true";
          } else {
            result[expressionStructure[root].property[i]] = dataTypeStructure[type].valueOption[0];
          }
        }
      }
      return result;
    }
  }, {
    key: "getAdditionalField",
    value: function getAdditionalField(root) {
      var additionalFieldToForm = [];
      var ruleStructures = this.props.ruleStructures;
      var expressionStructure = JSON.parse(ruleStructures.expressionStructure);
      var dataTypeStructure = JSON.parse(ruleStructures.dataTypeStructure);
      var existingValue = this.state.existingValue;
      var numberTypes = getNumberDataTypes();
      for (var i in expressionStructure[root].property) {
        var additionalField = expressionStructure[root].property[i];
        var type = expressionStructure[root].input[i];
        additionalFieldToForm.push(React.createElement("label", null, additionalField));
        additionalFieldToForm.push(React.createElement("br", null));
        if (numberTypes.includes(type)) {
          additionalFieldToForm.push(React.createElement(TextInput, {
            key: i,
            name: additionalField,
            placeholder: name,
            onChange: this.handleChangeAdditionalField,
            validators: [required, number, validateInput],
            value: existingValue[additionalField],
            validationFormat: dataTypeStructure[type].validationFormat
          }));
        } else if (type === "String" || type === "Byte") {
          additionalFieldToForm.push(React.createElement(TextInput, {
            key: i,
            name: additionalField,
            placeholder: name,
            onChange: this.handleChangeAdditionalField,
            validators: [required],
            value: existingValue[additionalField]
          }));
        } else if (type === "Boolean") {
          var items = [{
            value: "true",
            label: "True"
          }, {
            value: "false",
            label: "False"
          }];
          additionalFieldToForm.push(React.createElement(DropdownInput, {
            key: i,
            name: additionalField,
            onChange: this.handleChangeAdditionalField,
            items: items,
            value: existingValue[additionalField]
          }));
        } else {
          if (dataTypeStructure[type].valueOption.length > 0) {
            var _items = [];
            for (var j in dataTypeStructure[type].valueOption) {
              var option = {};
              option.value = dataTypeStructure[type].valueOption[j];
              option.label = toTitleCase(String(dataTypeStructure[type].valueOption[j]));
              _items.push(option);
            }
            additionalFieldToForm.push(React.createElement(DropdownInput, {
              key: i,
              name: additionalField,
              onChange: this.handleChangeAdditionalField,
              items: _items,
              value: existingValue[additionalField]
            }));
          } else {
            additionalFieldToForm.push(React.createElement(TextInput, {
              key: i,
              name: additionalField,
              placeholder: name,
              onChange: this.handleChangeAdditionalField,
              validators: [required, validateInput],
              validationFormat: dataTypeStructure[type].validationFormat,
              value: existingValue[additionalField]
            }));
          }
        }
      }
      return additionalFieldToForm;
    }
  }, {
    key: "convertExistingValue",
    value: function convertExistingValue(existingValue) {
      for (var i in existingValue) {
        if (existingValue[i] === "true") {
          existingValue[i] = true;
        } else if (existingValue[i] === "false") {
          existingValue[i] = false;
        }
      }
      return existingValue;
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      var ruleStructures = this.props.ruleStructures;
      var expressionOptions = [];
      var expressionStructure = JSON.parse(ruleStructures.expressionStructure);
      var formatterStructure = JSON.parse(ruleStructures.formatterStructure);
      for (var i in expressionStructure) {
        if (expressionStructure[i].type === "procedure") {
          expressionOptions.push({
            value: i,
            label: toTitleCase(formatterStructure[i].label)
          });
        }
      }
      return expressionOptions;
    }
  }, {
    key: "render",
    value: function render() {
      var expressionOptions = this.getOptions();
      var existingValue = this.state.existingValue;
      var additionalField = this.getAdditionalField(existingValue.root);
      return React.createElement("div", null, React.createElement("div", null, React.createElement("label", null, "Expressions"), React.createElement("br", null), React.createElement(DropdownInput, {
        name: "root",
        value: existingValue.root,
        items: expressionOptions,
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
ActionsModal.propTypes = {
  existingValue: PropTypes.object,
  ruleStructures: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};
var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    ruleStructures: commonRulesSelector.getRuleStructures(state)
  };
};
export default compose(applyReducers(commonRulesReducers), connect(mapStateToProps, commonRulesMapDisToProps))(ActionsModal);
//# sourceMappingURL=ActionModal.js.map