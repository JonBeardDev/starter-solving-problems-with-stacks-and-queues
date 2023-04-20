const Queue = require("../lib/queue");

const connected = (graph, startUser, endUser) => {
  // If graph is empty (no users), return false
  const graphKeys = Object.keys(graph);
  if (graphKeys.length === 0) return false;

  // If start and end user are same, return true
  if (startUser === endUser) return true;

  // Initialize queue and enqueue start User. Mark as discovered in enqueued
  const enqueued = [startUser];
  const discovered = new Queue();

  discovered.enqueue(startUser);

  // While queue is not empty
  while (discovered.first) {
    // Dequeue a user
    const user = discovered.dequeue();
    // Find array of those followed by dequeued user
    const followedUsers = graph[user];

    // For each of those followed
    for (const followedUser of followedUsers) {
      // If it is the end user, return true
      if (followedUser === endUser) return true;

      // Otherwise add them to both discovered and enqueued, if not already discovered
      if (!enqueued.includes(followedUser)) {
        enqueued.push(followedUser);
        discovered.enqueue(followedUser);
      }
    }
  }
  // Once all pathways are exhausted, return false
  return false;
};

module.exports = connected;
