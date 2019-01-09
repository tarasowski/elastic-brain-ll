const { resolverUpdate } = require('./update-resolvers')
const { schemaUpdate } = require('./update-schema')


schemaUpdate
    .fork(err => console.error('something went wrong', err), x => console.log('graphql schema has been updated'))

resolverUpdate
    .forEach(el => el.fork(console.error,
        data =>
            console.log('resolver: ' + data.resolver.fieldName + ' was successfully updated')))

