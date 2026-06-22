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
var _CommonRuleFunctions = require("./CommonRuleFunctions");
var _applyReducers = _interopRequireDefault(require("@traveloka/soya-components/lib/legacy/applyReducers"));
var _ActionModal = _interopRequireDefault(require("./ActionModal"));
var _soyaComponents = require("@traveloka/soya-components");
var _StaticLinkText = _interopRequireDefault(require("./StaticLinkText/StaticLinkText"));
var style = _interopRequireWildcard(require("./CommonRule.styles"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var Action = function (_React$Component) {
  function Action(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, Action);
    _this = _callSuper(this, Action, [props]);
    (0, _defineProperty2["default"])(_this, "handleShowEditActionModal", function () {
      var action = _this.props.action;
      _soyaComponents.ModalManager.show({
        title: "Edit Action",
        body: _react["default"].createElement(_ActionModal["default"], {
          onCancel: _this.handleCancelModalManager,
          onSave: _this.handleEditAction,
          existingValue: action
        }),
        footer: " "
      });
    });
    (0, _defineProperty2["default"])(_this, "handleCancelModalManager", function () {
      _soyaComponents.ModalManager.dismiss();
    });
    (0, _defineProperty2["default"])(_this, "handleRemoveAction", function () {
      var _this$props = _this.props,
        componentIndex = _this$props.componentIndex,
        index = _this$props.index,
        actions = _this$props.actions;
      actions.removeAction(componentIndex, index);
    });
    (0, _defineProperty2["default"])(_this, "handleEditAction", function (actionValue) {
      var payload = {};
      var error = false;
      var _this$props2 = _this.props,
        componentIndex = _this$props2.componentIndex,
        index = _this$props2.index,
        actions = _this$props2.actions;
      var expressionStructure = JSON.parse(_this.props.ruleStructures.expressionStructure);
      for (var i in actionValue) {
        if (i !== "root") {
          for (var j in expressionStructure[actionValue.root].property) {
            if (i === expressionStructure[actionValue.root].property[j]) {
              if ((0, _CommonRuleFunctions.isValueValid)(expressionStructure[actionValue.root].input[j], actionValue[i])) {
                payload[i] = (0, _CommonRuleFunctions.getRealValueByType)(expressionStructure[actionValue.root].input[j], actionValue[i]);
              } else {
                error = true;
              }
            }
          }
        } else {
          payload.root = actionValue.root;
        }
      }
      if (!error) {
        actions.editAction(componentIndex, index, payload);
        _soyaComponents.ModalManager.dismiss();
      } else {
        _soyaComponents.NotificationManager.showError("Input is not valid, please re-check");
      }
    });
    return _this;
  }
  (0, _inherits2["default"])(Action, _React$Component);
  return (0, _createClass2["default"])(Action, [{
    key: "getActionText",
    value: function getActionText() {
      var _this$props3 = this.props,
        action = _this$props3.action,
        ruleStructures = _this$props3.ruleStructures;
      var formatterStructure = JSON.parse(ruleStructures.formatterStructure);
      var displayFormat = formatterStructure[action.root].displayFormat;
      var fields = Object.values(formatterStructure[action.root].fields);
      var actionParams = [];
      for (var i in displayFormat) {
        if (displayFormat[i].indexOf("{") !== -1 && displayFormat[i].indexOf("}") !== -1) {
          var fieldIdx = parseInt(displayFormat[i].replace(/{|}/g, ""), 10);
          if (!isNaN(fieldIdx) && fieldIdx >= 0) {
            actionParams.push(action[fields[fieldIdx].id]);
          }
        } else {
          actionParams.push(displayFormat[i]);
        }
      }
      return _react["default"].createElement("span", {
        className: style.actionValue
      }, actionParams.join(""));
    }
  }, {
    key: "render",
    value: function render() {
      var text = _react["default"].createElement("span", null, this.getActionText());
      return _react["default"].createElement("div", {
        className: style.actionContent
      }, _react["default"].createElement(_StaticLinkText["default"], {
        text: text,
        onClick: this.handleShowEditActionModal
      }), _react["default"].createElement("span", {
        className: style.actionButtons
      }, _react["default"].createElement(_StaticLinkText["default"], {
        text: "Remove",
        color: "#F44336",
        onClick: this.handleRemoveAction
      })));
    }
  }]);
}(_react["default"].Component);
Action.propTypes = {
  action: _propTypes["default"].object.isRequired,
  actions: _propTypes["default"].object.isRequired,
  componentIndex: _propTypes["default"].number.isRequired,
  index: _propTypes["default"].number.isRequired,
  ruleStructures: _propTypes["default"].string
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
var _default = exports["default"] = (0, _redux.compose)((0, _applyReducers["default"])(_CommonRuleRedux.commonRulesReducers), (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps))(Action);
//# sourceMappingURL=Action.js.map