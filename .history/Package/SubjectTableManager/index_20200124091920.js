module.exports.subjectUpdater = async (oldVoteObject, subjectId, vote) => {
  console.log("Updating subject...");

  if (Object.entries(oldVoteObject).length === 0) {
    console.log("User's vote did not exist");
    switch (vote) {
      case vote === "up":
        await incrementVotesOnSubjectOnce();
        break;
      case vote === "down":
        await decrementVotesOnSubjectOnce();
    }
  }
  //   if oldVoteObject is empty, just increment or decrement the subject, then return
  //if it is not empty, increment or decrement by 2
};
