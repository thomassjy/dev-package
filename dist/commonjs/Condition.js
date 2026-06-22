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
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _applyReducers = _interopRequireDefault(require("@traveloka/soya-components/lib/legacy/applyReducers"));
var _CommonRuleRedux = require("./CommonRuleRedux");
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _ConditionRow = _interopRequireDefault(require("./ConditionRow"));
var _Operator = _interopRequireDefault(require("./Operator"));
var style = _interopRequireWildcard(require("./CommonRule.styles"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Condition = function (_React$Component) {
  function Condition(props) {
    (0, _classCallCheck2["default"])(this, Condition);
    return _callSuper(this, Condition, [props]);
  }
  (0, _inherits2["default"])(Condition, _React$Component);
  return (0, _createClass2["default"])(Condition, [{
    key: "renderCondition",
    value: function renderCondition(condition, index, initialMargin, lastOperator) {
      var componentIndex = this.props.componentIndex;
      var margin = initialMargin;
      if (condition) {
        if (condition && condition.root && (condition.root.toUpperCase() === "AND" || condition.root.toUpperCase() === "OR" || condition.root.toUpperCase() === "NOT")) {
          if (lastOperator && lastOperator !== condition.root) {
            margin += 35;
          }
          if (condition.root.toUpperCase() === "AND" || condition.root.toUpperCase() === "OR") {
            return _react["default"].createElement("div", {
              key: index
            }, this.renderCondition(condition.leaf[0], index.concat(["leaf", Number(0)]), margin, condition.root), _react["default"].createElement(_Operator["default"], {
              condition: condition,
              componentIndex: componentIndex,
              index: index,
              margin: margin,
              value: condition.root
            }), this.renderCondition(condition.leaf[1], index.concat(["leaf", Number(1)]), margin, condition.root));
          }
          return _react["default"].createElement("div", {
            key: index
          }, _react["default"].createElement(_Operator["default"], {
            condition: condition,
            componentIndex: componentIndex,
            index: index,
            margin: margin,
            value: condition.root
          }), " ", this.renderCondition(condition.leaf[0], index.concat(["leaf", Number(0)]), margin, condition.root));
        }
        return _react["default"].createElement("div", {
          key: index,
          className: style.conditionHelperLine,
          style: {
            marginLeft: margin
          }
        }, _react["default"].createElement(_ConditionRow["default"], {
          condition: condition,
          componentIndex: componentIndex,
          index: index
        }));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        condition = _this$props.condition,
        index = _this$props.index;
      return _react["default"].createElement("div", null, this.renderCondition(condition, index, 10, ""));
    }
  }]);
}(_react["default"].Component);
Condition.propTypes = {
  condition: _propTypes["default"].object.isRequired,
  componentIndex: _propTypes["default"].number.isRequired,
  index: _propTypes["default"].number.isRequired
};
var _default = exports["default"] = (0, _redux.compose)((0, _applyReducers["default"])(_CommonRuleRedux.commonRulesReducers), (0, _reactRedux.connect)(null, _CommonRuleRedux.commonRulesMapDisToProps))(Condition);
//# sourceMappingURL=Condition.js.map