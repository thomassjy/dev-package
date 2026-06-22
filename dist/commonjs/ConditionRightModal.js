"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _applyReducers = _interopRequireDefault(require("@traveloka/soya-components/lib/legacy/applyReducers"));
var _CommonRuleRedux = require("./CommonRuleRedux");
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _CommonRuleFunctions = require("./CommonRuleFunctions");
var _ValidationUtil = require("./ValidationUtil");
var _soyaComponents = require("@traveloka/soya-components");
var _DropdownInput = _interopRequireDefault(require("./DropdownInput"));
var _TextInput = _interopRequireDefault(require("./TextInput"));
var style = _interopRequireWildcard(require("./CommonRule.styles"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ConditionRightModal = function (_React$Component) {
  function ConditionRightModal(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, ConditionRightModal);
    _this = _callSuper(this, ConditionRightModal, [props]);
    (0, _defineProperty2["default"])(_this, "getDefaultRightCondition", function () {
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
    (0, _defineProperty2["default"])(_this, "getRightAdditionalField", function () {
      var existingValue = _this.state.existingValue;
      var additionalField = [];
      additionalField.push(_react["default"].createElement("div", null, _react["default"].createElement("label", null, "Value"), _react["default"].createElement("br", null)));
      if (existingValue.root === "BooleanValue") {
        var enabledItems = [{
          value: "true",
          label: "True"
        }, {
          value: "false",
          label: "False"
        }];
        additionalField.push(_react["default"].createElement(_DropdownInput["default"], {
          value: existingValue.value,
          name: "value",
          onChange: _this.handleChangeValue,
          items: enabledItems
        }));
      } else if (existingValue.root === "StringValue") {
        additionalField.push(_react["default"].createElement(_TextInput["default"], {
          name: "value",
          placeholder: "value",
          onChange: _this.handleChangeValue,
          validators: [_ValidationUtil.required],
          value: existingValue.value
        }));
      } else {
        additionalField.push(_react["default"].createElement(_TextInput["default"], {
          name: "value",
          placeholder: "value",
          onChange: _this.handleChangeValue,
          validators: [_ValidationUtil.required, _ValidationUtil.number],
          value: existingValue.value
        }));
      }
      return additionalField;
    });
    (0, _defineProperty2["default"])(_this, "handleChangeRoot", function (name, value) {
      var existingValue = {};
      existingValue[name] = value;
      _this.setState({
        existingValue: existingValue
      });
    });
    (0, _defineProperty2["default"])(_this, "handleChangeValue", function (name, value, isValid) {
      var existingValue = _this.state.existingValue;
      existingValue[name] = value;
      _this.setState({
        existingValue: existingValue
      });
    });
    (0, _defineProperty2["default"])(_this, "handleCancel", function () {
      var onCancel = _this.props.onCancel;
      onCancel();
    });
    (0, _defineProperty2["default"])(_this, "handleSave", function () {
      var onSave = _this.props.onSave;
      var existingValue = _this.state.existingValue;
      if ((0, _CommonRuleFunctions.isValueValid)(existingValue.root, existingValue.value)) {
        var right = {};
        for (var i in existingValue) {
          right[i] = existingValue[i];
        }
        onSave(right);
      } else {
        _soyaComponents.NotificationManager.showError({
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
  (0, _inherits2["default"])(ConditionRightModal, _React$Component);
  return (0, _createClass2["default"])(ConditionRightModal, [{
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
      return _react["default"].createElement("div", null, _react["default"].createElement("div", null, _react["default"].createElement("label", null, "Expression"), _react["default"].createElement("br", null), _react["default"].createElement(_DropdownInput["default"], {
        value: existingValue.root,
        name: "root",
        items: items,
        onChange: this.handleChangeRoot
      })), _react["default"].createElement("div", null, additionalField), _react["default"].createElement("div", {
        className: style.modalFooter
      }, _react["default"].createElement(_soyaComponents.Button, {
        onClick: this.handleCancel,
        color: "link"
      }, "Close"), _react["default"].createElement(_soyaComponents.Button, {
        onClick: this.handleSave,
        color: "blue"
      }, "OK")));
    }
  }]);
}(_react["default"].Component);
ConditionRightModal.propTypes = {
  existingValue: _propTypes["default"].shape({
    root: _propTypes["default"].string,
    value: _propTypes["default"].number
  }),
  leftValue: _propTypes["default"].string.isRequired,
  ruleStructures: _propTypes["default"].string.isRequired,
  onSave: _propTypes["default"].func.isRequired,
  onCancel: _propTypes["default"].func.isRequired
};
var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    ruleStructures: _CommonRuleRedux.commonRulesSelector.getRuleStructures(state)
  };
};
var _default = exports["default"] = (0, _redux.compose)((0, _applyReducers["default"])(_CommonRuleRedux.commonRulesReducers), (0, _reactRedux.connect)(mapStateToProps, _CommonRuleRedux.commonRulesMapDisToProps))(ConditionRightModal);
//# sourceMappingURL=ConditionRightModal.js.map