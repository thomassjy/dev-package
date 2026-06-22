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
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _CommonRuleRedux = require("./CommonRuleRedux");
var _ValidationUtil = require("./ValidationUtil");
var _CommonRuleFunctions = require("./CommonRuleFunctions");
var _applyReducers = _interopRequireDefault(require("@traveloka/soya-components/lib/legacy/applyReducers"));
var _DropdownInput = _interopRequireDefault(require("./DropdownInput"));
var _TextInput = _interopRequireDefault(require("./TextInput"));
var _soyaComponents = require("@traveloka/soya-components");
var style = _interopRequireWildcard(require("./CommonRule.styles"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ActionsModal = function (_React$Component) {
  function ActionsModal(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, ActionsModal);
    _this = _callSuper(this, ActionsModal, [props]);
    (0, _defineProperty2["default"])(_this, "handleChangeRoot", function (name, value) {
      var stateValue = Object.assign(_this.getAdditionalFieldValue(value));
      stateValue[name] = value;
      _this.setState({
        existingValue: stateValue
      });
    });
    (0, _defineProperty2["default"])(_this, "handleChangeAdditionalField", function (name, value, isValid) {
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
      onSave((0, _CommonRuleFunctions.convertToBool)(existingValue));
    });
    _this.state = {
      existingValue: props.existingValue ? (0, _CommonRuleFunctions.convertToStringOfBool)(props.existingValue) : _this.getDefaultValue()
    };
    return _this;
  }
  (0, _inherits2["default"])(ActionsModal, _React$Component);
  return (0, _createClass2["default"])(ActionsModal, [{
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
      var numberTypes = (0, _CommonRuleFunctions.getNumberDataTypes)();
      for (var i in expressionStructure[root].property) {
        var additionalField = expressionStructure[root].property[i];
        var type = expressionStructure[root].input[i];
        additionalFieldToForm.push(_react["default"].createElement("label", null, additionalField));
        additionalFieldToForm.push(_react["default"].createElement("br", null));
        if (numberTypes.includes(type)) {
          additionalFieldToForm.push(_react["default"].createElement(_TextInput["default"], {
            key: i,
            name: additionalField,
            placeholder: name,
            onChange: this.handleChangeAdditionalField,
            validators: [_ValidationUtil.required, _ValidationUtil.number, _CommonRuleFunctions.validateInput],
            value: existingValue[additionalField],
            validationFormat: dataTypeStructure[type].validationFormat
          }));
        } else if (type === "String" || type === "Byte") {
          additionalFieldToForm.push(_react["default"].createElement(_TextInput["default"], {
            key: i,
            name: additionalField,
            placeholder: name,
            onChange: this.handleChangeAdditionalField,
            validators: [_ValidationUtil.required],
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
          additionalFieldToForm.push(_react["default"].createElement(_DropdownInput["default"], {
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
              option.label = (0, _CommonRuleFunctions.toTitleCase)(String(dataTypeStructure[type].valueOption[j]));
              _items.push(option);
            }
            additionalFieldToForm.push(_react["default"].createElement(_DropdownInput["default"], {
              key: i,
              name: additionalField,
              onChange: this.handleChangeAdditionalField,
              items: _items,
              value: existingValue[additionalField]
            }));
          } else {
            additionalFieldToForm.push(_react["default"].createElement(_TextInput["default"], {
              key: i,
              name: additionalField,
              placeholder: name,
              onChange: this.handleChangeAdditionalField,
              validators: [_ValidationUtil.required, _CommonRuleFunctions.validateInput],
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
            label: (0, _CommonRuleFunctions.toTitleCase)(formatterStructure[i].label)
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
      return _react["default"].createElement("div", null, _react["default"].createElement("div", null, _react["default"].createElement("label", null, "Expressions"), _react["default"].createElement("br", null), _react["default"].createElement(_DropdownInput["default"], {
        name: "root",
        value: existingValue.root,
        items: expressionOptions,
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
ActionsModal.propTypes = {
  existingValue: _propTypes["default"].object,
  ruleStructures: _propTypes["default"].string,
  onCancel: _propTypes["default"].func.isRequired,
  onSave: _propTypes["default"].func.isRequired
};
var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    ruleStructures: _CommonRuleRedux.commonRulesSelector.getRuleStructures(state)
  };
};
var _default = exports["default"] = (0, _redux.compose)((0, _applyReducers["default"])(_CommonRuleRedux.commonRulesReducers), (0, _reactRedux.connect)(mapStateToProps, _CommonRuleRedux.commonRulesMapDisToProps))(ActionsModal);
//# sourceMappingURL=ActionModal.js.map