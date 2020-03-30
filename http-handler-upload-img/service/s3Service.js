const AWS = require('aws-sdk')
const uuid = require('uuid/v4')

AWS.config.update({
    region: 'us-east-1'
})

const S3 = new AWS.S3()
const BUCKET = 'nanoservices-images-rlc2'

const upload = body => {
    const id = uuid() + '.jpeg'
    return new Promise((res, rej) => {
        S3.putObject({
            Bucket: BUCKET, 
            Key: id,
            Body: new Buffer(body.replace(/^data:image\/\w+;base64,/, ''), 'base64'),
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
        }, (error, data) => {
            if (error) {
                return rej(error)
            }
            return res({
                bucket: BUCKET,
                key: id
            })
        })
    })
}

module.exports = {
    upload: upload
}

