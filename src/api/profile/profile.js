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
    console.log(data);
    console.log(data.id);
    return [null, data];
  } catch (error) {
    return [error.message, []];
  }
};

export const patchProfile = async () => {
// const url = 'https://mefitapi-production.up.railway.app/api/Profiles/95';
const proxyUrl = 'https://api.allorigins.win/raw?url=';
const targetUrl = 'https://mefitapi-production.up.railway.app/api/Profiles/95';
const url = proxyUrl + encodeURIComponent(targetUrl);
const headers = {
  'Content-Type': 'application/json-patch+json',
  // 'Authorization': 'Bearer <your_access_token>',
};
const patch = [
  {
    op: 'replace',
    path: '/weight',
    value: '9000',
  },
  {
    op: 'replace',
    path: '/height',
    value: '9000',
  },
  // Add more operations if necessary
];

fetch(url, {
  method: 'PATCH',
  headers: headers,
  body: JSON.stringify(patch),
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });




  // const patchData = {
  //   op: "replace",
  //   path: "/weight",
  //   value: "9000",
  // };
  // const headers = {
  //   'Content-Type': 'application/json-patch+json',
  // };
  // try {
  //   const response = await fetch(`${apiUrl}/${id}`, {
  //     method: 'PATCH',
  //     headers: headers,
  //     body: JSON.stringify(patchData),
  //   });
  //   if (!response.ok) {
  //     console.error('Error status:', response.status);
  //     const errorText = await response.text();
  //     console.error('Error message:', errorText);
  //     throw new Error(`Could not update profile with ID ${id}`);
  //   }
  //   const data = await response.json();
  //   console.log(data);
  //   return [null, data];
  // } catch (error) {
  //   return [error.message, []];
  // }


};


export const updateUserProfile = async (user, userData) => {
  console.log(user);
  console.log(userData)
  const getUserProfilesData = await getUserProfiles();
  const checkNum = await getUserProfilesData.filter((profile) => profile.userId === user.id);
  // console.log(checkNum.length === 0);

  if (checkNum.length === 0){
    postUserProfile(userData)
  } else {
    console.log("PATCH")
    // patchProfile()
    postUserProfile(userData)
  }

  // const user = await getUserProfile(keycloakData.id);
  // if (user.id == null) {
  //   return await postUserProfile(keycloakData);
  // }
};
