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
var _soyaComponents = require("@traveloka/soya-components");
var _OperatorModal = _interopRequireDefault(require("./OperatorModal"));
var _StaticLinkText = _interopRequireDefault(require("./StaticLinkText/StaticLinkText"));
var style = _interopRequireWildcard(require("./CommonRule.styles"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Operator = function (_React$Component) {
  function Operator(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, Operator);
    _this = _callSuper(this, Operator, [props]);
    (0, _defineProperty2["default"])(_this, "handleShowModalChangeOperator", function () {
      var value = _this.props.value;
      _soyaComponents.ModalManager.show({
        title: "Change Operator",
        body: _react["default"].createElement(_OperatorModal["default"], {
          onCancel: _this.handleCancelModalManager,
          onSave: _this.handleChangeOperatorCondition,
          operator: value
        }),
        footer: " "
      });
    });
    (0, _defineProperty2["default"])(_this, "handleChangeOperatorCondition", function (operator) {
      if (operator === "And" || operator === "Or") {
        _this.changeAndOrCondition(operator);
      } else {
        _this.changeNotCondition();
      }
      _soyaComponents.ModalManager.dismiss();
    });
    (0, _defineProperty2["default"])(_this, "handleCancelModalManager", function () {
      _soyaComponents.ModalManager.dismiss();
    });
    (0, _defineProperty2["default"])(_this, "handleNotCondition", function () {
      _this.handleOperatorFromNotCondition("Not");
    });
    (0, _defineProperty2["default"])(_this, "handleOrCondition", function () {
      _this.handleOperatorFromNotCondition("Or");
    });
    (0, _defineProperty2["default"])(_this, "handleAndCondition", function () {
      _this.handleOperatorFromNotCondition("And");
    });
    (0, _defineProperty2["default"])(_this, "handleOperatorFromNotCondition", function (operator) {
      var _this$props = _this.props,
        actions = _this$props.actions,
        componentIndex = _this$props.componentIndex,
        index = _this$props.index,
        condition = _this$props.condition;
      var newLeaf = operator === "Not" ? [condition] : [condition, {}];
      var newCondition = {
        root: operator,
        leaf: newLeaf
      };
      actions.editCondition(componentIndex, index, newCondition);
    });
    (0, _defineProperty2["default"])(_this, "handleRemoveCondition", function () {
      var value = _this.props.value;
      var isBinaryOperator = value && (value.toUpperCase() === "AND" || value.toUpperCase() === "OR");
      var body = isBinaryOperator ? "Are you sure you want to delete this operator? The item directly above it will be removed and the rest of the conditions will be kept." : "Are you sure you want to delete this operator? Its branch will be kept.";
      _soyaComponents.ModalManager.show({
        title: "Delete Operator",
        type: "default",
        body: body,
        footer: _react["default"].createElement("div", null, _react["default"].createElement(_soyaComponents.Button, {
          variant: "link",
          onClick: function onClick() {
            return _soyaComponents.ModalManager.dismiss();
          }
        }, "Cancel"), _react["default"].createElement(_soyaComponents.Button, {
          variant: "blue",
          onClick: function onClick() {
            return _this.handleConfirmRemove();
          }
        }, "Proceed"))
      });
    });
    (0, _defineProperty2["default"])(_this, "handleConfirmRemove", function () {
      var _this$props2 = _this.props,
        componentIndex = _this$props2.componentIndex,
        index = _this$props2.index,
        actions = _this$props2.actions;
      actions.removeOperator(componentIndex, index);
      _soyaComponents.ModalManager.dismiss();
    });
    return _this;
  }
  (0, _inherits2["default"])(Operator, _React$Component);
  return (0, _createClass2["default"])(Operator, [{
    key: "changeAndOrCondition",
    value: function changeAndOrCondition(operator) {
      var _this$props3 = this.props,
        actions = _this$props3.actions,
        componentIndex = _this$props3.componentIndex,
        index = _this$props3.index,
        condition = _this$props3.condition;
      var newLeaf = condition.leaf.length > 1 ? condition.leaf : [condition.leaf[0], {}];
      var newCondition = {
        root: operator,
        leaf: newLeaf
      };
      actions.editCondition(componentIndex, index, newCondition);
    }
  }, {
    key: "changeNotCondition",
    value: function changeNotCondition() {
      var _this$props4 = this.props,
        actions = _this$props4.actions,
        componentIndex = _this$props4.componentIndex,
        index = _this$props4.index,
        condition = _this$props4.condition;
      var newCondition = {
        root: "Not",
        leaf: [condition.leaf[0]]
      };
      actions.editCondition(componentIndex, index, newCondition);
    }
  }, {
    key: "addOpFromNotCondition",
    value: function addOpFromNotCondition(e, operator) {
      var _this$props5 = this.props,
        actions = _this$props5.actions,
        componentIndex = _this$props5.componentIndex,
        index = _this$props5.index,
        condition = _this$props5.condition;
      var newLeaf = operator === "Not" ? [condition] : [condition, {}];
      var newCondition = {
        root: operator,
        leaf: newLeaf
      };
      actions.editCondition(componentIndex, index, newCondition);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props6 = this.props,
        value = _this$props6.value,
        margin = _this$props6.margin;
      return _react["default"].createElement("div", {
        className: style.conditionRow,
        style: {
          marginLeft: margin
        }
      }, _react["default"].createElement(_StaticLinkText["default"], {
        text: value,
        onClick: this.handleShowModalChangeOperator,
        color: "#79d1aa"
      }), _react["default"].createElement("div", {
        className: style.operatorGroup
      }, value === "Not" ? _react["default"].createElement("div", {
        style: {
          display: "inline"
        }
      }, _react["default"].createElement(_StaticLinkText["default"], {
        text: "NOT",
        onClick: function onClick(e) {
          return _this2.addOpFromNotCondition(e, "Not");
        }
      }), _react["default"].createElement(_StaticLinkText["default"], {
        text: "OR",
        onClick: function onClick(e) {
          return _this2.addOpFromNotCondition(e, "Or");
        }
      }), _react["default"].createElement(_StaticLinkText["default"], {
        text: "AND",
        onClick: function onClick(e) {
          return _this2.addOpFromNotCondition(e, "And");
        }
      })) : null, _react["default"].createElement(_StaticLinkText["default"], {
        text: "Remove",
        color: "#F44336",
        onClick: this.handleRemoveCondition
      })));
    }
  }]);
}(_react["default"].Component);
Operator.propTypes = {
  componentIndex: _propTypes["default"].number.isRequired,
  index: _propTypes["default"].number.isRequired,
  margin: _propTypes["default"].number.isRequired,
  value: _propTypes["default"].string.isRequired,
  actions: _propTypes["default"].object.isRequired,
  condition: _propTypes["default"].object.isRequired
};
var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    ruleStructures: _CommonRuleRedux.commonRulesSelector.getRuleStructures(state)
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: (0, _redux.bindActionCreators)(_CommonRuleRedux.commonRulesMapDisToProps, dispatch)
  };
};
var _default = exports["default"] = (0, _redux.compose)((0, _applyReducers["default"])(_CommonRuleRedux.commonRulesReducers), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps))(Operator);
//# sourceMappingURL=Operator.js.map