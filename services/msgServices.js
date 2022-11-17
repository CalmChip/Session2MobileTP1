const DATABASE_URL =
  'https://tpcoursmobile-default-rtdb.firebaseio.com/conversations';

const getMessages = async (fromUserId, toUserId) => {
  var response = await fetch(`${DATABASE_URL}/${fromUserId}/${toUserId}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  var data = await response.json();
  return { success: response.ok, ...data };
};

const sendMessage = async (userId, messages) => {
  var response = await fetch(`${DATABASE_URL}/${userId}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messages),
  });

  var data = await response.json();
  return { success: response.ok, ...data };
};

export { getMessages, sendMessage };