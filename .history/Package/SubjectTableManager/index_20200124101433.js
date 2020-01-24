module.exports.subjectUpdater = async (oldVoteObject, subjectId, vote) => {
  console.log("Updating subject..., users new vote is: %s", vote);

  console.log("oldVoteObject: %j", oldVoteObject);

  if (Object.entries(oldVoteObject).length === 0) {
    console.log("User's vote did not exist");
    console.log("new vote is %s", vote);
    switch (vote) {
      case "up":
        console.log("Incrementing vote once");
        // await incrementVotesOnSubjectOnce();
        return;
      case "down":
        console.log("Incrementing vote once");
        // await decrementVotesOnSubjectOnce();
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
          // await decrementVotesOnSubjectOnce()
          return;
        } else {
          console.log(
            "New vote (%s) is not the same as old vote (%s), incrementing  twice",
            vote,
            oldVote
          );
          // await incrementVotesOnSubjectTwice();
          return;
        }
      case "down":
        if (oldVote == vote) {
          console.log(
            "old vote and new vote were the same, removing down vote"
          );
          // await incrementVotesOnSubjectOnce()
          return;
        } else {
          console.log(
            "New vote (%s) is not the same as old vote (%s), decrementing  twice",
            vote,
            oldVote
          );
          // await decrementVotesOnSubjectTwice();
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
