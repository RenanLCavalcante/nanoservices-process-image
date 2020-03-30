'use strict';
const thumbnailService = require('./service/thumbnailService');

module.exports.thumbnail = async event => {
  console.log('action=eventSNSReceivedWithSuccess', JSON.stringify(event))
  await thumbnailService.thumbnail(event)

  return { message: "Thumbnail generated with sucess :)", event };
};