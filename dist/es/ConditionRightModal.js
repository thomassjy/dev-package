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
import { isValueValid } from "./CommonRuleFunctions";
import { number, required } from "./ValidationUtil";
import { Button } from "@traveloka/soya-components";
import DropdownInput from "./DropdownInput";
import { NotificationManager } from "@traveloka/soya-components";
import TextInput from "./TextInput";
import * as style from "./CommonRule.styles";
var ConditionRightModal = function (_React$Component) {
  function ConditionRightModal(props) {
    var _this;
    _classCallCheck(this, ConditionRightModal);
    _this = _callSuper(this, ConditionRightModal, [props]);
    _defineProperty(_this, "getDefaultRightCondition", function () {
      var acceptableOutput = [];
      var _this$props = _this.props,
        ruleStructures = _this$props.ruleStructures,
        leftValue = _this$props.leftValue;
      var formatterStructure = JSON.parse(ruleStructures.formatterStructure);
      var expressionStructure = JSON.parse(ruleStructures.expressionStructure);
      var leftFieldOutput = expressionStructure[leftValue].output;
      var value = "";
      if (leftFieldOutput === "String" || leftFieldOutput === "Boolean" || leftFieldOutput === "Integer" || leftFieldOutput === "Long") {
        acceptableOutput.push(leftFieldOutput + "Value");
        if (leftFieldOutput === "Boolean") {
          value = "true";
        }
      } else {
        acceptableOutput.push("DecimalValue");
      }
      for (var j in acceptableOutput) {
        return {
          root: formatterStructure[acceptableOutput[j]].id,
          value: value
        };
      }
    });
    _defineProperty(_this, "getRightAdditionalField", function () {
      var existingValue = _this.state.existingValue;
      var additionalField = [];
      additionalField.push(React.createElement("div", null, React.createElement("label", null, "Value"), React.createElement("br", null)));
      if (existingValue.root === "BooleanValue") {
        var enabledItems = [{
          value: "true",
          label: "True"
        }, {
          value: "false",
          label: "False"
        }];
        additionalField.push(React.createElement(DropdownInput, {
          value: existingValue.value,
          name: "value",
          onChange: _this.handleChangeValue,
          items: enabledItems
        }));
      } else if (existingValue.root === "StringValue") {
        additionalField.push(React.createElement(TextInput, {
          name: "value",
          placeholder: "value",
          onChange: _this.handleChangeValue,
          validators: [required],
          value: existingValue.value
        }));
      } else {
        additionalField.push(React.createElement(TextInput, {
          name: "value",
          placeholder: "value",
          onChange: _this.handleChangeValue,
          validators: [required, number],
          value: existingValue.value
        }));
      }
      return additionalField;
    });
    _defineProperty(_this, "handleChangeRoot", function (name, value) {
      var existingValue = {};
      existingValue[name] = value;
      _this.setState({
        existingValue: existingValue
      });
    });
    _defineProperty(_this, "handleChangeValue", function (name, value, isValid) {
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
      if (isValueValid(existingValue.root, existingValue.value)) {
        var right = {};
        for (var i in existingValue) {
          right[i] = existingValue[i];
        }
        onSave(right);
      } else {
        NotificationManager.showError({
          message: "Input is not valid, please re-check",
          size: "md"
        });
      }
    });
    _this.state = {
      existingValue: props.existingValue === null ? _this.getDefaultRightCondition() : props.existingValue
    };
    return _this;
  }
  _inherits(ConditionRightModal, _React$Component);
  return _createClass(ConditionRightModal, [{
    key: "getRightModalFields",
    value: function getRightModalFields() {
      var rightOptions = [];
      var acceptableOutput = [];
      var _this$props2 = this.props,
        ruleStructures = _this$props2.ruleStructures,
        leftValue = _this$props2.leftValue;
      var formatterStructure = JSON.parse(ruleStructures.formatterStructure);
      var expressionStructure = JSON.parse(ruleStructures.expressionStructure);
      var leftFieldOutput = expressionStructure[leftValue].output;
      if (leftFieldOutput === "String" || leftFieldOutput === "Boolean" || leftFieldOutput === "Integer" || leftFieldOutput === "Long") {
        acceptableOutput.push(leftFieldOutput + "Value");
      } else {
        acceptableOutput.push("DecimalValue");
      }
      for (var j in acceptableOutput) {
        var option = {
          label: formatterStructure[acceptableOutput[j]].label,
          value: formatterStructure[acceptableOutput[j]].id
        };
        if (!this.checkIfExistInArray(option, rightOptions)) {
          rightOptions.push(option);
        }
      }
      rightOptions.sort(function (a, b) {
        if (a.label > b.label) {
          return 1;
        } else if (b.label > a.label) {
          return -1;
        }
        return 0;
      });
      return rightOptions;
    }
  }, {
    key: "checkIfExistInArray",
    value: function checkIfExistInArray(obj, arrayObj) {
      for (var i in arrayObj) {
        if (arrayObj[i].label === obj.label && arrayObj[i].value === obj.value) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var existingValue = this.state.existingValue;
      var items = this.getRightModalFields();
      var additionalField = this.getRightAdditionalField();
      return React.createElement("div", null, React.createElement("div", null, React.createElement("label", null, "Expression"), React.createElement("br", null), React.createElement(DropdownInput, {
        value: existingValue.root,
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
ConditionRightModal.propTypes = {
  existingValue: PropTypes.shape({
    root: PropTypes.string,
    value: PropTypes.number
  }),
  leftValue: PropTypes.string.isRequired,
  ruleStructures: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};
var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    ruleStructures: commonRulesSelector.getRuleStructures(state)
  };
};
export default compose(applyReducers(commonRulesReducers), connect(mapStateToProps, commonRulesMapDisToProps))(ConditionRightModal);
//# sourceMappingURL=ConditionRightModal.js.map