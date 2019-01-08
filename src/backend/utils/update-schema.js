const { Either } = require('lambda.either')
const { Task } = require('lambda.tasks')
const { compose } = require('compose.helpers')
const Appsync = require('aws-sdk/clients/appsync')
const appsync = new Appsync({ region: 'eu-west-1' })
const fs = require('fs')
const path = require('path')
const { apiId } = require('./apiId')

const constructParams = apiId => data => ({
    apiId: apiId,
    definition: Buffer.from(data)
})

const schemaPath = path.join(__dirname, '../', '/graphql/schema/schema.graphql')

const readSchema = path =>
    Task((reject, resolve) =>
        fs.readFile(path, 'utf-8', (err, content) =>
            err ? reject(err) : resolve(content)))

const updateApi = params =>
    Task((reject, resolve) =>
        appsync.startSchemaCreation(params, (err, data) =>
            err ? reject(err) : resolve(data)))


readSchema(schemaPath)
    .map(constructParams(apiId))
    .chain(updateApi)
    .fork(err => console.error('something went wrong', err), x => console.log('graphql schema has been updated'))
