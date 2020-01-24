const { incrementVoteOnce } = require("./SubjectVoteManipulator");
const { incrementVoteTwice } = require("./SubjectVoteManipulator");
const { decrementVoteOnce } = require("./SubjectVoteManipulator");
const { decrementVoteTwice } = require("./SubjectVoteManipulator");
const { deleteVote } = require("../VoteTableManager");

module.exports.subjectUpdater = async (
  oldVoteObject,
  subjectId,
  vote,
  voteId
) => {
  console.log("Updating subject..., users new vote is: %s", vote);

  console.log("oldVoteObject: %j", oldVoteObject);

  if (Object.entries(oldVoteObject).length === 0) {
    console.log("User's vote did not exist");
    console.log("new vote is %s", vote);
    let updatedSubject;
    switch (vote) {
      case "up":
        console.log("Incrementing vote once");
        updatedSubject = await incrementVoteOnce(subjectId);
        return updatedSubject;
      case "down":
        console.log("Decrementing vote once");
        updatedSubject = await decrementVoteOnce(subjectId);
        return updatedSubject;
      default:
        console.log("Error, no matching vote cases!");
        throw Error("Previous vote existed, but no matching vote cases");
    }
  } else {
    console.log("User's vote already existed");
    console.log("new vote is %s", vote);
    const oldVote = oldVoteObject.Attributes.vote;
    switch (vote) {
      case "up":
        if (oldVote == vote) {
          console.log("old vote and new vote were the same, removing up vote");
          console.log("deleting up Vote object");
          await deleteVote(voteId);
          updatedSubject = await decrementVoteOnce(subjectId);
          return updatedSubject;
        } else {
          console.log(
            "New vote (%s) is not the same as old vote (%s), incrementing  twice",
            vote,
            oldVote
          );
          updatedSubject = await incrementVoteTwice(subjectId);
          return updatedSubject;
        }
      case "down":
        if (oldVote == vote) {
          console.log(
            "old vote and new vote were the same, removing down vote"
          );
          console.log("deleting down Vote object");
          await deleteVote(voteId);
          updatedSubject = await incrementVoteOnce(subjectId);
          return updatedSubject;
        } else {
          console.log(
            "New vote (%s) is not the same as old vote (%s), decrementing  twice",
            vote,
            oldVote
          );
          updatedSubject = await decrementVoteTwice(subjectId);
          return updatedSubject;
        }
      default:
        console.log("Error, no matching vote cases!");
        throw Error("Previous vote did not exist, but no matching vote cases");
    }
  }
};
