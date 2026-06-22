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
var _soyaComponents = require("@traveloka/soya-components");
var _ConditionLeftModal = _interopRequireDefault(require("./ConditionLeftModal"));
var _ConditionModal = _interopRequireDefault(require("./ConditionModal"));
var _ConditionRightModal = _interopRequireDefault(require("./ConditionRightModal"));
var _StaticLinkText = _interopRequireDefault(require("./StaticLinkText/StaticLinkText"));
var style = _interopRequireWildcard(require("./CommonRule.styles"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ConditionRow = function (_React$Component) {
  function ConditionRow(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, ConditionRow);
    _this = _callSuper(this, ConditionRow, [props]);
    (0, _defineProperty2["default"])(_this, "handleShowLeftModal", function () {
      var condition = _this.props.condition;
      if (condition.root) {
        _soyaComponents.ModalManager.show({
          title: "Change Left Expression",
          body: _react["default"].createElement(_ConditionLeftModal["default"], {
            onCancel: _this.handleCancelModalManager,
            onSave: _this.handleChangeLeftCondition,
            operator: condition.root,
            existingValue: _this.getLeftExistingValue()
          }),
          footer: " "
        });
      } else {
        _soyaComponents.NotificationManager.showError({
          message: "Choose operator first",
          size: "md"
        });
      }
    });
    (0, _defineProperty2["default"])(_this, "handleChangeLeftCondition", function (newLeftValue) {
      var _this$props = _this.props,
        componentIndex = _this$props.componentIndex,
        index = _this$props.index,
        actions = _this$props.actions;
      if ((0, _CommonRuleFunctions.isLeftConditionValid)(newLeftValue)) {
        var left = {};
        for (var i in newLeftValue) {
          left[i] = newLeftValue[i];
        }
        actions.editLeftCondition(componentIndex, index, left);
        _soyaComponents.ModalManager.dismiss();
      } else {
        _this.notification.showError("Input is not valid, please re-check");
      }
    });
    (0, _defineProperty2["default"])(_this, "handleChangeRightCondition", function (newRightValue) {
      var _this$props2 = _this.props,
        componentIndex = _this$props2.componentIndex,
        index = _this$props2.index,
        actions = _this$props2.actions;
      if ((0, _CommonRuleFunctions.isValueValid)(newRightValue.root, newRightValue.value)) {
        var right = {
          root: newRightValue.root,
          value: (0, _CommonRuleFunctions.getRealValueByType)(newRightValue.root, newRightValue.value)
        };
        actions.editRightCondition(componentIndex, index, right);
        _soyaComponents.ModalManager.dismiss();
      } else {
        _this.notification.showError("Input is not valid, please re-check");
      }
    });
    (0, _defineProperty2["default"])(_this, "handleShowOperatorModal", function () {
      var existingValue = _this.getOperatorExistingValue();
      _soyaComponents.ModalManager.show({
        title: "Change Operator",
        body: _react["default"].createElement(_ConditionModal["default"], {
          onCancel: _this.handleCancelModalManager,
          onSave: _this.handleChangeOperatorCondition,
          existingValue: existingValue
        }),
        footer: " "
      });
    });
    (0, _defineProperty2["default"])(_this, "handleShowRightModal", function () {
      var condition = _this.props.condition;
      if (condition.leaf && condition.leaf.length > 0 && condition.leaf[0].root !== null) {
        _soyaComponents.ModalManager.show({
          title: "Change Right Expression",
          body: _react["default"].createElement(_ConditionRightModal["default"], {
            onCancel: _this.handleCancelModalManager,
            onSave: _this.handleChangeRightCondition,
            leftValue: condition.leaf[0].root,
            existingValue: _this.getRightExistingValue()
          }),
          footer: " "
        });
      } else {
        _soyaComponents.NotificationManager.showError({
          message: "Choose left expression first",
          size: "md"
        });
      }
    });
    (0, _defineProperty2["default"])(_this, "handleNotCondition", function () {
      var _this$props3 = _this.props,
        componentIndex = _this$props3.componentIndex,
        condition = _this$props3.condition,
        index = _this$props3.index,
        actions = _this$props3.actions;
      var newCondition = {
        root: "Not",
        leaf: [condition]
      };
      actions.editCondition(componentIndex, index, newCondition);
    });
    (0, _defineProperty2["default"])(_this, "handleChangeOperatorCondition", function (root) {
      var _this$props4 = _this.props,
        componentIndex = _this$props4.componentIndex,
        index = _this$props4.index,
        actions = _this$props4.actions;
      var condition = root;
      condition.leaf = [];
      actions.editCondition(componentIndex, index, condition);
      _soyaComponents.ModalManager.dismiss();
    });
    (0, _defineProperty2["default"])(_this, "handleAndCondition", function () {
      _this.handleAddOperatorCondition("And");
    });
    (0, _defineProperty2["default"])(_this, "handleOrCondition", function () {
      _this.handleAddOperatorCondition("Or");
    });
    (0, _defineProperty2["default"])(_this, "handleAddOperatorCondition", function (operator) {
      var _this$props5 = _this.props,
        componentIndex = _this$props5.componentIndex,
        condition = _this$props5.condition,
        index = _this$props5.index,
        actions = _this$props5.actions;
      var newCondition = {
        root: operator,
        leaf: [condition, {}]
      };
      actions.editCondition(componentIndex, index, newCondition);
    });
    (0, _defineProperty2["default"])(_this, "handleRemoveCondition", function () {
      var _this$props6 = _this.props,
        componentIndex = _this$props6.componentIndex,
        index = _this$props6.index,
        actions = _this$props6.actions;
      actions.removeCondition(componentIndex, index);
    });
    (0, _defineProperty2["default"])(_this, "handleCancelModalManager", function () {
      _soyaComponents.ModalManager.dismiss();
    });
    (0, _defineProperty2["default"])(_this, "displayCondition", function () {
      var condition = _this.props.condition;
      var leftValue = _this.getLeftConditionValue();
      var rightValue;
      if (condition.leaf && condition.leaf[1]) {
        if (condition.leaf[1].value) {
          rightValue = condition.leaf[1].value;
        } else {
          if (condition.leaf[1].date) {
            rightValue = condition.leaf[1].date;
          } else {
            rightValue = null;
          }
        }
      } else {
        rightValue = null;
      }
      return _react["default"].createElement("div", null, condition.root && _react["default"].createElement(_StaticLinkText["default"], {
        color: leftValue ? null : "#c1c1c1",
        text: leftValue ? leftValue : "Select Expression",
        onClick: _this.handleShowLeftModal
      }), _react["default"].createElement(_StaticLinkText["default"], {
        color: condition.root ? "#19bc80" : "#c1c1c1",
        text: condition.root ? condition.root : "Select Operator",
        onClick: _this.handleShowOperatorModal
      }), _this.getTotalFieldsByOperator(condition.root) > 1 ? _react["default"].createElement(_StaticLinkText["default"], {
        color: rightValue === null ? "#c1c1c1" : null,
        text: rightValue === null ? "Select Expression" : rightValue.toString(),
        onClick: _this.handleShowRightModal
      }) : null, Object.keys(condition).length > 0 ? _react["default"].createElement("div", {
        className: style.operatorGroup
      }, _react["default"].createElement(_StaticLinkText["default"], {
        text: "NOT",
        onClick: _this.handleNotCondition
      }), _react["default"].createElement(_StaticLinkText["default"], {
        text: "OR",
        onClick: _this.handleOrCondition
      }), _react["default"].createElement(_StaticLinkText["default"], {
        text: "AND",
        onClick: _this.handleAndCondition
      }), _react["default"].createElement(_StaticLinkText["default"], {
        text: "Remove",
        color: "#F44336",
        onClick: _this.handleRemoveCondition
      })) : null);
    });
    return _this;
  }
  (0, _inherits2["default"])(ConditionRow, _React$Component);
  return (0, _createClass2["default"])(ConditionRow, [{
    key: "getLeftConditionValue",
    value: function getLeftConditionValue() {
      var _this$props7 = this.props,
        condition = _this$props7.condition,
        ruleStructures = _this$props7.ruleStructures;
      var structureFormat = JSON.parse(ruleStructures.formatterStructure);
      var leftValue = "";
      if (condition.leaf && condition.leaf.length > 0) {
        var format = structureFormat[condition.leaf[0].root];
        if (Object.keys(condition.leaf[0]).length > 1) {
          var fields = Object.values(format.fields);
          for (var i in format.displayFormat) {
            if (format.displayFormat[i].indexOf("{") !== -1 && format.displayFormat[i].indexOf("}") !== -1) {
              var fieldIdx = parseInt(format.displayFormat[i].replace(/{|}/g, ""), 10);
              if (!isNaN(fieldIdx) && fieldIdx >= 0) {
                leftValue = leftValue.concat(condition.leaf[0][fields[fieldIdx].id]);
              }
            } else {
              leftValue = leftValue.concat(format.displayFormat[i]);
            }
          }
        } else {
          leftValue = format ? format.label : condition.leaf[0].root;
        }
      }
      return leftValue;
    }
  }, {
    key: "getTotalFieldsByOperator",
    value: function getTotalFieldsByOperator(operator) {
      var ruleStructures = this.props.ruleStructures;
      var expressionStructure = JSON.parse(ruleStructures.expressionStructure);
      if (expressionStructure[operator]) {
        return expressionStructure[operator].input.length;
      }
      return 1;
    }
  }, {
    key: "getLeftExistingValue",
    value: function getLeftExistingValue() {
      var condition = this.props.condition;
      var existingValue = {};
      if (condition.leaf && condition.leaf.length > 0) {
        if (condition.leaf[0].root) {
          existingValue.root = condition.leaf[0].root;
        }
        for (var i in condition.leaf[0]) {
          if (i !== "root") {
            existingValue[i] = condition.leaf[0][i];
          }
        }
        return existingValue;
      }
      return null;
    }
  }, {
    key: "getRightExistingValue",
    value: function getRightExistingValue() {
      var condition = this.props.condition;
      if (condition.leaf && condition.leaf.length > 0 && condition.leaf[0].root !== null) {
        if (condition.leaf && condition.leaf.length === 2) {
          if (condition.leaf[1]) {
            var rightValue = {
              root: condition.leaf[1].root
            };
            if (condition.leaf[1].value) {
              rightValue.value = condition.leaf[1].value;
            } else {
              for (var i in condition.leaf[1]) {
                if (i !== "root") {
                  rightValue[i] = condition.leaf[1][i];
                }
              }
            }
            return rightValue;
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  }, {
    key: "getOperatorExistingValue",
    value: function getOperatorExistingValue() {
      var condition = this.props.condition;
      return condition.root;
    }
  }, {
    key: "render",
    value: function render() {
      var ruleStructures = this.props.ruleStructures;
      if (!ruleStructures) return _react["default"].createElement("div", null);
      return _react["default"].createElement("div", {
        className: style.conditionRow
      }, this.displayCondition());
    }
  }]);
}(_react["default"].Component);
ConditionRow.propTypes = {
  condition: _propTypes["default"].object.isRequired,
  componentIndex: _propTypes["default"].number.isRequired,
  index: _propTypes["default"].number.isRequired,
  ruleStructures: _propTypes["default"].string.isRequired,
  actions: _propTypes["default"].object.isRequired
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
var _default = exports["default"] = (0, _redux.compose)((0, _applyReducers["default"])(_CommonRuleRedux.commonRulesReducers), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps))(ConditionRow);
//# sourceMappingURL=ConditionRow.js.map