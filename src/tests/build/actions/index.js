'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ADD_TODO = exports.ADD_TODO = 'ADD_TODO';
var TOGGLE_TODO = exports.TOGGLE_TODO = 'TOGGLE_TODO';
var SET_VISIBILITY_FILTER = exports.SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
var ADD_CARD = exports.ADD_CARD = 'ADD_CARD';
var REMOVE_CARD = exports.REMOVE_CARD = 'REMOVE_CARD';
var ADD_COURSE = exports.ADD_COURSE = 'ADD_COURSE';
var REMOVE_COURSE = exports.REMOVE_COURSE = 'REMOVE_COURSE';
var INPUT_COURSE = exports.INPUT_COURSE = 'INPUT_COURSE';

var inputCourseName = exports.inputCourseName = function inputCourseName(_ref) {
    var courseName = _ref.courseName;
    return {
        courseName: courseName
    };
};

var addCourse = exports.addCourse = function (counter) {
    return function (_ref2) {
        var course = _ref2.course;
        return {
            type: ADD_COURSE,
            id: counter++,
            course: course
        };
    };
}(0);

var addCard = exports.addCard = function (counter) {
    return function (_ref3) {
        var question = _ref3.question,
            answer = _ref3.answer,
            course = _ref3.course;
        return {
            type: ADD_CARD,
            id: counter++,
            question: payload.question,
            answer: payload.answer,
            course: payload.course
        };
    };
}(0);

var addTodo = exports.addTodo = function (counter) {
    return function (value) {
        return {
            type: ADD_TODO,
            id: counter++,
            text: value
        };
    };
}(1);

var toggleTodo = exports.toggleTodo = function toggleTodo(id) {
    return {
        type: TOGGLE_TODO,
        id: id
    };
};

var setVisiblityFilter = exports.setVisiblityFilter = function setVisiblityFilter(filter) {
    return {
        type: SET_VISIBILITY_FILTER,
        filter: filter
    };
};