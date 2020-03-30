const AWS = require('aws-sdk')

AWS.config.update({
    region: 'us-east-1'
})

const s3 = new AWS.S3()

const BUCKET_IMAGESBLACKANDWHITE = 'nanoservices-images-rlc2-black-and-white'

const getObject = (bucket, key) => {
    return new Promise((res, rej) => {
        s3.getObject({
            Bucket: bucket,
            Key: key
        }, (err, data) => {
            if (err) {
                return rej(err)
            }
            return res(data.Body)
        })
    })
}

const putObject = (buffer, filename) => {
    return new Promise((res, rej) => {
        s3.putObject({
            Bucket: BUCKET_IMAGESBLACKANDWHITE,
            Key: filename,
            Body: buffer
        }, (err, data) => {
            if (err) {
                return rej(err)
            }
            return res({
                bucket: BUCKET_IMAGESBLACKANDWHITE,
                key: filename
            })
        })
    })
}

module.exports = {
    getObject: getObject,
    putObject: putObject
}