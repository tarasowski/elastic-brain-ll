import { Auth } from 'aws-amplify'
import { awsconfig } from '../aws-exports'
import { Task } from 'lambda.tasks'

Auth.configure(awsconfig)
// saves the accessToken to local storage, needs to be called every time a user logs-in
Auth.currentSession()


export const retrieveAccessToken = () =>
    Task((reject, resolve) => Auth.currentSession().then(res => resolve(res), err => reject(err)))

export const register = username => password =>
    Auth.signUp({
        username,
        password,
    })

export const confirmRegister = username => code =>
    Auth.confirmSignUp(username, code)

export const login = username => password =>
    Auth.signIn(username, password)