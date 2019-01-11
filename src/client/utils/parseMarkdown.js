import { compose, trace } from 'compose.helpers'

const findCodeStart = str =>
    str.indexOf('```') !== -1
        ? ({ start: str.indexOf('```'), string: str })
        : ({ string: str, code: null })

const findCodeEnd = o =>
    o.code !== null
        ? ({ ...o, end: o.string.indexOf('```', o.start + 1) })
        : ({ ...o })

const extractCodeFromString = o =>
    o.code !== null
        ? ({ ...o, code: o.string.slice(o.start + 3, o.end) })
        : ({ ...o })

const stringBeforeCode = o =>
    o.code !== null
        ? ({ ...o, before: o.string.slice(0, o.start) })
        : ({ ...o })

const stringAfterCode = o =>
    o.code !== null
        ? ({ ...o, after: o.string.slice(o.end + 3) })
        : ({ ...o })

const constructHtml = ({ p, pre, code }) => o =>
    o.code !== null
        ? p({}, [
            p({}, o.before),
            pre({ style: 'background-color: #F1F5F8; width: 50%;' }, [
                code({}, o.code.concat('\n'))
            ]),
            p({}, o.after)
        ])
        : p({}, o.string)

export const parseMarkDown = htmlElements => str =>
    compose(
        constructHtml(htmlElements),
        stringAfterCode,
        stringBeforeCode,
        extractCodeFromString,
        findCodeEnd,
        findCodeStart,
    )(str)