const AWS = require('aws-sdk')

AWS.config.update({
    region: 'us-east-1'
})

const dynamodb = new AWS.DynamoDB.DocumentClient()

const TABLE = "nanoservices-images"

const put = item => {
    return new Promise((res, rej) => {
        dynamodb.put({
            TableName: TABLE,
            Item: {
                id: item.key,
                bucket: item.bucket
            }
        }, (err, data) => {
            if (err) {
                return rej(err)
            }
            return res(data)
        })
    })
}

const get = query => {
    return new Promise((res, rej) => {
        dynamodb.scan({
            TableName : TABLE,
            FilterExpression: "contains (labels, :category1)",
            ExpressionAttributeValues : {   
                ':category1' : query
            }
        }, (err, data) => {
            if (err) {
                return rej(err)
            }
            return res(data)
        })
    })
}

module.exports = {
    put: put,
    get: get
}