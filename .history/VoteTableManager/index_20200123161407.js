const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient({ region: `us-east-1` });

exports.moduel.checkIfVoteExists = async voteId => {
  const TableName = process.env.TableName;
};
