const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });
const TableName = process.env.VOTE_TABLE_NAME;

module.exports.saveVote = async (voteId, userId, subjectId, vote, voteOn) => {
  const updateParams = {
    TableName,
    Key: { id: voteId },
    UpdateExpression:
      "set createdBy = :userId, objectVotedOnId = :subjectId, vote = :vote, voteOn = :voteOn",
    ExpressionAttributeValues: {
      ":userId": userId,
      ":subjectId": subjectId,
      ":vote": vote,
      ":voteOn": voteOn
    },
    ReturnValues: "ALL_OLD"
  };

  try {
    const oldVoteObject = await dynamo.update(updateParams).promise();

    console.log("Created/updated vote: %j", oldVoteObject);

    return oldVoteObject;
  } catch (error) {
    console.log("Error updating vote table: %j", error);
  }
};

module.exports.deleteVote = async voteId => {
  console.log("Deleting vote: %s", voteId);
  const deleteParams = {
    TableName,
    Key: { id: voteId }
  };
  try {
    await dynamo.delete(deleteParams).promise();
    console.log("Successfully deleted vote");
  } catch (error) {
    console.log("Error deleteing vote: %j", error);
  }
};
