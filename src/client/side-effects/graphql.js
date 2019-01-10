import { endpoint } from '../aws-exports'
import axios from 'axios'
import { Task } from 'lambda.tasks'



export const addCourse = accessToken => payload =>
    Task((reject, resolve) =>
        axios(endpoint, {
            method: 'post',
            headers: {
                Authorization: accessToken
            },
            data: {
                query: `mutation addCourse {
                addNewCourse(courseName: ${JSON.stringify(payload.courseName)}, courseId: ${JSON.stringify(payload.courseId)}) {
                  userId,
                  courses {
                      courseId
                      courseName
                  }
                }
              }`
            }
        }).then(resolve, reject)
    )

export const loadCourses = accessToken =>
    Task((reject, resolve) =>
        axios(endpoint, {
            method: 'post',
            headers: {
                Authorization: accessToken
            },
            data: {
                query: `query getAllCourse {
                    getAllCourses {
                      items {
                        courses {
                          courseId
                          courseName
                        }
                      }
                      nextToken
                    }
                  }
                  `
            }
        }).then(resolve, reject)
    )

export const addCard = accessToken => payload =>
    Task((reject, resolve) =>
        axios(endpoint, {
            method: 'post',
            headers: {
                Authorization: accessToken
            },
            data: {
                query: `mutation addCard {
                    addNewCard(input: {
                      cardId : ${JSON.stringify(payload.cardId)}
                      question: ${JSON.stringify(payload.question)}
                      answer: ${JSON.stringify(payload.answer)}
                      dateAdded: ${JSON.stringify(payload.dateAdded)}
                      courseId: ${JSON.stringify(payload.courseId)}
                    }) {
                      userId
                      question
                      answer
                    }
                    }
                  `
            }
        }).then(resolve, reject))

export const getAllCards = accessToken =>
    Task((reject, resolve) =>
        axios(endpoint, {
            method: 'post',
            headers: {
                Authorization: accessToken
            },
            data: {
                query: `query getAllCards {
                    getAllCards {
                      items {
                        userId
                        question
                        answer
                        dateAdded
                        courseId
                      }
                    }
                  }
                      `
            }
        }).then(resolve, reject))

export const initLoadContentFromServer = accessToken =>
    Task.of(cs => cd => ({ courses: cs, cards: cd }))
        .ap(loadCourses(accessToken))
        .ap(getAllCards(accessToken))




