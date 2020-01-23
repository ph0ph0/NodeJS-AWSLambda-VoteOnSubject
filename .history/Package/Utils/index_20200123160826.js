exports.module.eventDetails = event => {
  const input = event.input;

  const voteId = event.id;
  const userId = input.userId;
  const subjectId = input.objectId;
  const vote = input.vote;
  const voteOn = input.voteOn;

  return {
    voteId,
    userId,
    subjectId,
    vote,
    voteOn
  };
};
