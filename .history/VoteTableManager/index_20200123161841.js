const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });

exports.moduel.voteExists = async voteId => {
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
