const { incrementVoteOnce } = require("./SubjectVoteManipulator");
const { incrementVoteTwice } = require("./SubjectVoteManipulator");
const { decrementVoteOnce } = require("./SubjectVoteManipulator");
const { decrementVoteTwice } = require("./SubjectVoteManipulator");

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
    switch (vote) {
      case "up":
        console.log("Incrementing vote once");
        await incrementVoteOnce(subjectId);
        return;
      case "down":
        console.log("Decrementing vote once");
        await decrementVoteOnce(subjectId);
        return;
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
          await decrementVoteOnce(subjectId);
          console.log("deleting up Vote object");
          await deleteVote(voteId);
          return;
        } else {
          console.log(
            "New vote (%s) is not the same as old vote (%s), incrementing  twice",
            vote,
            oldVote
          );
          await incrementVoteTwice(subjectId);
          return;
        }
      case "down":
        if (oldVote == vote) {
          console.log(
            "old vote and new vote were the same, removing down vote"
          );
          await incrementVoteOnce(subjectId);
          console.log("deleting down Vote object");
          await deleteVote(voteId);
          return;
        } else {
          console.log(
            "New vote (%s) is not the same as old vote (%s), decrementing  twice",
            vote,
            oldVote
          );
          await decrementVoteTwice(subjectId);
          return;
        }
        return;
      default:
        console.log("Error, no matching vote cases!");
        throw Error("Previous vote did not exist, but no matching vote cases");
    }
  }
  //   if oldVoteObject is empty, just increment or decrement the subject, then return
  //if it is not empty, increment or decrement by 2
};
