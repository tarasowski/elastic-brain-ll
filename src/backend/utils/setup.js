const fieldNames = [
    {
        fieldName: 'addNewCard',
        requestFile: 'addNewCard-request.txt',
        responseFile: 'addNewCard-response.txt',
        typeName: 'Mutation',
        dataSourceName: 'EBCardsV1',
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
    },
    {
        fieldName: 'getSpecificCourseCards',
        requestFile: 'getSpecificCourseCards-request.txt',
        responseFile: 'getSpecificCourseCards-response.txt',
        typeName: 'Query',
        dataSourceName: 'EBCardsV1'
    },
    {
        fieldName: 'getAllCards',
        requestFile: 'getAllCards-request.txt',
        responseFile: 'getAllCards-response.txt',
        typeName: 'Query',
        dataSourceName: 'EBCardsV1'
    },

]


const apiId = '3cazgel7lngcbjy3hqf4crf45a'

module.exports = { fieldNames, apiId }

