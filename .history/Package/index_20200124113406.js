const { eventDetails } = require("./Utils");
const { saveVote } = require("./VoteTableManager");
const { subjectUpdater } = require("./SubjectTableManager");

exports.handler = async (event, context, callback) => {
  console.log("Intercepted event: %j", event);

  const { voteId, userId, subjectId, vote, voteOn } = eventDetails(event);

  const oldVoteObject = await saveVote(voteId, userId, subjectId, vote, voteOn);
  //if oldVoteObject is empty, vote did not exist
  console.log("Data from saveVote: %j", oldVoteObject);

  const subject = await subjectUpdater(oldVoteObject, subjectId, vote, voteId);
  console.log("Updated the subject, finished!: %j", subject);

  callback(null, subject);
};
