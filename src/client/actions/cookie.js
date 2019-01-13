import { compose, chain, fold } from 'compose.helpers'
import { Either } from 'lambda.either'


export const getAccessTokenFromLocalStorage = () =>
    localStorage.getItem(Object.keys(localStorage)[0])

const readCookie = () =>
    document.cookie

const extractByName = name => s =>
    s.match(new RegExp('(^| )' + name + '=([^;]+)'))

export const getCookieAccessToken = compose(
    fold(x => null, x => x),
    chain(xs => Either.fromNullable(xs[2])),
    chain(xs => Either.fromNullable(xs)),
    Either.of,
    extractByName('accessToken'),
    readCookie)