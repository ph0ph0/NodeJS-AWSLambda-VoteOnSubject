const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });
const TableName = process.env.SUBJECT_TABLE_NAME;

module.exports.incrementVoteOnce = async subjectId => {
  const updateParams = {
    TableName,
    Key: { id: subjectId },
    UpdateExpression: "set votes = votes + :val",
    ExpressionAttributeValues: {
      ":val": 1
    },
    ReturnValues: "ALL_NEW"
  };

  const updatedSubject = await dynamo.update(updateParams).promise();
  console.log(
    "Incremented subject votes once, new subject: %j",
    updatedSubject
  );
};

module.exports.incrementVoteTwice = async subjectId => {
  const updateParams = {
    TableName,
    Key: { id: subjectId },
    UpdateExpression: "set votes = votes + :val",
    ExpressionAttributeValues: {
      ":val": 2
    },
    ReturnValues: "ALL_NEW"
  };

  const updatedSubject = await dynamo.update(updateParams).promise();
  console.log(
    "Incremented subject votes twice, new subject: %j",
    updatedSubject
  );
};

module.exports.decrementVoteOnce = async subjectId => {
  const updateParams = {
    TableName,
    Key: { id: subjectId },
    UpdateExpression: "set votes = votes - :val",
    ExpressionAttributeValues: {
      ":val": 1
    },
    ReturnValues: "ALL_NEW"
  };

  const updatedSubject = await dynamo.update(updateParams).promise();
  console.log(
    "Decremented subject votes once, new subject: %j",
    updatedSubject
  );
};

module.exports.decrementVoteTwice = async subjectId => {
  const updateParams = {
    TableName,
    Key: { id: subjectId },
    UpdateExpression: "set votes = votes - :val",
    ExpressionAttributeValues: {
      ":val": 2
    },
    ReturnValues: "ALL_NEW"
  };

  const updatedSubject = await dynamo.update(updateParams).promise();
  console.log(
    "Decremented subject votes twice, new subject: %j",
    updatedSubject
  );
};
