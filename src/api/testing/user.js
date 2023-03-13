const apiUrl = process.env.REACT_APP_API_USERS;

export const getUsers = async () => {
  try {
    const response = await fetch(`${apiUrl}`);
    if (!response.ok) {
      throw new Error(`could not complete request`);
    }
    const data = await response.json();
    console.log(data);
    return [null, data];
  } catch (error) {
    return [error.message, []];
  }
};

export const getUser = async (id) => {
  try {
    const response = await fetch(`${apiUrl}?id=${id}`);
    if (!response.ok) {
      throw new Error(`could not complete request`);
    }
    const data = await response.json();
    console.log(data);
    return [null, data];
  } catch (error) {
    return [error.message, []];
  }
};

export const postUser = () => {
    console.log("there is no user sorry");
};

export const loginUser = async (id) => {
  const [checkError, userId] = await getUser(id);
  if(userId.length > 0) {
    return [null, userId.pop()]
  }

  const [createError, newUer] = postUser();
};
