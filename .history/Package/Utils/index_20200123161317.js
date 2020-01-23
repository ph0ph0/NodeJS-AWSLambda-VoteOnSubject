exports.module.eventDetails = event => {
  const input = event.input;

  const voteId = event.id;
  const userId = input.userId;
  const subjectId = input.objectId;
  const vote = input.vote;
  const voteOn = input.voteOn;

  const eventDetails = {
    voteId,
    userId,
    subjectId,
    vote,
    voteOn
  };

  console.log("Event details extracted: %j", eventDetails);

  return {
    ...eventDetails
  };
};
