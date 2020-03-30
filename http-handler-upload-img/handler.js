'use strict';

const s3Service = require('./service/s3Service')
const dynamodbService = require('./service/dynamodbService')
const elasticSearchService = require('./service/elasticSearchService')

module.exports.upload = async event => {
  const item = await s3Service.upload(event.body)
  await dynamodbService.put(item)

  return {
    statusCode: 201,
    body: JSON.stringify(item)
  };
};

module.exports.get = async event => {

  const data = await dynamodbService.get(event.queryStringParameters.q)
  
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};
