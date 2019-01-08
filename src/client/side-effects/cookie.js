import { compose, trace } from 'compose.helpers'


const date = (d = new Date()) =>
    d.setTime(d.getTime() + (20 * 60 * 1000))

const expires = d =>
    ('expires=' + new Date(d).toUTCString())

const expirationDate = compose(expires, date)

const join = date => data =>
    ('accessToken=' + data + ';' + date)

const setCookie = data =>
    document.cookie = data

export const saveTokenToCookie = compose(
    setCookie,
    join(expirationDate())
)



