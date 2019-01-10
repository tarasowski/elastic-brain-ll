const { resolverUpdate } = require('./update-resolvers')
const { schemaUpdate, getSchemaInfo } = require('./update-schema')

const getUpdate = () =>
    getSchemaInfo.fork(console.error, console.log)

const timeout = ms =>
    setTimeout(() => getUpdate(), ms)

schemaUpdate
    .fork(err => console.error('something went wrong', err), () => timeout(2000))

resolverUpdate
    .forEach(el => el.fork(console.error,
        data =>
            console.log('resolver: ' + data.resolver.fieldName + ' was successfully updated')))

