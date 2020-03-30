'use strict';

const rekognition = require('./service/rekognitionService')

const sqsService = require('./service/sqsService')

module.exports.tag = async event => {

  console.log("action=parsingStringToJson")
  const s3Info = JSON.parse(event.Records[0].Sns.Message)

  const bucket = s3Info.Records[0].s3.bucket.name
  console.log("action=getBucketName, bucket=" + bucket)

  const imageKey = s3Info.Records[0].s3.object.key
  console.log("action=getImageKey, imageKey=" + imageKey)

  const labels = await rekognition.detectLabels(bucket, imageKey)
  const item = {
    bucket: bucket,
    key: imageKey,
    labels: labels,
    eventType: 'TAG_EVENT'
  }

  await sqsService.putMessage(item)

  return { message: 'Get tags from image with success !', event };
};