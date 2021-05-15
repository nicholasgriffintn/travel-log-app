var AWS = require('aws-sdk');

AWS.config.update({ region: 'eu-west-1' });

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const createLogsTable = {
  TableName: 'travel-logs',
  BillingMode: 'PAY_PER_REQUEST',
  KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'logsByTime',
      KeySchema: [
        { AttributeName: 'userID', KeyType: 'HASH' },
        { AttributeName: 'publishedAt', KeyType: 'RANGE' },
      ],
      Projection: { ProjectionType: 'KEYS_ONLY' },
    },
  ],
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' },
    { AttributeName: 'userID', AttributeType: 'S' },
    { AttributeName: 'publishedAt', AttributeType: 'N' },
  ],
};
ddb.createTable(createLogsTable, function (err, data) {
  if (err) {
    console.log('Error', err);
  } else {
    console.log('Table Created', data);
  }
});
