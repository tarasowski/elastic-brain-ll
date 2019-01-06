import { endpoint } from '../aws-exports'
import axios from 'axios'
import { Task } from 'lambda.tasks'



export const addCategory = accessToken => payload =>
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

