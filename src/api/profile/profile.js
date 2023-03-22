import { createHeaders } from "./index";
const apiUrl = process.env.REACT_APP_API_PROFILEDATABASE;

export const getUserProfiles = async () => {
  try {
    const response = await fetch(`${apiUrl}`);
    if (!response.ok) {
      throw new Error(`could not complete request`);
    }
    const data = await response.json();
    return data;
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
    return data;
  } catch (error) {
    return [error.message, []];
  }
};

export const postUserProfile = async (userProfileData) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify(userProfileData),
    });
    if (!response.ok) {
      console.error("Error status:", response.status);
      const errorText = await response.text();
      console.error("Error message:", errorText);
      throw new Error("Could not create user with username");
    }
    const data = await response.json();
    return [null, data];
  } catch (error) {
    return [error.message, []];
  }
};

export const patchProfile = async (checkNum, userData) => {
  const url = `https://mefitapi-production.up.railway.app/api/Profiles/${checkNum[0].id}?navigationProperty=Address`;
  const headers = {
    "Content-Type": "application/json-patch+json",
  };
  const patch = [
    {
      path: "/weight",
      op: "replace",
      value: userData.weight,
    },
    {
      path: "/height",
      op: "replace",
      value: userData.height,
    },
    {
      path: "/medicalConditions",
      op: "replace",
      value: userData.medicalConditions,
    },
    {
      path: "/disabilities",
      op: "replace",
      value: userData.disabilities,
    },
    {
      path: "/address",
      op: "replace",
      value: {
        addressLine1: userData.address.addressLine1,
        addressLine2: userData.address.addressLine2,
        addressLine3: userData.address.addressLine3,
        city: userData.address.city,
        country: userData.address.country,
        postalCode: userData.address.postalCode,
      },
    },
  ];

  fetch(url, {
    method: "PATCH",
    headers: headers,
    body: JSON.stringify(patch),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const updateUserProfile = async (user, userData) => {
  const getUserProfilesData = await getUserProfiles();
  const checkNum = await getUserProfilesData.filter((profile) => profile.userId === user.id);
  if (checkNum.length === 0) {
    postUserProfile(userData);
  } else {
    console.log("PATCH");
    patchProfile(checkNum, userData);
  }
};
