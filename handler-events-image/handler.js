'use strict';

const dynamodbService = require('./service/dynamodbService')

console.log('action=beginModule, module=consumer')
module.exports.consumer = async event => {

  for (const record of event.Records) {
    
    console.log('action=parsingRecordBody, body=' + JSON.stringify(record.body))
    const item = JSON.parse(record.body)

    console.log('action=searchingItemInDynamo, key=' + item.key)
    const dbItem = await dynamodbService.getItem(item.key)

    console.log('action=beginSwitchByEventType, eventType=' + item.eventType)
    switch(item.eventType) {
      case 'TAG_EVENT':
        console.log('action=addingFieldLabels')
        dbItem.labels = item.labels
        break;
      case 'FILTER_BLACK_AND_WHITE_EVENT':
        console.log('action=addingFieldblackWhiteFilter')
        dbItem.blackWhiteFilter = {
          bucket: item.bucket,
          key: item.key
        }
        break;
      case 'THUMBNAIL_EVENT':
        console.log('action=addingFieldthumbnail')
        dbItem.thumbnail = {
          bucket: item.bucket,
          key: item.key
        }
        break;
    }
    console.log('action=savingItemInDynamoDB, item=' + JSON.stringify(dbItem))
    await dynamodbService.putItem(dbItem)
  }
  return { message: 'Message consumed with success!', event };
};
