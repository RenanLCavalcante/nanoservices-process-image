const elasticsearch = require('elasticsearch');

console.log("action=configurationElasticSearch")
const client = new elasticsearch.Client({
  host: 'https://vpc-elasticsearch-nanoservices-n2exdirjorsyuiifgf43r4ieca.us-east-1.es.amazonaws.com',
  apiVersion: '7.6',
});

const index = async document => {
    await client.index({
        index: 'images',
        type: 'object',
        body: document
    })
}

module.exports = {
    index: index
}