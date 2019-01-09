const { Either } = require('lambda.either')
const { Task } = require('lambda.tasks')
const { compose, map, chain, fold, trace } = require('compose.helpers')
const Appsync = require('aws-sdk/clients/appsync')
const appsync = new Appsync({ region: 'eu-west-1' })
const fs = require('fs')
const path = require('path')
const { fieldNames, apiId } = require('./setup')

const makePath = fileName =>
    path.join(__dirname, '../', `/graphql/resolvers/${fileName}`)


const readFile = Either.try(fs.readFileSync)

const readContent = compose(
    fold(err => 'dude, check your readContent function!', s => s.toString()),
    readFile,
    makePath
)

const init = apiId => ({ fieldName, ...rest }) => ({
    apiId,
    fieldName,
    kind: 'UNIT',
    rest
})

const restParams = ({ rest, ...obj }) => ({
    ...obj,
    requestMappingTemplate: readContent(rest.requestFile),
    responseMappingTemplate: readContent(rest.responseFile),
    typeName: rest.typeName,
    dataSourceName: rest.dataSourceName
})


const updateResolver = params =>
    Task((reject, resolve) => appsync.updateResolver(params, (err, data) =>
        err ? reject(err) : resolve(data)))


const lift = xs =>
    xs.map(updateResolver)

const constructParams = xs =>
    xs.map(el => compose(
        restParams,
        init(apiId)
    )(el))


const update = compose(
    lift,
    constructParams,
)

const resolverUpdate = update(fieldNames)

module.exports = { resolverUpdate }




