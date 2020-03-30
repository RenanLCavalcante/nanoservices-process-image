'use strict';
const filterBlackAndWhite = require('./service/filterBlackAndWhite')

module.exports.filterBlackAndWhite = async event => {
  console.log('action=eventSNSReceivedWithSuccess', JSON.stringify(event))
  await filterBlackAndWhite.filter(event)
  
  return { message: 'Filter black and white applyed with sucess :)!', event };
};
