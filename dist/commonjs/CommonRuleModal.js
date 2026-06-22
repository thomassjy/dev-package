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
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ValidationUtil = require("./ValidationUtil");
var _soyaComponents = require("@traveloka/soya-components");
var _DropdownInput = _interopRequireDefault(require("./DropdownInput"));
var _TextInput = _interopRequireDefault(require("./TextInput"));
var style = _interopRequireWildcard(require("./CommonRule.styles"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var CommonRuleModal = function (_React$Component) {
  function CommonRuleModal(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, CommonRuleModal);
    _this = _callSuper(this, CommonRuleModal, [props]);
    (0, _defineProperty2["default"])(_this, "handleInputChange", function (name, value, isValid) {
      if (isValid) {
        var stateObj = {};
        stateObj[name] = value;
        _this.setState(stateObj);
      }
    });
    (0, _defineProperty2["default"])(_this, "handleSelectChange", function (name, value) {
      _this.setState({
        enabled: value
      });
    });
    (0, _defineProperty2["default"])(_this, "handleCancel", function () {
      var onCancel = _this.props.onCancel;
      onCancel();
    });
    (0, _defineProperty2["default"])(_this, "handleSave", function () {
      var onSave = _this.props.onSave;
      var _this$state = _this.state,
        name = _this$state.name,
        description = _this$state.description,
        priority = _this$state.priority;
      var enabled = _this.state.enabled;
      if (name && priority && enabled) {
        enabled = enabled === "true";
        onSave({
          name: name,
          description: description,
          priority: priority,
          enabled: enabled
        });
      } else {
        _soyaComponents.NotificationManager.showError("Please fix input");
      }
    });
    if (props.mode === "create") {
      _this.state = {
        name: "",
        description: "",
        priority: "0",
        enabled: "true"
      };
    } else {
      _this.state = {
        name: props.rule.name || "",
        description: props.rule.description || "",
        priority: props.rule.priority || "0",
        enabled: props.rule ? props.rule.enabled.toString() : "true"
      };
    }
    return _this;
  }
  (0, _inherits2["default"])(CommonRuleModal, _React$Component);
  return (0, _createClass2["default"])(CommonRuleModal, [{
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
        name = _this$state2.name,
        description = _this$state2.description,
        priority = _this$state2.priority,
        enabled = _this$state2.enabled;
      var mode = this.props.mode;
      var enabledItems = [{
        value: "true",
        label: "True"
      }, {
        value: "false",
        label: "False"
      }];
      return _react["default"].createElement("div", null, _react["default"].createElement("div", null, _react["default"].createElement(_soyaComponents.Label, null, "Name"), _react["default"].createElement(_TextInput["default"], {
        value: name,
        placeholder: "Rule Name",
        name: "name",
        onChange: this.handleInputChange,
        validators: [_ValidationUtil.required]
      })), _react["default"].createElement("div", null, _react["default"].createElement(_soyaComponents.Label, null, "Description"), _react["default"].createElement(_TextInput["default"], {
        value: description,
        placeholder: "Description",
        name: "description",
        onChange: this.handleInputChange,
        validators: []
      })), _react["default"].createElement("div", null, _react["default"].createElement(_soyaComponents.Label, null, "Priority"), _react["default"].createElement(_TextInput["default"], {
        value: priority,
        placeholder: "Priority",
        name: "priority",
        onChange: this.handleInputChange,
        validators: [_ValidationUtil.required, _ValidationUtil.number]
      })), _react["default"].createElement("div", null, _react["default"].createElement(_soyaComponents.Label, null, "Enabled"), _react["default"].createElement(_DropdownInput["default"], {
        value: enabled,
        name: "enabled",
        onChange: this.handleSelectChange,
        items: enabledItems
      })), _react["default"].createElement("div", {
        className: style.modalFooter
      }, _react["default"].createElement(_soyaComponents.Button, {
        onClick: this.handleCancel,
        color: "link"
      }, "Close"), _react["default"].createElement(_soyaComponents.Button, {
        onClick: this.handleSave,
        color: "blue"
      }, mode === "edit" ? "Save" : "Add")));
    }
  }]);
}(_react["default"].Component);
CommonRuleModal.propTypes = {
  onSave: _propTypes["default"].func,
  onCancel: _propTypes["default"].func,
  mode: _propTypes["default"].oneOf(["create", "edit", "duplicate"]),
  rule: _propTypes["default"].shape({
    name: _propTypes["default"].string,
    description: _propTypes["default"].string,
    priority: _propTypes["default"].number,
    enabled: _propTypes["default"].bool
  })
};
var _default = exports["default"] = CommonRuleModal;
//# sourceMappingURL=CommonRuleModal.js.map