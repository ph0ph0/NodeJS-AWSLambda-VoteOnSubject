module.exports.subjectUpdater = (
  voteAlreadyExists,
  oldVoteObject,
  subjectId
) => {
  console.log("Updating subject...");

  //if oldVoteObject is empty, voteAlreadyExists should be empty
  //Do we need voteAlreadyExists, as oldVoteObject fulfills this purpose...
  //   if oldVoteObject is empty, just increment or decrement the subject, then return
  //if it is not empty, increment or decrement by 2
};
