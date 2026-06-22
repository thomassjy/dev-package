import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { commonRulesMapDisToProps, commonRulesReducers, commonRulesSelector, fetchData, fetchRuleSet } from "./CommonRuleRedux";
import { connect } from "react-redux";
import { required } from "./ValidationUtil";
import { toTitleCase, download } from "./CommonRuleFunctions";
import applyReducers from "@traveloka/soya-components/lib/legacy/applyReducers";
import { Button } from "@traveloka/soya-components";
import CommonRuleComponent from "./CommonRuleComponent";
import CommonRuleModal from "./CommonRuleModal";
import CommonRuleService from "./CommonRuleService";
import FloatButton from "./FloatButton/FloatButton";
import ImportFileModal from "./ImportFileModal";
import { NotificationManager, ModalManager, Icon, Label, Loader, Row, Select, Tooltip, TETHER_ATTACHMENTS, Text, DropDownItem, DropDownMenu, DropDownToggle, DropDown, Divider, Column } from "@traveloka/soya-components";
import TextInput from "./TextInput";
import * as style from "./CommonRule.styles";
var CommonRuleContainer = function (_React$Component) {
  function CommonRuleContainer(props) {
    var _this;
    _classCallCheck(this, CommonRuleContainer);
    _this = _callSuper(this, CommonRuleContainer, [props]);
    _defineProperty(_this, "handleSave", function () {
      ModalManager.show({
        title: "Input release note",
        body: React.createElement("div", null, React.createElement(Label, null, "Release Notes"), React.createElement(TextInput, {
          placeholder: "release notes here",
          name: "releaseNotes",
          onChange: _this.handleInputChange,
          validators: [required],
          isTextArea: true
        })),
        footer: React.createElement("div", null, React.createElement(Button, {
          variant: "link",
          onClick: function onClick() {
            return ModalManager.dismiss();
          }
        }, "Cancel"), React.createElement(Button, {
          variant: "blue",
          onClick: function onClick() {
            return _this.handleSaveRule();
          }
        }, "Done!"))
      });
    });
    _defineProperty(_this, "handleSaveRule", function () {
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
            NotificationManager.showSuccess("Your changes has been successfully saved");
            _this.loadVersions(_this.props);
            _this.setState({
              currentVersion: parseInt(data.data.ruleSetId.version, 10)
            });
          } else {
            var message = data && data.data.message ? data.data.message : "";
            NotificationManager.showError("Error in saving data: " + message);
          }
        });
        ModalManager.dismiss();
      } else {
        NotificationManager.showError("Release notes must be filled!");
      }
    });
    _defineProperty(_this, "handleInputChange", function (name, value) {
      var stateObj = {};
      stateObj[name] = value;
      _this.setState(stateObj);
    });
    _defineProperty(_this, "handleShowNewRuleModal", function () {
      ModalManager.show({
        title: "Add New Rule",
        body: React.createElement(CommonRuleModal, {
          onCancel: _this.handleCancelModalManager,
          onSave: _this.handleAddNewRule,
          mode: "create"
        }),
        footer: " "
      });
    });
    _defineProperty(_this, "handleAddNewRule", function (newRule) {
      var addRule = _this.props.addRule;
      newRule.conditions = [];
      newRule.actions = [];
      addRule(newRule);
      ModalManager.dismiss();
    });
    _defineProperty(_this, "handleCancelModalManager", function () {
      ModalManager.dismiss();
    });
    _defineProperty(_this, "handleVersionChange", function (value) {
      if (_this.state.currentVersion !== value) {
        fetchRuleSet(_this.service, _this.props, value);
        _this.setState({
          currentVersion: value
        });
      }
    });
    _defineProperty(_this, "handleExportRuleSet", function () {
      _this.service.exportRuleSet({
        ruleSetHeader: _this.props.ruleSetHeader,
        version: _this.state.currentVersion
      }).then(function (_ref2) {
        var data = _ref2.data;
        if (data.data && data.data.exportedData) {
          var bytes = data.data.exportedData.bytes;
          var fileName = data.data.exportedData.fileName + "." + data.data.exportedData.fileType.toLowerCase();
          download(fileName, bytes);
        }
      });
    });
    _defineProperty(_this, "handleImportRuleSet", function () {
      ModalManager.show({
        title: "Import Rule Set",
        body: React.createElement(ImportFileModal, {
          onSave: _this.handleSubmitImport,
          onCancel: _this.handleCancelModalManager
        }),
        footer: " "
      });
    });
    _defineProperty(_this, "handleSubmitImport", function (file, releaseNotes) {
      _this.service.importRuleSet({
        ruleSetHeader: _this.props.ruleSetHeader,
        releaseNotes: releaseNotes
      }, file).then(function (_ref3) {
        var data = _ref3.data;
        if (data && data.data.status === "SUCCESS") {
          NotificationManager.showSuccess("Rules has been successfully imported");
          _this.loadVersions(_this.props);
          _this.setState({
            currentVersion: parseInt(data.data.ruleSetId.version, 10)
          });
          fetchRuleSet(_this.service, _this.props, data.data.ruleSetId.version);
        } else {
          var message = data && data.data.message ? data.data.message : "";
          NotificationManager.showError("Error in importing rules: " + message);
        }
      });
      ModalManager.dismiss();
    });
    _defineProperty(_this, "collapseAll", function () {
      _this.setState({
        show: false
      });
    });
    _defineProperty(_this, "showAll", function () {
      _this.setState({
        show: true
      });
    });
    _defineProperty(_this, "toTop", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
    _defineProperty(_this, "toBottom", function () {
      _this.containerEnd.scrollIntoView({
        behavior: "smooth"
      });
    });
    _defineProperty(_this, "renderCommonRuleComponent", function () {
      var ruleLength = _this.props.ruleLength;
      var ruleComponents = [];
      for (var i = 0; i < ruleLength; i++) {
        ruleComponents.push(React.createElement(CommonRuleComponent, {
          key: i,
          index: i,
          lastIndex: ruleLength,
          show: _this.state.show,
          isDragging: false
        }));
      }
      return ruleComponents;
    });
    var Service = props.CustomRuleService || CommonRuleService;
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
  _inherits(CommonRuleContainer, _React$Component);
  return _createClass(CommonRuleContainer, [{
    key: "loadData",
    value: function loadData(props) {
      var _this2 = this;
      fetchData(this.service, props, this.state.currentVersion).then(function () {
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
          versionInfo = React.createElement("div", null, React.createElement("div", null, "Created By: ", versions[i].createdBy), React.createElement("div", null, "Created At: ", versions[i].createdAt), React.createElement("div", null, "Release Notes: ", versions[i].releaseNote));
        }
        items.push({
          label: "Version: " + versions[i].version,
          value: versions[i].version
        });
      }
      var defaultVersion = currentVersion === -1 ? latestVersion : currentVersion;
      if (loading) return React.createElement(Loader, null);
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
      return React.createElement("div", null, React.createElement(Row, {
        marginBottom: true
      }, React.createElement(Column, {
        size: 12
      }, React.createElement(Text, {
        tag: "h1"
      }, toTitleCase(ruleSetHeader), React.createElement("div", {
        className: "topbar button",
        style: {
          "float": "right"
        }
      }, React.createElement(DropDown, {
        size: "md"
      }, React.createElement(DropDownToggle, null, "Available Actions"), React.createElement(DropDownMenu, {
        isRight: true
      }, React.createElement(DropDownItem, {
        className: style.dropdownItem,
        onClick: this.handleSave
      }, "Save Ruleset"), React.createElement(DropDownItem, {
        className: style.dropdownItem,
        onClick: this.handleShowNewRuleModal
      }, "Add New Rule"), React.createElement(DropDownItem, {
        className: style.dropdownItem,
        onClick: this.handleImportRuleSet
      }, "Import Ruleset"), React.createElement(DropDownItem, {
        className: style.dropdownItem,
        onClick: this.handleExportRuleSet
      }, "Export Ruleset"))))), React.createElement(Divider, null), React.createElement(Label, null, "Selected Version"), React.createElement("div", {
        className: "versioning",
        style: {
          display: "flex"
        }
      }, React.createElement(Select, {
        options: items,
        defaultValue: defaultVersion,
        onChange: this.handleVersionChange,
        width: "15%"
      }), React.createElement(Icon, {
        id: "version-details",
        icon: "info-circle-outline",
        style: {
          marginTop: "5px",
          marginLeft: "5px"
        }
      }), React.createElement(Tooltip, {
        placement: TETHER_ATTACHMENTS.RIGHT,
        target: "#version-details",
        trigger: "hover"
      }, versionInfo)), React.createElement(Divider, null))), this.renderCommonRuleComponent(), React.createElement(FloatButton, {
        actions: children
      }), React.createElement("div", {
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
}(React.Component);
CommonRuleContainer.propTypes = {
  ruleSetHeader: PropTypes.string.isRequired,
  ruleLength: PropTypes.number,
  CustomRuleService: PropTypes.func
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    ruleLength: commonRulesSelector.getRulesLength(state),
    rules: commonRulesSelector.getRules(state)
  };
};
export default compose(applyReducers(commonRulesReducers), connect(mapStateToProps, commonRulesMapDisToProps))(CommonRuleContainer);
//# sourceMappingURL=CommonRuleContainer.js.map