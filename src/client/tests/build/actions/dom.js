'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSelectedValue = exports.getInputValueFromId = undefined;

var _lambda = require('lambda.either');

var _compose = require('compose.helpers');

// wrapped in fromNullable because it can return a null
var getElement = function getElement(id) {
    return _lambda.Either.fromNullable(document.getElementById(id));
};

var result = function result(e) {
    return (0, _compose.fold)(function (err) {
        return err;
    }, function (data) {
        return data;
    })(e);
};

var getSelectedOptionsValue = function getSelectedOptionsValue(el) {
    return _lambda.Either.fromNullable(el.options[el.selectedIndex]);
};

var getValue = function getValue(el) {
    return _lambda.Either.fromNullable(el.value);
};

var getInputValueFromId = exports.getInputValueFromId = function getInputValueFromId(id) {
    return (0, _compose.compose)(result, (0, _compose.chain)(getValue), getElement)(id);
};

var getSelectedValue = exports.getSelectedValue = function getSelectedValue(id) {
    return (0, _compose.compose)((0, _compose.fold)(function (err) {
        return err;
    }, function (x) {
        return x;
    }), (0, _compose.map)(function (el) {
        return el.id;
    }), (0, _compose.chain)(getSelectedOptionsValue), getElement)(id);
};