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
var _soyaComponents = require("@traveloka/soya-components");
var style = _interopRequireWildcard(require("./CommonRule.styles"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var ImportFileModal = function (_React$Component) {
  function ImportFileModal(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, ImportFileModal);
    _this = _callSuper(this, ImportFileModal, [props]);
    (0, _defineProperty2["default"])(_this, "handleInputChange", function (value) {
      _this.setState({
        releaseNotes: value
      });
    });
    (0, _defineProperty2["default"])(_this, "handleFileChange", function (value) {
      if (value[0]) {
        _this.setState({
          file: value[0]
        });
      }
    });
    (0, _defineProperty2["default"])(_this, "handleCancel", function () {
      var onCancel = _this.props.onCancel;
      onCancel();
    });
    (0, _defineProperty2["default"])(_this, "handleSave", function () {
      var onSave = _this.props.onSave;
      var _this$state = _this.state,
        file = _this$state.file,
        releaseNotes = _this$state.releaseNotes;
      if (file.name && releaseNotes) {
        var fileExtension = file.name.substring(file.name.lastIndexOf("."));
        if (fileExtension.toLowerCase().trim() === ".json") {
          onSave(file, releaseNotes);
        } else {
          _soyaComponents.NotificationManager.showError("File must be a json");
        }
      } else {
        _soyaComponents.NotificationManager.showError("Please fix input");
      }
    });
    _this.state = {
      file: {},
      releaseNotes: ""
    };
    return _this;
  }
  (0, _inherits2["default"])(ImportFileModal, _React$Component);
  return (0, _createClass2["default"])(ImportFileModal, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", null, _react["default"].createElement("div", null, _react["default"].createElement(_soyaComponents.Label, null, "File"), _react["default"].createElement(_soyaComponents.FileInput, {
        name: "file",
        value: "",
        description: "Choose a .json file",
        onChange: this.handleFileChange
      }), _react["default"].createElement(_soyaComponents.Label, null, "Release Notes"), _react["default"].createElement(_soyaComponents.TextArea, {
        onChange: this.handleInputChange,
        name: "releaseNotes",
        placeholder: "",
        theme: "default",
        marginBottom: "sm"
      })), _react["default"].createElement("div", {
        className: style.modalFooter
      }, _react["default"].createElement(_soyaComponents.Button, {
        onClick: this.handleCancel,
        color: "link"
      }, "Cancel"), _react["default"].createElement(_soyaComponents.Button, {
        onClick: this.handleSave,
        color: "blue"
      }, "Import")));
    }
  }]);
}(_react["default"].Component);
ImportFileModal.propTypes = {
  onSave: _propTypes["default"].func,
  onCancel: _propTypes["default"].func
};
var _default = exports["default"] = ImportFileModal;
//# sourceMappingURL=ImportFileModal.js.map