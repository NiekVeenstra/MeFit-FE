const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = process.env.REACT_APP_API_PROFILEDATABASE;

export const checkForUser = async (id) => {
  try {
    const response = await fetch(proxyUrl + apiUrl);
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

export const createUser = () => {
    console.log("there is no user sorry");
};

export const loginUser = async (id) => {
  const [checkError, userId] = await checkForUser(id);
  if(userId.length > 0) {
    return [null, userId.pop()]
  }

  const [createError, newUer] = createUser();
};
