import { Auth } from 'aws-amplify'
import { awsconfig } from '../aws-exports'

Auth.configure(awsconfig)

export const register = username => password => email =>
    Auth.signUp({
        username,
        password,
        attributes: {
            email
        }
    })

export const confirmRegister = username => code =>
    Auth.confirmSignUp(username, code)

export const login = username => password =>
    Auth.signIn(username, password)