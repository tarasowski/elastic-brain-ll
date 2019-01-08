'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changeUrl = exports.learnStartOver = exports.learnNextQuestion = exports.setShowQuestion = exports.setVisiblityFilter = exports.selectCourse = exports.addCard = exports.addCourse = exports.registerAccount = exports.confirmAccount = exports.loginAccount = exports.loginSuccess = exports.confirmationSuccess = exports.registrationFailure = exports.registrationSuccess = exports.LOGIN_SUCCESS = exports.CONFIRMATION_SUCCESS = exports.LOGIN_ACCOUNT = exports.CONFIRM_ACCOUNT = exports.REGISTRATION_FAILURE = exports.REGISTRATION_SUCCESS = exports.ADD_SELECT_ATTRIBUTE = exports.CLEAR_ADD_CARD_TEXTAREA = exports.REGISTER_ACCOUNT = exports.CHANGE_URL = exports.LEARN_START_OVER = exports.LEARN_NEXT_QUESTION = exports.SET_SHOW_QUESTION = exports.FILTER_CARDS = exports.UPDATE_STATE = exports.SELECT_COURSE = exports.REMOVE_COURSE = exports.ADD_COURSE = exports.REMOVE_CARD = exports.ADD_CARD = exports.SET_VISIBILITY_FILTER = exports.TOGGLE_TODO = exports.ADD_TODO = undefined;

var _cuid = require('cuid');

var _cuid2 = _interopRequireDefault(_cuid);

var _dom = require('./dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ADD_TODO = exports.ADD_TODO = 'ADD_TODO';
var TOGGLE_TODO = exports.TOGGLE_TODO = 'TOGGLE_TODO';
var SET_VISIBILITY_FILTER = exports.SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
var ADD_CARD = exports.ADD_CARD = 'ADD_CARD';
var REMOVE_CARD = exports.REMOVE_CARD = 'REMOVE_CARD';
var ADD_COURSE = exports.ADD_COURSE = 'ADD_COURSE';
var REMOVE_COURSE = exports.REMOVE_COURSE = 'REMOVE_COURSE';
var SELECT_COURSE = exports.SELECT_COURSE = 'SELECT_COURSE';
var UPDATE_STATE = exports.UPDATE_STATE = 'UPDATE_STATE';
var FILTER_CARDS = exports.FILTER_CARDS = 'FILTER_CARDS';
var SET_SHOW_QUESTION = exports.SET_SHOW_QUESTION = 'SET_SHOW_QUESTION';
var LEARN_NEXT_QUESTION = exports.LEARN_NEXT_QUESTION = 'LEARN_NEXT_QUESTION';
var LEARN_START_OVER = exports.LEARN_START_OVER = 'LEARN_START_OVER';
var CHANGE_URL = exports.CHANGE_URL = 'CHANGE_URL';
var REGISTER_ACCOUNT = exports.REGISTER_ACCOUNT = 'REGISTER_ACCOUNT';
var CLEAR_ADD_CARD_TEXTAREA = exports.CLEAR_ADD_CARD_TEXTAREA = 'CLEAR_ADD_CARD_TEXTAREA';
var ADD_SELECT_ATTRIBUTE = exports.ADD_SELECT_ATTRIBUTE = 'ADD_SELECT_ATTRIBUTE';
var REGISTRATION_SUCCESS = exports.REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
var REGISTRATION_FAILURE = exports.REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';
var CONFIRM_ACCOUNT = exports.CONFIRM_ACCOUNT = 'CONFIRM_ACCOUNT';
var LOGIN_ACCOUNT = exports.LOGIN_ACCOUNT = 'LOGIN_ACCOUNT';
var CONFIRMATION_SUCCESS = exports.CONFIRMATION_SUCCESS = 'CONFIRMATION_SUCCESS';
var LOGIN_SUCCESS = exports.LOGIN_SUCCESS = 'LOGIN_SUCCESS';

var registrationSuccess = exports.registrationSuccess = function registrationSuccess(data) {
    return {
        type: REGISTRATION_SUCCESS,
        payload: data
    };
};
var registrationFailure = exports.registrationFailure = function registrationFailure(err) {
    return {
        type: REGISTRATION_FAILURE,
        payload: err
    };
};

var confirmationSuccess = exports.confirmationSuccess = function confirmationSuccess(msg) {
    return {
        type: CONFIRMATION_SUCCESS,
        payload: msg
    };
};

var loginSuccess = exports.loginSuccess = function loginSuccess(data) {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    };
};

var loginAccount = exports.loginAccount = function loginAccount() {
    return {
        type: LOGIN_ACCOUNT,
        command: {
            type: LOGIN_ACCOUNT,
            username: (0, _dom.getInputValueFromId)('login-username'),
            password: (0, _dom.getInputValueFromId)('login-password')
        }
    };
};

var confirmAccount = exports.confirmAccount = function confirmAccount() {
    return {
        type: CONFIRM_ACCOUNT,
        command: {
            type: CONFIRM_ACCOUNT,
            username: (0, _dom.getInputValueFromId)('confirmation-username'),
            code: (0, _dom.getInputValueFromId)('confirmation-code')
        }
    };
};

var registerAccount = exports.registerAccount = function registerAccount() {
    return {
        type: REGISTER_ACCOUNT,
        command: {
            type: REGISTER_ACCOUNT,
            username: (0, _dom.getInputValueFromId)('register-username'),
            password: (0, _dom.getInputValueFromId)('register-password'),
            email: (0, _dom.getInputValueFromId)('register-email')
        }
    };
};

var addCourse = exports.addCourse = function (counter) {
    return function () {
        var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _cuid2.default)();
        return {
            type: ADD_COURSE,
            id: id,
            courseName: (0, _dom.getInputValueFromId)('course'),
            command: {
                type: ADD_COURSE,
                id: id,
                courseName: (0, _dom.getInputValueFromId)('course')
            }

        };
    };
}(0);

var addCard = exports.addCard = function (counter) {
    return function () {
        return {
            type: ADD_CARD,
            id: counter++,
            question: (0, _dom.getInputValueFromId)('card-question'),
            answer: (0, _dom.getInputValueFromId)('card-answer'),
            course: (0, _dom.getSelectedValue)('courseList'),
            command: {
                type: CLEAR_ADD_CARD_TEXTAREA
            }
        };
    };
}(0);

var selectCourse = exports.selectCourse = function selectCourse() {
    return {
        type: SELECT_COURSE,
        command: {
            type: ADD_SELECT_ATTRIBUTE
        }
    };
};

var setVisiblityFilter = exports.setVisiblityFilter = function setVisiblityFilter(filter) {
    return {
        type: SET_VISIBILITY_FILTER,
        filter: filter
    };
};

var setShowQuestion = exports.setShowQuestion = function setShowQuestion() {
    return {
        type: SET_SHOW_QUESTION
    };
};

var learnNextQuestion = exports.learnNextQuestion = function learnNextQuestion() {
    return {
        type: LEARN_NEXT_QUESTION
    };
};

var learnStartOver = exports.learnStartOver = function learnStartOver() {
    return {
        type: LEARN_START_OVER
    };
};

var changeUrl = exports.changeUrl = function changeUrl(url) {
    return {
        type: CHANGE_URL,
        url: url,
        command: {
            type: CHANGE_URL,
            url: url
        }
    };
};