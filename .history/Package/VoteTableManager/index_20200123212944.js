const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });
const TableName = process.env.VOTE_TABLE_NAME;

const checkVote = async voteId => {
  const v = "abc_12345";
  console.log("Checking vote for id: %s", v);
  //Check if vote already exists
  const getParams = {
    TableName,
    Key: {
      id: v
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
    id: "abc_12345",
    createdBy: userId,
    objectVotedOnId: subjectId,
    vote,
    voteOn
  };

  console.log("Vote input for update Vote table: %j", voteInput);

  const updateParams = {
    TableName,
    Key: { id: "BLABA" },
    Item: {
      createdBy: "CuntFace",
      objectVotedOnId: "FUCKER",
      vote: "up",
      voteOn: "subject"
    }
  };

  try {
    const updatedVote = await dynamo.put(updateParams).promise();

    console.log("Created/updated vote: %j", updatedVote);

    return voteAlreadyExists;
  } catch (error) {
    console.log("Error updating vote table: %j", error);
  }
};
