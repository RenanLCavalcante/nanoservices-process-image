const s3Service = require('./s3Service')

const jimp = require('jimp')

const sqsService = require('./sqsService')

const filter = async event => {
    console.log("action=parsingStringToJson")
    const s3Info = JSON.parse(event.Records[0].Sns.Message)

    const bucket = s3Info.Records[0].s3.bucket.name
    console.log("action=getBucketName, bucket=" + bucket)

    const imageKey = s3Info.Records[0].s3.object.key
    console.log("action=getImageKey, imageKey=" + imageKey)

    console.log("action=gettingObject")
    const objectS3 = await s3Service.getObject(bucket, imageKey)

    const image = await jimp.read(objectS3)

    console.log("action=resizeImage, quality=80")
    const buffer = await image.grayscale().quality(80).getBufferAsync(jimp.MIME_JPEG)

    console.log("action=putingObjectOnS3, imageKey=" + imageKey)
    const filterData = await s3Service.putObject(buffer, imageKey)

    filterData.eventType = 'FILTER_BLACK_AND_WHITE_EVENT'

    console.log("action=sendingMessageToSqs, message=" + JSON.stringify(filterData))
    await sqsService.putMessage(filterData)
}

module.exports = {
    filter: filter
}