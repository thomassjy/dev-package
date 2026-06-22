"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _CommonRuleRedux = require("./CommonRuleRedux");
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _css = require("@emotion/css");
var _applyReducers = _interopRequireDefault(require("@traveloka/soya-components/lib/legacy/applyReducers"));
var _Action = _interopRequireDefault(require("./Action"));
var _ActionModal = _interopRequireDefault(require("./ActionModal"));
var _soyaComponents = require("@traveloka/soya-components");
var _CommonRuleModal = _interopRequireDefault(require("./CommonRuleModal"));
var _Condition = _interopRequireDefault(require("./Condition"));
var _ConditionModal = _interopRequireDefault(require("./ConditionModal"));
var _ToggleTooltip = _interopRequireDefault(require("./ToggleTooltip/ToggleTooltip"));
var style = _interopRequireWildcard(require("./CommonRule.styles"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var CommonRuleComponent = function (_React$Component) {
  function CommonRuleComponent(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, CommonRuleComponent);
    _this = _callSuper(this, CommonRuleComponent, [props]);
    (0, _defineProperty2["default"])(_this, "handleShowHideBody", function () {
      var body = _this.state.body;
      _this.setState({
        body: !body
      });
    });
    (0, _defineProperty2["default"])(_this, "showDuplicateModal", function () {
      var rule = _this.props.rule;
      _soyaComponents.ModalManager.show({
        title: "Duplicate Rule",
        body: _react["default"].createElement(_CommonRuleModal["default"], {
          onCancel: _this.handleCancelModalManager,
          onSave: _this.handleDuplicateRule,
          rule: rule,
          mode: "duplicate"
        }),
        footer: " "
      });
    });
    (0, _defineProperty2["default"])(_this, "showEditModal", function () {
      var rule = _this.props.rule;
      _soyaComponents.ModalManager.show({
        title: "Edit Rule",
        body: _react["default"].createElement(_CommonRuleModal["default"], {
          onCancel: _this.handleCancelModalManager,
          onSave: _this.handleEditRule,
          rule: rule,
          mode: "edit"
        }),
        footer: " "
      });
    });
    (0, _defineProperty2["default"])(_this, "confirmRemoveRule", function () {
      _soyaComponents.ModalManager.show({
        title: "Delete Confirmation",
        type: "default",
        body: "Are you sure you want to delete this rule?",
        footer: _react["default"].createElement("div", null, _react["default"].createElement(_soyaComponents.Button, {
          variant: "link",
          onClick: function onClick() {
            return _soyaComponents.ModalManager.dismiss();
          }
        }, "Cancel"), _react["default"].createElement(_soyaComponents.Button, {
          variant: "blue",
          onClick: function onClick() {
            return _this.handleRemoveRule();
          }
        }, "Proceed"))
      });
    });
    (0, _defineProperty2["default"])(_this, "handleCancelModalManager", function () {
      _soyaComponents.ModalManager.dismiss();
    });
    (0, _defineProperty2["default"])(_this, "handleEditRule", function (newRuleValue) {
      var _this$props = _this.props,
        index = _this$props.index,
        actions = _this$props.actions,
        rule = _this$props.rule;
      newRuleValue._id = rule._id;
      newRuleValue.numOrder = index;
      actions.editRule(index, newRuleValue);
      _soyaComponents.ModalManager.dismiss();
    });
    (0, _defineProperty2["default"])(_this, "handleDuplicateRule", function (value) {
      var _this$props2 = _this.props,
        actions = _this$props2.actions,
        rule = _this$props2.rule;
      var copiedRule = JSON.parse(JSON.stringify(rule));
      var newRule = _objectSpread(_objectSpread({}, value), {}, {
        conditions: copiedRule.conditions,
        actions: copiedRule.actions
      });
      actions.addRule(newRule);
      _soyaComponents.ModalManager.dismiss();
    });
    (0, _defineProperty2["default"])(_this, "handleRemoveRule", function () {
      var _this$props3 = _this.props,
        index = _this$props3.index,
        actions = _this$props3.actions;
      actions.removeRule(index);
      _soyaComponents.ModalManager.dismiss();
    });
    (0, _defineProperty2["default"])(_this, "handleMoveUp", function (e) {
      e.stopPropagation();
      var _this$props4 = _this.props,
        index = _this$props4.index,
        actions = _this$props4.actions;
      if (index <= 0) return;
      actions.moveRule(index, index - 1);
    });
    (0, _defineProperty2["default"])(_this, "handleMoveDown", function (e) {
      e.stopPropagation();
      var _this$props5 = _this.props,
        index = _this$props5.index,
        lastIndex = _this$props5.lastIndex,
        actions = _this$props5.actions;
      if (index >= lastIndex - 1) return;
      actions.moveRule(index, index + 1);
    });
    (0, _defineProperty2["default"])(_this, "handleClickAddCondition", function () {
      _soyaComponents.ModalManager.show({
        title: "Add New Condition",
        body: _react["default"].createElement(_ConditionModal["default"], {
          onCancel: _this.handleCancelModalManager,
          onSave: _this.handleAddCondition
        }),
        footer: " "
      });
    });
    (0, _defineProperty2["default"])(_this, "handleAddCondition", function (condition) {
      var _this$props6 = _this.props,
        index = _this$props6.index,
        actions = _this$props6.actions;
      condition.leaf = [];
      actions.addCondition(index, condition);
      _soyaComponents.ModalManager.dismiss();
    });
    (0, _defineProperty2["default"])(_this, "handleAddAction", function (action) {
      var _this$props7 = _this.props,
        index = _this$props7.index,
        actions = _this$props7.actions;
      var isValid = true;
      for (var i in action) {
        if (!action[i]) {
          isValid = false;
          break;
        }
      }
      if (isValid) {
        actions.addAction(index, action);
        _soyaComponents.ModalManager.dismiss();
      } else {
        _soyaComponents.NotificationManager.showError("Input is not valid, please re-check");
      }
    });
    (0, _defineProperty2["default"])(_this, "handleClickAddAction", function () {
      _soyaComponents.ModalManager.show({
        title: "Add New Action",
        body: _react["default"].createElement(_ActionModal["default"], {
          onCancel: _this.handleCancelModalManager,
          onSave: _this.handleAddAction,
          existingValue: null
        }),
        footer: " "
      });
    });
    _this.state = {
      body: _this.props.show
    };
    return _this;
  }
  (0, _inherits2["default"])(CommonRuleComponent, _React$Component);
  return (0, _createClass2["default"])(CommonRuleComponent, [{
    key: "generateItemAction",
    value: function generateItemAction(actions) {
      var cardActions = [];
      for (var i = 0; i < actions.length; i++) {
        var cardAction = actions[i];
        var actionProps = {};
        var link = null;
        if (cardAction.action) {
          actionProps.onClick = this.runAction.bind(this, cardAction.action);
          link = _react["default"].createElement("a", (0, _extends2["default"])({
            href: "#",
            key: i
          }, actionProps, cardAction.props), cardAction.label);
        }
        cardActions.push(link);
      }
      return cardActions;
    }
  }, {
    key: "runAction",
    value: function runAction(action, e) {
      e.preventDefault();
      e.stopPropagation();
      action();
    }
  }, {
    key: "getRuleConditions",
    value: function getRuleConditions() {
      var _this$props8 = this.props,
        conditions = _this$props8.rule.conditions,
        index = _this$props8.index;
      var ruleConditions = [];
      for (var i in conditions) {
        ruleConditions.push(_react["default"].createElement(_Condition["default"], {
          key: i,
          condition: conditions[i],
          componentIndex: index,
          index: [Number(i)]
        }));
      }
      return ruleConditions;
    }
  }, {
    key: "getRuleActions",
    value: function getRuleActions() {
      var _this$props9 = this.props,
        actions = _this$props9.rule.actions,
        index = _this$props9.index;
      var ruleActions = [];
      for (var i in actions) {
        ruleActions.push(_react["default"].createElement(_Action["default"], {
          action: actions[i],
          componentIndex: Number(index),
          index: Number(i),
          key: i
        }));
      }
      return ruleActions;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.show !== this.props.show) {
        this.setState({
          body: this.props.show
        });
      }
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _this$props0 = this.props,
        rule = _this$props0.rule,
        show = _this$props0.show,
        isDragging = _this$props0.isDragging,
        index = _this$props0.index,
        lastIndex = _this$props0.lastIndex;
      var body = this.state.body;
      return nextProps.rule !== rule || nextProps.show !== show || nextProps.isDragging !== isDragging || nextProps.index !== index || nextProps.lastIndex !== lastIndex || nextState.body !== body;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props1 = this.props,
        rule = _this$props1.rule,
        isDragging = _this$props1.isDragging,
        index = _this$props1.index,
        lastIndex = _this$props1.lastIndex;
      var isFirst = index <= 0;
      var isLast = index >= lastIndex - 1;
      var actions = [{
        action: this.showDuplicateModal,
        label: "Duplicate",
        style: {
          width: "1%"
        },
        component: _soyaComponents.Button,
        props: {
          size: _soyaComponents.BUTTON_SIZE.SMALL,
          variant: _soyaComponents.BUTTON_VARIANT.LINK
        }
      }, {
        action: this.showEditModal,
        label: "Edit",
        style: {
          width: "1%"
        },
        component: _soyaComponents.Button,
        props: {
          size: _soyaComponents.BUTTON_SIZE.SMALL,
          variant: _soyaComponents.BUTTON_VARIANT.LINK
        }
      }, {
        action: this.confirmRemoveRule,
        label: "Delete",
        style: {
          width: "1%"
        },
        component: _soyaComponents.Button,
        props: {
          size: _soyaComponents.BUTTON_SIZE.SMALL,
          variant: _soyaComponents.BUTTON_VARIANT.LINK
        }
      }];
      var condition = this.getRuleConditions();
      var action = this.getRuleActions();
      return _react["default"].createElement("div", {
        className: (0, _css.cx)(style.rule, (0, _defineProperty2["default"])({}, style.dragging, isDragging)),
        ref: this.attachDropTarget
      }, _react["default"].createElement("div", {
        className: (0, _css.cx)(style.ruleBox, {
          expand: this.state.body
        })
      }, _react["default"].createElement("div", {
        className: (0, _css.cx)(style.head, {
          enabled: rule.enabled
        }),
        onClick: this.handleShowHideBody
      }, _react["default"].createElement("div", {
        className: style.orderButton
      }, _react["default"].createElement("a", {
        className: (0, _css.cx)({
          disabled: isFirst
        }),
        onClick: isFirst ? undefined : this.handleMoveUp,
        title: "Move up"
      }, _react["default"].createElement(_soyaComponents.Icon, {
        icon: "chevron-up"
      })), _react["default"].createElement("a", {
        className: (0, _css.cx)({
          disabled: isLast
        }),
        onClick: isLast ? undefined : this.handleMoveDown,
        title: "Move down"
      }, _react["default"].createElement(_soyaComponents.Icon, {
        icon: "chevron-down"
      }))), _react["default"].createElement("div", {
        className: style.menu
      }, _react["default"].createElement(_ToggleTooltip["default"], {
        theme: _ToggleTooltip["default"].THEME.WHITE
      }, this.generateItemAction(actions))), _react["default"].createElement("div", {
        className: style.header,
        ref: this.attachDragPreview
      }, _react["default"].createElement("p", {
        className: style.name
      }, rule.name), _react["default"].createElement("p", {
        className: style.priority
      }, "Priority :", " ", rule.priority))), _react["default"].createElement("div", {
        className: style.body
      }, rule.description && _react["default"].createElement("div", {
        className: style.description
      }, rule.description), _react["default"].createElement("div", {
        className: style.contentTitle
      }, _react["default"].createElement("span", {
        className: style.conditionTitle
      }, "If conditions below meet")), _react["default"].createElement("div", {
        className: style.content
      }, condition, _react["default"].createElement("div", null, rule && rule.conditions && rule.conditions.length === 0 ? _react["default"].createElement(_soyaComponents.Button, {
        variant: _soyaComponents.BUTTON_VARIANT.LINK,
        size: _soyaComponents.BUTTON_SIZE.SMALL,
        onClick: this.handleClickAddCondition
      }, "Add new condition") : null)), _react["default"].createElement("div", {
        className: style.contentTitle
      }, _react["default"].createElement("span", {
        className: style.conditionTitle
      }, "Do the following actions")), _react["default"].createElement("div", {
        className: style.content
      }, action, _react["default"].createElement(_soyaComponents.Button, {
        variant: _soyaComponents.BUTTON_VARIANT.LINK,
        size: _soyaComponents.BUTTON_SIZE.SMALL,
        onClick: this.handleClickAddAction
      }, "Add new action")))));
    }
  }]);
}(_react["default"].Component);
CommonRuleComponent.propTypes = {
  index: _propTypes["default"].number.isRequired,
  rule: _propTypes["default"].object,
  lastIndex: _propTypes["default"].number.isRequired,
  show: _propTypes["default"].bool.isRequired,
  actions: _propTypes["default"].object.isRequired,
  isDragging: _propTypes["default"].bool
};
var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    rule: _CommonRuleRedux.commonRulesSelector.getRule(state, ownProps.index)
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: (0, _redux.bindActionCreators)(_CommonRuleRedux.commonRulesMapDisToProps, dispatch)
  };
};
var _default = exports["default"] = (0, _redux.compose)((0, _applyReducers["default"])(_CommonRuleRedux.commonRulesReducers), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps))(CommonRuleComponent);
//# sourceMappingURL=CommonRuleComponent.js.map