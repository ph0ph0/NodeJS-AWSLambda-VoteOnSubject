const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });
const TableName = process.env.VOTE_TABLE_NAME;

const checkVote = async voteId => {
  console.log("Checking vote for id: %s", voteId);
  //Check if vote already exists
  const getParams = {
    TableName,
    Key: {
      id: voteId
    }
  };

  try {
    const res = await dynamo.get(getParams).promise();
    console.log("Queried vote table, response: %j", res);
    return Object.entries(res).length !== 0 ? true : false;
  } catch (error) {
    console.log("Error querying vote table: %j", error);
  }
};

module.exports.voteExists = async (voteId, userId, subjectId, vote, voteOn) => {
  const voteAlreadyExists = await checkVote(voteId);

  console.log("Updating vote...");

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

    console.log("Created/updated vote: %j", updatedVote);

    return {
      voteAlreadyExists: voteAlreadyExists,
      oldVoteObject: oldVoteObject
    };
  } catch (error) {
    console.log("Error updating vote table: %j", error);
  }
};
