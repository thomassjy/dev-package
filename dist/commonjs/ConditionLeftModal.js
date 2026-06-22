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
var ConditionLeftModal = function (_React$Component) {
  function ConditionLeftModal(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, ConditionLeftModal);
    _this = _callSuper(this, ConditionLeftModal, [props]);
    (0, _defineProperty2["default"])(_this, "getDefaultLeftCondition", function () {
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
    (0, _defineProperty2["default"])(_this, "changeDefaultAdditionalField", function (root) {
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
    (0, _defineProperty2["default"])(_this, "handleChangeAdditionalField", function (name, value) {
      var existingValue = _this.state.existingValue;
      existingValue[name] = value;
      _this.setState({
        existingValue: existingValue
      });
    });
    (0, _defineProperty2["default"])(_this, "handleChangeRoot", function (name, value) {
      var defaultAdditionalField = _this.changeDefaultAdditionalField(value);
      var existingValue = Object.assign(defaultAdditionalField);
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
      if ((0, _CommonRuleFunctions.isLeftConditionValid)(existingValue)) {
        var left = {};
        for (var i in existingValue) {
          left[i] = existingValue[i];
        }
        onSave(left);
      } else {
        _soyaComponents.NotificationManager.showError({
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
  (0, _inherits2["default"])(ConditionLeftModal, _React$Component);
  return (0, _createClass2["default"])(ConditionLeftModal, [{
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
              } else if ((0, _CommonRuleFunctions.getNumberDataTypes)().includes(dataType.type)) {
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
          additionalFieldToForm.push(_react["default"].createElement("div", null, _react["default"].createElement("label", {
            key: i + "label"
          }, additionalField.fields[i].label), _react["default"].createElement("br", null)));
          var value = existingValue[name];
          if (additionalField.fields[i].type !== "Option" && additionalField.fields[i].defaultValue) {
            value = additionalField.fields[i].defaultValue;
          }
          if (additionalField.fields[i].type === "Number") {
            var validationFormat = !additionalField.fields[i].validationFormat ? ".*" : additionalField.fields[i].validationFormat;
            additionalFieldToForm.push(_react["default"].createElement(_TextInput["default"], {
              key: i + "number",
              name: name,
              placeholder: name,
              onChange: this.handleChangeAdditionalField,
              validators: [_ValidationUtil.required, _ValidationUtil.number, _CommonRuleFunctions.validateInput],
              validationFormat: validationFormat,
              value: value,
              isDisabled: additionalField.fields[i].isDisabled
            }));
          } else if (additionalField.fields[i].type === "String") {
            additionalFieldToForm.push(_react["default"].createElement(_TextInput["default"], {
              key: i + "string",
              name: name,
              placeholder: name,
              onChange: this.handleChangeAdditionalField,
              validators: [_ValidationUtil.required],
              value: value,
              isDisabled: additionalField.fields[i].isDisabled
            }));
          } else if (additionalField.fields[i].type === "Custom") {
            var _validationFormat = !additionalField.fields[i].validationFormat ? ".*" : additionalField.fields[i].validationFormat;
            additionalFieldToForm.push(_react["default"].createElement(_TextInput["default"], {
              key: i + "custom",
              name: name,
              placeholder: name,
              onChange: this.handleChangeAdditionalField,
              validators: [_ValidationUtil.required, _CommonRuleFunctions.validateInput],
              validationFormat: _validationFormat,
              value: value,
              isDisabled: additionalField.fields[i].isDisabled
            }));
          } else if (additionalField.fields[i].type === "Option") {
            additionalFieldToForm.push(_react["default"].createElement(_DropdownInput["default"], {
              key: i + "option",
              name: name,
              onChange: this.handleChangeAdditionalField,
              items: this.getDropdownOption(additionalField.fields[i].value),
              value: existingValue[name]
            }));
          }
        }
        additionalFieldToForm.push(_react["default"].createElement("label", {
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
      return _react["default"].createElement("div", null, _react["default"].createElement("div", null, _react["default"].createElement("label", null, "Condition"), _react["default"].createElement("br", null), _react["default"].createElement(_DropdownInput["default"], {
        value: value,
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
ConditionLeftModal.propTypes = {
  existingValue: _propTypes["default"].shape({
    root: _propTypes["default"].string,
    value: _propTypes["default"].number
  }),
  operator: _propTypes["default"].string.isRequired,
  ruleStructures: _propTypes["default"].string.isRequired,
  onCancel: _propTypes["default"].func.isRequired,
  onSave: _propTypes["default"].func.isRequired
};
var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    ruleStructures: _CommonRuleRedux.commonRulesSelector.getRuleStructures(state)
  };
};
var _default = exports["default"] = (0, _redux.compose)((0, _applyReducers["default"])(_CommonRuleRedux.commonRulesReducers), (0, _reactRedux.connect)(mapStateToProps, _CommonRuleRedux.commonRulesMapDisToProps))(ConditionLeftModal);
//# sourceMappingURL=ConditionLeftModal.js.map