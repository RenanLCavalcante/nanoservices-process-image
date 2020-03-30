const jimp = require('jimp')

const s3Service = require('./s3Service')

const sqsService = require('./sqsService')

const thumbnail = async event => {
    
    console.log("action=parsingStringToJson")
    const s3Info = JSON.parse(event.Records[0].Sns.Message)

    const bucket = s3Info.Records[0].s3.bucket.name
    console.log("action=getBucketName, bucket=" + bucket)

    const imageKey = s3Info.Records[0].s3.object.key
    console.log("action=getImageKey, imageKey=" + imageKey)

    console.log("action=gettingObject")
    const objectS3 = await s3Service.getObject(bucket, imageKey)

    const image = await jimp.read(objectS3)

    console.log("action=resizeImage, resize=100x100, quality=80")
    const buffer = await image.resize(100, 100).quality(80).getBufferAsync(jimp.MIME_JPEG)

    console.log("action=putingObjectOnS3, imageKey=" + imageKey)
    const thumbnailData = await s3Service.putObject(buffer, imageKey)

    thumbnailData.eventType = 'THUMBNAIL_EVENT'

    console.log("action=sendingMessageToSqs, message=" + JSON.stringify(thumbnailData))
    await sqsService.putMessage(thumbnailData)
}

module.exports = {
    thumbnail: thumbnail
}