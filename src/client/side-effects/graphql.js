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
                    addNewCourse(name: ${JSON.stringify(payload.courseName)}, id: ${JSON.stringify(payload.id)}) {
                      userId,
                      courses {
                          id
                          name
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
                query: `query loadCourses {
                    getAllCourses {
                      items {
                        courses {
                          id
                          name
                        }
                      }
                      nextToken
                    } 
                  }`
            }
        }).then(resolve, reject)
    )   