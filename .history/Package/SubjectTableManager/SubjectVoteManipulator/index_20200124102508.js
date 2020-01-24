const TableName = process.env.SUBJECT_TABLE_NAME;

module.exports.incrementVoteOnce = subjectId => {
  const updateParams = {
    TableName,
    Key: { id: subjectId },
    UpdateExpression: "set votes = :votes",
    ExpressionAttributeValues: {
      ":votes": vote
    },
    ReturnValues: "UPDATED_NEW"
  };
};
