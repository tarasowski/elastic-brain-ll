const { Either } = require('lambda.either')
const { Task } = require('lambda.tasks')
const { compose, map, chain, fold } = require('compose.helpers')
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
        requestFile: readContent('addNewCourse-request.txt'),
        responseFile: readContent('addNewCourse-response.txt'),
        typeName: 'Mutation',
        dataSourceName: 'EBCourses'
    },
    {
        fieldName: 'getAllCourses',
        requestFile: readContent('getAllCourses-request.txt'),
        responseFile: readContent('getAllCourses-response.txt'),
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
    requestMappingTemplate: rest.requestFile,
    responseMappingTemplate: rest.responseFile,
    typeName: rest.typeName,
    dataSourceName: rest.dataSourceName
})

const concurrent = xs =>
    xs.forEach(el => el.fork(console.error, data => console.log('resolver: ' + data.resolver.fieldName + ' was successfully updated')))


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
    map(concurrent),
    map(lift),
    map(constructParams),
    Task.of
)

update(fieldNames)
    .fork(console.error, x => x)



