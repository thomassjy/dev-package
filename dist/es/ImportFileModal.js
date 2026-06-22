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
import { Button, FileInput, Label, NotificationManager, TextArea } from "@traveloka/soya-components";
import * as style from "./CommonRule.styles";
var ImportFileModal = function (_React$Component) {
  function ImportFileModal(props) {
    var _this;
    _classCallCheck(this, ImportFileModal);
    _this = _callSuper(this, ImportFileModal, [props]);
    _defineProperty(_this, "handleInputChange", function (value) {
      _this.setState({
        releaseNotes: value
      });
    });
    _defineProperty(_this, "handleFileChange", function (value) {
      if (value[0]) {
        _this.setState({
          file: value[0]
        });
      }
    });
    _defineProperty(_this, "handleCancel", function () {
      var onCancel = _this.props.onCancel;
      onCancel();
    });
    _defineProperty(_this, "handleSave", function () {
      var onSave = _this.props.onSave;
      var _this$state = _this.state,
        file = _this$state.file,
        releaseNotes = _this$state.releaseNotes;
      if (file.name && releaseNotes) {
        var fileExtension = file.name.substring(file.name.lastIndexOf("."));
        if (fileExtension.toLowerCase().trim() === ".json") {
          onSave(file, releaseNotes);
        } else {
          NotificationManager.showError("File must be a json");
        }
      } else {
        NotificationManager.showError("Please fix input");
      }
    });
    _this.state = {
      file: {},
      releaseNotes: ""
    };
    return _this;
  }
  _inherits(ImportFileModal, _React$Component);
  return _createClass(ImportFileModal, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement("div", null, React.createElement(Label, null, "File"), React.createElement(FileInput, {
        name: "file",
        value: "",
        description: "Choose a .json file",
        onChange: this.handleFileChange
      }), React.createElement(Label, null, "Release Notes"), React.createElement(TextArea, {
        onChange: this.handleInputChange,
        name: "releaseNotes",
        placeholder: "",
        theme: "default",
        marginBottom: "sm"
      })), React.createElement("div", {
        className: style.modalFooter
      }, React.createElement(Button, {
        onClick: this.handleCancel,
        color: "link"
      }, "Cancel"), React.createElement(Button, {
        onClick: this.handleSave,
        color: "blue"
      }, "Import")));
    }
  }]);
}(React.Component);
ImportFileModal.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func
};
export default ImportFileModal;
//# sourceMappingURL=ImportFileModal.js.map