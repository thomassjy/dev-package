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
var _redux = require("redux");
var _CommonRuleRedux = require("./CommonRuleRedux");
var _reactRedux = require("react-redux");
var _ValidationUtil = require("./ValidationUtil");
var _CommonRuleFunctions = require("./CommonRuleFunctions");
var _applyReducers = _interopRequireDefault(require("@traveloka/soya-components/lib/legacy/applyReducers"));
var _soyaComponents = require("@traveloka/soya-components");
var _CommonRuleComponent = _interopRequireDefault(require("./CommonRuleComponent"));
var _CommonRuleModal = _interopRequireDefault(require("./CommonRuleModal"));
var _CommonRuleService = _interopRequireDefault(require("./CommonRuleService"));
var _FloatButton = _interopRequireDefault(require("./FloatButton/FloatButton"));
var _ImportFileModal = _interopRequireDefault(require("./ImportFileModal"));
var _TextInput = _interopRequireDefault(require("./TextInput"));
var style = _interopRequireWildcard(require("./CommonRule.styles"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var CommonRuleContainer = function (_React$Component) {
  function CommonRuleContainer(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, CommonRuleContainer);
    _this = _callSuper(this, CommonRuleContainer, [props]);
    (0, _defineProperty2["default"])(_this, "handleSave", function () {
      _soyaComponents.ModalManager.show({
        title: "Input release note",
        body: _react["default"].createElement("div", null, _react["default"].createElement(_soyaComponents.Label, null, "Release Notes"), _react["default"].createElement(_TextInput["default"], {
          placeholder: "release notes here",
          name: "releaseNotes",
          onChange: _this.handleInputChange,
          validators: [_ValidationUtil.required],
          isTextArea: true
        })),
        footer: _react["default"].createElement("div", null, _react["default"].createElement(_soyaComponents.Button, {
          variant: "link",
          onClick: function onClick() {
            return _soyaComponents.ModalManager.dismiss();
          }
        }, "Cancel"), _react["default"].createElement(_soyaComponents.Button, {
          variant: "blue",
          onClick: function onClick() {
            return _this.handleSaveRule();
          }
        }, "Done!"))
      });
    });
    (0, _defineProperty2["default"])(_this, "handleSaveRule", function () {
      var releaseNotes = _this.state.releaseNotes;
      var _this$props = _this.props,
        ruleSetHeader = _this$props.ruleSetHeader,
        rules = _this$props.rules;
      if (releaseNotes) {
        _this.service.saveRuleSet({
          ruleSetHeader: ruleSetHeader,
          releaseNotes: releaseNotes,
          rules: rules
        }).then(function (_ref) {
          var data = _ref.data;
          if (data && data.data.status === "SUCCESS") {
            _soyaComponents.NotificationManager.showSuccess("Your changes has been successfully saved");
            _this.loadVersions(_this.props);
            _this.setState({
              currentVersion: parseInt(data.data.ruleSetId.version, 10)
            });
          } else {
            var message = data && data.data.message ? data.data.message : "";
            _soyaComponents.NotificationManager.showError("Error in saving data: " + message);
          }
        });
        _soyaComponents.ModalManager.dismiss();
      } else {
        _soyaComponents.NotificationManager.showError("Release notes must be filled!");
      }
    });
    (0, _defineProperty2["default"])(_this, "handleInputChange", function (name, value) {
      var stateObj = {};
      stateObj[name] = value;
      _this.setState(stateObj);
    });
    (0, _defineProperty2["default"])(_this, "handleShowNewRuleModal", function () {
      _soyaComponents.ModalManager.show({
        title: "Add New Rule",
        body: _react["default"].createElement(_CommonRuleModal["default"], {
          onCancel: _this.handleCancelModalManager,
          onSave: _this.handleAddNewRule,
          mode: "create"
        }),
        footer: " "
      });
    });
    (0, _defineProperty2["default"])(_this, "handleAddNewRule", function (newRule) {
      var addRule = _this.props.addRule;
      newRule.conditions = [];
      newRule.actions = [];
      addRule(newRule);
      _soyaComponents.ModalManager.dismiss();
    });
    (0, _defineProperty2["default"])(_this, "handleCancelModalManager", function () {
      _soyaComponents.ModalManager.dismiss();
    });
    (0, _defineProperty2["default"])(_this, "handleVersionChange", function (value) {
      if (_this.state.currentVersion !== value) {
        (0, _CommonRuleRedux.fetchRuleSet)(_this.service, _this.props, value);
        _this.setState({
          currentVersion: value
        });
      }
    });
    (0, _defineProperty2["default"])(_this, "handleExportRuleSet", function () {
      _this.service.exportRuleSet({
        ruleSetHeader: _this.props.ruleSetHeader,
        version: _this.state.currentVersion
      }).then(function (_ref2) {
        var data = _ref2.data;
        if (data.data && data.data.exportedData) {
          var bytes = data.data.exportedData.bytes;
          var fileName = data.data.exportedData.fileName + "." + data.data.exportedData.fileType.toLowerCase();
          (0, _CommonRuleFunctions.download)(fileName, bytes);
        }
      });
    });
    (0, _defineProperty2["default"])(_this, "handleImportRuleSet", function () {
      _soyaComponents.ModalManager.show({
        title: "Import Rule Set",
        body: _react["default"].createElement(_ImportFileModal["default"], {
          onSave: _this.handleSubmitImport,
          onCancel: _this.handleCancelModalManager
        }),
        footer: " "
      });
    });
    (0, _defineProperty2["default"])(_this, "handleSubmitImport", function (file, releaseNotes) {
      _this.service.importRuleSet({
        ruleSetHeader: _this.props.ruleSetHeader,
        releaseNotes: releaseNotes
      }, file).then(function (_ref3) {
        var data = _ref3.data;
        if (data && data.data.status === "SUCCESS") {
          _soyaComponents.NotificationManager.showSuccess("Rules has been successfully imported");
          _this.loadVersions(_this.props);
          _this.setState({
            currentVersion: parseInt(data.data.ruleSetId.version, 10)
          });
          (0, _CommonRuleRedux.fetchRuleSet)(_this.service, _this.props, data.data.ruleSetId.version);
        } else {
          var message = data && data.data.message ? data.data.message : "";
          _soyaComponents.NotificationManager.showError("Error in importing rules: " + message);
        }
      });
      _soyaComponents.ModalManager.dismiss();
    });
    (0, _defineProperty2["default"])(_this, "collapseAll", function () {
      _this.setState({
        show: false
      });
    });
    (0, _defineProperty2["default"])(_this, "showAll", function () {
      _this.setState({
        show: true
      });
    });
    (0, _defineProperty2["default"])(_this, "toTop", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
    (0, _defineProperty2["default"])(_this, "toBottom", function () {
      _this.containerEnd.scrollIntoView({
        behavior: "smooth"
      });
    });
    (0, _defineProperty2["default"])(_this, "renderCommonRuleComponent", function () {
      var ruleLength = _this.props.ruleLength;
      var ruleComponents = [];
      for (var i = 0; i < ruleLength; i++) {
        ruleComponents.push(_react["default"].createElement(_CommonRuleComponent["default"], {
          key: i,
          index: i,
          lastIndex: ruleLength,
          show: _this.state.show,
          isDragging: false
        }));
      }
      return ruleComponents;
    });
    var Service = props.CustomRuleService || _CommonRuleService["default"];
    _this.state = {
      show: true,
      releaseNotes: "",
      versions: [],
      currentVersion: -1,
      loading: true
    };
    _this.service = new Service();
    return _this;
  }
  (0, _inherits2["default"])(CommonRuleContainer, _React$Component);
  return (0, _createClass2["default"])(CommonRuleContainer, [{
    key: "loadData",
    value: function loadData(props) {
      var _this2 = this;
      (0, _CommonRuleRedux.fetchData)(this.service, props, this.state.currentVersion).then(function () {
        _this2.setState({
          loading: false
        });
      });
    }
  }, {
    key: "loadVersions",
    value: function loadVersions(props) {
      var _this3 = this;
      this.service.getAllVersions({
        ruleSetHeader: props.ruleSetHeader
      }).then(function (_ref4) {
        var data = _ref4.data;
        if (data.data.versions.length !== 0) {
          _this3.setState({
            versions: _this3.convertVersionFromStrToInt(data.data.versions)
          });
        }
      });
    }
  }, {
    key: "convertVersionFromStrToInt",
    value: function convertVersionFromStrToInt(versions) {
      var result = [];
      for (var version in versions) {
        var convertedVersion = versions[version];
        convertedVersion.version = parseInt(convertedVersion.version, 10);
        result.push(convertedVersion);
      }
      return result;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData(this.props);
      this.loadVersions(this.props);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      var _this$props2 = this.props,
        ruleLength = _this$props2.ruleLength,
        ruleSetHeader = _this$props2.ruleSetHeader;
      var _this$state = this.state,
        currentVersion = _this$state.currentVersion,
        loading = _this$state.loading,
        versions = _this$state.versions;
      var items = [];
      var versionInfo = "";
      var latestVersion = versions.length > 0 ? -1 : "";
      for (var i in versions) {
        if (latestVersion < versions[i].version) {
          latestVersion = versions[i].version;
        }
        if (currentVersion === -1 && versions[i].version === latestVersion || currentVersion !== -1 && currentVersion === versions[i].version) {
          versionInfo = _react["default"].createElement("div", null, _react["default"].createElement("div", null, "Created By: ", versions[i].createdBy), _react["default"].createElement("div", null, "Created At: ", versions[i].createdAt), _react["default"].createElement("div", null, "Release Notes: ", versions[i].releaseNote));
        }
        items.push({
          label: "Version: " + versions[i].version,
          value: versions[i].version
        });
      }
      var defaultVersion = currentVersion === -1 ? latestVersion : currentVersion;
      if (loading) return _react["default"].createElement(_soyaComponents.Loader, null);
      var children = [{
        text: "Collapse All",
        icon: "fullscreen-exit",
        handleClick: this.collapseAll
      }, {
        text: "Show All",
        icon: "zoom-out-map",
        handleClick: this.showAll
      }, {
        text: "To Top",
        icon: "chevron-double-up",
        handleClick: this.toTop
      }, {
        text: "To Bottom",
        icon: "chevron-double-down",
        handleClick: this.toBottom
      }];
      return _react["default"].createElement("div", null, _react["default"].createElement(_soyaComponents.Row, {
        marginBottom: true
      }, _react["default"].createElement(_soyaComponents.Column, {
        size: 12
      }, _react["default"].createElement(_soyaComponents.Text, {
        tag: "h1"
      }, (0, _CommonRuleFunctions.toTitleCase)(ruleSetHeader), _react["default"].createElement("div", {
        className: "topbar button",
        style: {
          "float": "right"
        }
      }, _react["default"].createElement(_soyaComponents.DropDown, {
        size: "md"
      }, _react["default"].createElement(_soyaComponents.DropDownToggle, null, "Available Actions"), _react["default"].createElement(_soyaComponents.DropDownMenu, {
        isRight: true
      }, _react["default"].createElement(_soyaComponents.DropDownItem, {
        className: style.dropdownItem,
        onClick: this.handleSave
      }, "Save Ruleset"), _react["default"].createElement(_soyaComponents.DropDownItem, {
        className: style.dropdownItem,
        onClick: this.handleShowNewRuleModal
      }, "Add New Rule"), _react["default"].createElement(_soyaComponents.DropDownItem, {
        className: style.dropdownItem,
        onClick: this.handleImportRuleSet
      }, "Import Ruleset"), _react["default"].createElement(_soyaComponents.DropDownItem, {
        className: style.dropdownItem,
        onClick: this.handleExportRuleSet
      }, "Export Ruleset"))))), _react["default"].createElement(_soyaComponents.Divider, null), _react["default"].createElement(_soyaComponents.Label, null, "Selected Version"), _react["default"].createElement("div", {
        className: "versioning",
        style: {
          display: "flex"
        }
      }, _react["default"].createElement(_soyaComponents.Select, {
        options: items,
        defaultValue: defaultVersion,
        onChange: this.handleVersionChange,
        width: "15%"
      }), _react["default"].createElement(_soyaComponents.Icon, {
        id: "version-details",
        icon: "info-circle-outline",
        style: {
          marginTop: "5px",
          marginLeft: "5px"
        }
      }), _react["default"].createElement(_soyaComponents.Tooltip, {
        placement: _soyaComponents.TETHER_ATTACHMENTS.RIGHT,
        target: "#version-details",
        trigger: "hover"
      }, versionInfo)), _react["default"].createElement(_soyaComponents.Divider, null))), this.renderCommonRuleComponent(), _react["default"].createElement(_FloatButton["default"], {
        actions: children
      }), _react["default"].createElement("div", {
        style: {
          "float": "left",
          clear: "both"
        },
        ref: function ref(el) {
          _this4.containerEnd = el;
        }
      }));
    }
  }]);
}(_react["default"].Component);
CommonRuleContainer.propTypes = {
  ruleSetHeader: _propTypes["default"].string.isRequired,
  ruleLength: _propTypes["default"].number,
  CustomRuleService: _propTypes["default"].func
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    ruleLength: _CommonRuleRedux.commonRulesSelector.getRulesLength(state),
    rules: _CommonRuleRedux.commonRulesSelector.getRules(state)
  };
};
var _default = exports["default"] = (0, _redux.compose)((0, _applyReducers["default"])(_CommonRuleRedux.commonRulesReducers), (0, _reactRedux.connect)(mapStateToProps, _CommonRuleRedux.commonRulesMapDisToProps))(CommonRuleContainer);
//# sourceMappingURL=CommonRuleContainer.js.map