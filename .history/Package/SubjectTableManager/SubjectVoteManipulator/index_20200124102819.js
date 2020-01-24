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

module.exports.decrementedVoteOnce = async subjectId => {
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

module.exports.decrementedVoteTwice = async subjectId => {
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
