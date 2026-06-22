import _extends from "@babel/runtime/helpers/extends";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import PropTypes from "prop-types";
import React from "react";
import { commonRulesMapDisToProps, commonRulesReducers, commonRulesSelector } from "./CommonRuleRedux";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { cx } from "@emotion/css";
import applyReducers from "@traveloka/soya-components/lib/legacy/applyReducers";
import Action from "./Action";
import ActionModal from "./ActionModal";
import { Button, BUTTON_SIZE, BUTTON_VARIANT, Icon } from "@traveloka/soya-components";
import CommonRuleModal from "./CommonRuleModal";
import Condition from "./Condition";
import ConditionModal from "./ConditionModal";
import { ModalManager } from "@traveloka/soya-components";
import { NotificationManager } from "@traveloka/soya-components";
import ToggleTooltip from "./ToggleTooltip/ToggleTooltip";
import * as style from "./CommonRule.styles";
var CommonRuleComponent = function (_React$Component) {
  function CommonRuleComponent(props) {
    var _this;
    _classCallCheck(this, CommonRuleComponent);
    _this = _callSuper(this, CommonRuleComponent, [props]);
    _defineProperty(_this, "handleShowHideBody", function () {
      var body = _this.state.body;
      _this.setState({
        body: !body
      });
    });
    _defineProperty(_this, "showDuplicateModal", function () {
      var rule = _this.props.rule;
      ModalManager.show({
        title: "Duplicate Rule",
        body: React.createElement(CommonRuleModal, {
          onCancel: _this.handleCancelModalManager,
          onSave: _this.handleDuplicateRule,
          rule: rule,
          mode: "duplicate"
        }),
        footer: " "
      });
    });
    _defineProperty(_this, "showEditModal", function () {
      var rule = _this.props.rule;
      ModalManager.show({
        title: "Edit Rule",
        body: React.createElement(CommonRuleModal, {
          onCancel: _this.handleCancelModalManager,
          onSave: _this.handleEditRule,
          rule: rule,
          mode: "edit"
        }),
        footer: " "
      });
    });
    _defineProperty(_this, "confirmRemoveRule", function () {
      ModalManager.show({
        title: "Delete Confirmation",
        type: "default",
        body: "Are you sure you want to delete this rule?",
        footer: React.createElement("div", null, React.createElement(Button, {
          variant: "link",
          onClick: function onClick() {
            return ModalManager.dismiss();
          }
        }, "Cancel"), React.createElement(Button, {
          variant: "blue",
          onClick: function onClick() {
            return _this.handleRemoveRule();
          }
        }, "Proceed"))
      });
    });
    _defineProperty(_this, "handleCancelModalManager", function () {
      ModalManager.dismiss();
    });
    _defineProperty(_this, "handleEditRule", function (newRuleValue) {
      var _this$props = _this.props,
        index = _this$props.index,
        actions = _this$props.actions,
        rule = _this$props.rule;
      newRuleValue._id = rule._id;
      newRuleValue.numOrder = index;
      actions.editRule(index, newRuleValue);
      ModalManager.dismiss();
    });
    _defineProperty(_this, "handleDuplicateRule", function (value) {
      var _this$props2 = _this.props,
        actions = _this$props2.actions,
        rule = _this$props2.rule;
      var copiedRule = JSON.parse(JSON.stringify(rule));
      var newRule = _objectSpread(_objectSpread({}, value), {}, {
        conditions: copiedRule.conditions,
        actions: copiedRule.actions
      });
      actions.addRule(newRule);
      ModalManager.dismiss();
    });
    _defineProperty(_this, "handleRemoveRule", function () {
      var _this$props3 = _this.props,
        index = _this$props3.index,
        actions = _this$props3.actions;
      actions.removeRule(index);
      ModalManager.dismiss();
    });
    _defineProperty(_this, "handleMoveUp", function (e) {
      e.stopPropagation();
      var _this$props4 = _this.props,
        index = _this$props4.index,
        actions = _this$props4.actions;
      if (index <= 0) return;
      actions.moveRule(index, index - 1);
    });
    _defineProperty(_this, "handleMoveDown", function (e) {
      e.stopPropagation();
      var _this$props5 = _this.props,
        index = _this$props5.index,
        lastIndex = _this$props5.lastIndex,
        actions = _this$props5.actions;
      if (index >= lastIndex - 1) return;
      actions.moveRule(index, index + 1);
    });
    _defineProperty(_this, "handleClickAddCondition", function () {
      ModalManager.show({
        title: "Add New Condition",
        body: React.createElement(ConditionModal, {
          onCancel: _this.handleCancelModalManager,
          onSave: _this.handleAddCondition
        }),
        footer: " "
      });
    });
    _defineProperty(_this, "handleAddCondition", function (condition) {
      var _this$props6 = _this.props,
        index = _this$props6.index,
        actions = _this$props6.actions;
      condition.leaf = [];
      actions.addCondition(index, condition);
      ModalManager.dismiss();
    });
    _defineProperty(_this, "handleAddAction", function (action) {
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
        ModalManager.dismiss();
      } else {
        NotificationManager.showError("Input is not valid, please re-check");
      }
    });
    _defineProperty(_this, "handleClickAddAction", function () {
      ModalManager.show({
        title: "Add New Action",
        body: React.createElement(ActionModal, {
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
  _inherits(CommonRuleComponent, _React$Component);
  return _createClass(CommonRuleComponent, [{
    key: "generateItemAction",
    value: function generateItemAction(actions) {
      var cardActions = [];
      for (var i = 0; i < actions.length; i++) {
        var cardAction = actions[i];
        var actionProps = {};
        var link = null;
        if (cardAction.action) {
          actionProps.onClick = this.runAction.bind(this, cardAction.action);
          link = React.createElement("a", _extends({
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
        ruleConditions.push(React.createElement(Condition, {
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
        ruleActions.push(React.createElement(Action, {
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
        component: Button,
        props: {
          size: BUTTON_SIZE.SMALL,
          variant: BUTTON_VARIANT.LINK
        }
      }, {
        action: this.showEditModal,
        label: "Edit",
        style: {
          width: "1%"
        },
        component: Button,
        props: {
          size: BUTTON_SIZE.SMALL,
          variant: BUTTON_VARIANT.LINK
        }
      }, {
        action: this.confirmRemoveRule,
        label: "Delete",
        style: {
          width: "1%"
        },
        component: Button,
        props: {
          size: BUTTON_SIZE.SMALL,
          variant: BUTTON_VARIANT.LINK
        }
      }];
      var condition = this.getRuleConditions();
      var action = this.getRuleActions();
      return React.createElement("div", {
        className: cx(style.rule, _defineProperty({}, style.dragging, isDragging)),
        ref: this.attachDropTarget
      }, React.createElement("div", {
        className: cx(style.ruleBox, {
          expand: this.state.body
        })
      }, React.createElement("div", {
        className: cx(style.head, {
          enabled: rule.enabled
        }),
        onClick: this.handleShowHideBody
      }, React.createElement("div", {
        className: style.orderButton
      }, React.createElement("a", {
        className: cx({
          disabled: isFirst
        }),
        onClick: isFirst ? undefined : this.handleMoveUp,
        title: "Move up"
      }, React.createElement(Icon, {
        icon: "chevron-up"
      })), React.createElement("a", {
        className: cx({
          disabled: isLast
        }),
        onClick: isLast ? undefined : this.handleMoveDown,
        title: "Move down"
      }, React.createElement(Icon, {
        icon: "chevron-down"
      }))), React.createElement("div", {
        className: style.menu
      }, React.createElement(ToggleTooltip, {
        theme: ToggleTooltip.THEME.WHITE
      }, this.generateItemAction(actions))), React.createElement("div", {
        className: style.header,
        ref: this.attachDragPreview
      }, React.createElement("p", {
        className: style.name
      }, rule.name), React.createElement("p", {
        className: style.priority
      }, "Priority :", " ", rule.priority))), React.createElement("div", {
        className: style.body
      }, rule.description && React.createElement("div", {
        className: style.description
      }, rule.description), React.createElement("div", {
        className: style.contentTitle
      }, React.createElement("span", {
        className: style.conditionTitle
      }, "If conditions below meet")), React.createElement("div", {
        className: style.content
      }, condition, React.createElement("div", null, rule && rule.conditions && rule.conditions.length === 0 ? React.createElement(Button, {
        variant: BUTTON_VARIANT.LINK,
        size: BUTTON_SIZE.SMALL,
        onClick: this.handleClickAddCondition
      }, "Add new condition") : null)), React.createElement("div", {
        className: style.contentTitle
      }, React.createElement("span", {
        className: style.conditionTitle
      }, "Do the following actions")), React.createElement("div", {
        className: style.content
      }, action, React.createElement(Button, {
        variant: BUTTON_VARIANT.LINK,
        size: BUTTON_SIZE.SMALL,
        onClick: this.handleClickAddAction
      }, "Add new action")))));
    }
  }]);
}(React.Component);
CommonRuleComponent.propTypes = {
  index: PropTypes.number.isRequired,
  rule: PropTypes.object,
  lastIndex: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  isDragging: PropTypes.bool
};
var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {
    rule: commonRulesSelector.getRule(state, ownProps.index)
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch, ownProps) {
  return {
    actions: bindActionCreators(commonRulesMapDisToProps, dispatch)
  };
};
export default compose(applyReducers(commonRulesReducers), connect(mapStateToProps, mapDispatchToProps))(CommonRuleComponent);
//# sourceMappingURL=CommonRuleComponent.js.map