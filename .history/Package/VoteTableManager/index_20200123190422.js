const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });
const TableName = process.env.VOTE_TABLE_NAME;

const checkVote = async voteId => {
  console.log("Checking vote for id: %s", voteId);
  //Check if vote already exists
  const getParams = {
    TableName,
    Key: {
      id:
        "42d3a95d-9ce8-403a-ba08-61a3a94a3e78_b6a1f286-e1ed-446f-bf5c-a732dc804eec"
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

module.exports.voteExists = async (voteId, subjectId, userId, vote, voteOn) => {
  const voteAlreadyExists = await checkVote(voteId);

  const voteInput = {
    id: voteId,
    createdBy: userId,
    objectVotedOnId: subjectId,
    vote,
    voteOn
  };

  const updateParams = {
    TableName,
    Key: { id: voteId },
    Item: {
      ...voteInput
    }
  };

  try {
    const updatedVote = await dynamo.update(updateParams).promise();

    console.log("Created/updated vote: %j", updatedVote);

    return voteAlreadyExists;
  } catch (error) {
    console.log("Error updating vote table: %j", error);
  }
};
