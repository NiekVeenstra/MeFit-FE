import { createHeaders } from "./index";
const apiUrl = process.env.REACT_APP_API_PROFILEDATABASE;

export const getUserProfiles = async () => {
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

export const getUserProfile = async (id) => {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error(`could not complete request`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    return [error.message, []];
  }
};

export const postUserProfile = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify({
        weight: "500",
        height: "500",
        medicalConditions: "test",
        disabilities: "test",
        userId: "111",
        addressId: 111
      }),
    });
    if (!response.ok) {
      console.error("Error status:", response.status);
      const errorText = await response.text();
      console.error("Error message:", errorText);
      throw new Error("Could not create user with username");
    }
    const data = await response.json();
    console.log(data)
    console.log(data.id);
    return [null, data];
  } catch (error) {
    return [error.message, []];
  }
};

export const loginUser = async (keycloakData) => {
  const user = await getUserProfile(keycloakData.id);
  if (user.id == null) {
    return await postUserProfile(keycloakData);
  }
};
