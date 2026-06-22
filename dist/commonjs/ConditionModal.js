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
var _applyReducers = _interopRequireDefault(require("@traveloka/soya-components/lib/legacy/applyReducers"));
var _CommonRuleRedux = require("./CommonRuleRedux");
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _soyaComponents = require("@traveloka/soya-components");
var _DropdownInput = _interopRequireDefault(require("./DropdownInput"));
var style = _interopRequireWildcard(require("./CommonRule.styles"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ConditionModal = function (_React$Component) {
  function ConditionModal(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, ConditionModal);
    _this = _callSuper(this, ConditionModal, [props]);
    (0, _defineProperty2["default"])(_this, "getDefaultOperator", function (ruleStructures) {
      var expressionStructure = JSON.parse(ruleStructures.expressionStructure);
      for (var i in expressionStructure) {
        if (expressionStructure[i].type === "operator") {
          return i;
        }
      }
      return null;
    });
    (0, _defineProperty2["default"])(_this, "getDropdownItems", function () {
      var options = [];
      var ruleStructures = _this.props.ruleStructures;
      var expressionStructure = JSON.parse(ruleStructures.expressionStructure);
      for (var i in expressionStructure) {
        if (expressionStructure[i].type === "operator") {
          options.push({
            label: _this.getOperatorLabel(i),
            value: i
          });
        }
      }
      return options;
    });
    (0, _defineProperty2["default"])(_this, "getOperatorLabel", function (operatorId) {
      var ruleStructures = _this.props.ruleStructures;
      var formatterStructure = JSON.parse(ruleStructures.formatterStructure);
      return formatterStructure[operatorId].label;
    });
    (0, _defineProperty2["default"])(_this, "handleSelectChange", function (name, value) {
      var stateObj = {};
      stateObj[name] = value;
      _this.setState(stateObj);
    });
    (0, _defineProperty2["default"])(_this, "handleCancel", function () {
      var onCancel = _this.props.onCancel;
      onCancel();
    });
    (0, _defineProperty2["default"])(_this, "handleSave", function () {
      var onSave = _this.props.onSave;
      var root = _this.state.root;
      onSave({
        root: root
      });
    });
    _this.state = {
      root: props.existingValue ? props.existingValue : _this.getDefaultOperator(props.ruleStructures)
    };
    return _this;
  }
  (0, _inherits2["default"])(ConditionModal, _React$Component);
  return (0, _createClass2["default"])(ConditionModal, [{
    key: "render",
    value: function render() {
      var root = this.state.root;
      var rootItems = this.getDropdownItems();
      return _react["default"].createElement("div", null, _react["default"].createElement("div", null, _react["default"].createElement(_soyaComponents.Label, null, "Condition"), _react["default"].createElement(_DropdownInput["default"], {
        value: root,
        name: "root",
        onChange: this.handleSelectChange,
        items: rootItems
      })), _react["default"].createElement("div", {
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
ConditionModal.propTypes = {
  existingValue: _propTypes["default"].string,
  onCancel: _propTypes["default"].func.isRequired,
  onSave: _propTypes["default"].func.isRequired,
  ruleStructures: _propTypes["default"].string.isRequired
};
var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    ruleStructures: _CommonRuleRedux.commonRulesSelector.getRuleStructures(state)
  };
};
var _default = exports["default"] = (0, _redux.compose)((0, _applyReducers["default"])(_CommonRuleRedux.commonRulesReducers), (0, _reactRedux.connect)(mapStateToProps, _CommonRuleRedux.commonRulesMapDisToProps))(ConditionModal);
//# sourceMappingURL=ConditionModal.js.map