module.exports.subjectUpdater = async (oldVoteObject, subjectId, vote) => {
  console.log("Updating subject..., users new vote is: %s", vote);

  console.log("oldVoteObject: %j", oldVoteObject);

  if (Object.entries(oldVoteObject).length === 0) {
    console.log("User's vote did not exist");
    switch (vote) {
      case vote == "up":
        console.log("Incrementing vote once");
        // await incrementVotesOnSubjectOnce();
        return;
      case vote == "down":
        console.log("Incrementing vote once");
        // await decrementVotesOnSubjectOnce();
        return;
      default:
        console.log("Error, no matching vote cases!");
        throw Error("Previous vote existed, but no matching vote cases");
    }
  } else {
    console.log("User's vote already existed");
    switch (vote) {
      case vote == "up":
        console.log("Incrementing vote twice");
        // await incrementVotesOnSubjectTwice();
        return;
      case vote == "down":
        console.log("decrementing vote twice");
        // await decrementVotesOnSubjectTwice();
        return;
      default:
        console.log("Error, no matching vote cases!");
        throw Error("Previous vote did not exist, but no matching vote cases");
    }
  }
  //   if oldVoteObject is empty, just increment or decrement the subject, then return
  //if it is not empty, increment or decrement by 2
};
