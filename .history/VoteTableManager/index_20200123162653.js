const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });

const checkVote = async voteId => {
  const TableName = process.env.TableName;

  //Check if vote already exists
  const queryParams = {
    TableName: TableName,
    KeyConditionExpression: "id = :voteId",
    ExpressionAttributeValues: {
      ":voteId": voteId
    }
  };

  try {
    const res = await dynamo.query(queryParams).promise();
    console.log("Queried vote table, response: %j", res);
    return res.length !== 0 ? true : false;
  } catch (error) {
    console.log("Error querying vote table: %j", error);
  }
};

exports.module.voteExists = async (voteId, subjectId, userId, vote, voteOn) => {
  const voteAlreadyExists = await checkVote(voteId);

  const updateParams = {
    TableName: TableName,
    Item: {
      id: voteId,
      objectVotedOnId: subjectId,
      createdBy: userId,
      vote: vote,
      voteOn: voteOn
    }
  };

  const updatedVote = await dynamo.update(updateParams).promise();

  console.log("Created/updated vote: %j", updatedVote);

  return voteAlreadyExists;
};
