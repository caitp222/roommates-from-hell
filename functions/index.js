const functions = require('firebase-functions');

// Max number of lines of the chat history.
const MAX_LOG_COUNT = 5;

// Removes siblings of the node that element that triggered the function if there are more than MAX_LOG_COUNT.
// In this example we'll keep the max number of chat message history to MAX_LOG_COUNT.
exports.truncate = functions.database.ref('/chats/qwerty/messages/{messageId}').onWrite(event => {
  const parentRef = event.data.ref.parent;
  return parentRef.once('value').then(snapshot => {
    if (snapshot.numChildren() >= MAX_LOG_COUNT) {
      let childCount = 0;
      const updates = {};
      snapshot.forEach(function(child) {
        if (++childCount <= snapshot.numChildren() - MAX_LOG_COUNT) {
          updates[child.key] = null;
        }
      });
      // Update the parent. This effectively removes the extra children.
      return parentRef.update(updates);
    }
  });
});
