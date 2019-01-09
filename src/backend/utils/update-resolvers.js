const { Either } = require('lambda.either')
const { Task } = require('lambda.tasks')
const { compose, map, chain, fold, trace } = require('compose.helpers')
const Appsync = require('aws-sdk/clients/appsync')
const appsync = new Appsync({ region: 'eu-west-1' })
const fs = require('fs')
const path = require('path')
const { apiId } = require('./apiId')

const makePath = fileName =>
    path.join(__dirname, '../', `/graphql/resolvers/${fileName}`)


const readFile = Either.try(fs.readFileSync)

const readContent = compose(
    fold(err => 'dude, check your readContent function!', s => s.toString()),
    readFile,
    makePath
)


const fieldNames = [
    {
        fieldName: 'addNewCard',
        requestFile: 'addNewCard-request.txt',
        responseFile: 'addNewCard-response.txt',
        typeName: 'Mutation',
        dataSourceName: 'EBCards',
    },
    {
        fieldName: 'addNewCourse',
        requestFile: 'addNewCourse-request.txt',
        responseFile: 'addNewCourse-response.txt',
        typeName: 'Mutation',
        dataSourceName: 'EBCourses'
    },
    {
        fieldName: 'getAllCourses',
        requestFile: 'getAllCourses-request.txt',
        responseFile: 'getAllCourses-response.txt',
        typeName: 'Query',
        dataSourceName: 'EBCourses'
    }]



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

const pipeline = update(fieldNames)

pipeline
    .forEach(el => el.fork(console.error,
        data =>
            console.log('resolver: ' + data.resolver.fieldName + ' was successfully updated')))



