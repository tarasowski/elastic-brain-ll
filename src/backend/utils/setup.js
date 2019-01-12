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
    },
    {
        fieldName: 'getSpecificCourseCards',
        requestFile: 'getSpecificCourseCards-request.txt',
        responseFile: 'getSpecificCourseCards-response.txt',
        typeName: 'Query',
        dataSourceName: 'EBCards'
    },
    {
        fieldName: 'getAllCards',
        requestFile: 'getAllCards-request.txt',
        responseFile: 'getAllCards-response.txt',
        typeName: 'Query',
        dataSourceName: 'EBCards'
    },

]


const apiId = 'g73gwqdxtnehrp2bfthfrrz5k4'

module.exports = { fieldNames, apiId }

