const { eventDetails } = require("./Utils");
const { voteExists } = require("./VoteTableManager");

exports.handler = async (event, context, callback) => {
  console.log("Intercepted event: %j", event);

  const { voteId, userId, subjectId, vote, voteOn } = eventDetails(event);

  const voteAlreadyExists = await voteExists(
    voteId,
    userId,
    subjectId,
    vote,
    voteOn
  );
  console.log("Does vote exist?: %s", voteAlreadyExists);

  //check if vote exists in the Vote table
  //Update Subject table according to whether it exists or not.
  //Return updated subject.

  const testSubject = {
    id: "b6a1f286-e1ed-446f-bf5c-a732dc804eec",
    createdBy: "42d3a95d-9ce8-403a-ba08-61a3a94a3e78",
    createdAt: "2020-01-22T15:45:22.009Z",
    author: "ph0ph0",
    title: "IT WORKED!",
    subjectContent: "IT WORKED!",
    searchField: "IT WORKED!",
    timePassedSinceCreation: null,
    numberOfComments: 0,
    votes: 0,
    staticKey: 1,
    type: "post",
    owner: "42d3a95d-9ce8-403a-ba08-61a3a94a3e78",
    pictures: { items: [], nextToken: null },
    comments: { items: [], nextToken: null }
  };

  callback(null, testSubject);
};
