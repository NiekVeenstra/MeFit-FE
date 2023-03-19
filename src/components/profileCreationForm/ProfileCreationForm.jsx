import React, { useState } from "react";
import styled from "styled-components";
import { postUserProfile } from "../../api/profile/profile";
import { useUser, useUserProfile } from "../../context/UserContext";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledSubmitButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  padding: 0.6rem;
  //border: 0.1rem solid ${(props) => props.theme.colors.black};
  border-radius: 15px;
  cursor: pointer;
  width: 8rem;
  background-color: ${(props) => props.theme.colors.mainColor};
`;

const ProfileCreationForm = () => {
  const { user, setUser } = useUser({});
  const { userProfile, setUserProfile } = useUserProfile({});

  const [name, setName] = useState(user.firstName);
  const [email, setEmail] = useState(user.email);
  const [height, setHeight] = useState("100");
  const [weight, setWeight] = useState("100");
  const [medicalConditions, setMedicalConditions] = useState("none");
  const [disabilities, setDisabilities] = useState("none");
  const [addressLine1, setAddressLine1] = useState("none");
  const [postalCode, setPostalCode] = useState("none");
  const [city, setCity] = useState("none");
  const [country, setCountry] = useState("none");
  const [fitnessLevel, setFitnessLevel] = useState("");

  // const dummyData = {
  //   weight: weight,
  //   height: height,
  //   medicalConditions: medicalConditions,
  //   disabilities: disabilities,
  //   userId: user.id,
  //   address: {
  //     addressLine1: addressLine1,
  //     addressLine2: "string",
  //     addressLine3: "string",
  //     postalCode: postalCode,
  //     city: city,
  //     country: country,
  //   },
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUserProfile({
      ...userProfile,
      weight: weight,
      height: height,
      medicalConditions: medicalConditions,
      disabilities: disabilities,
      userId: user.id,
      address: {
        addressLine1: addressLine1,
        addressLine2: "string",
        addressLine3: "string",
        postalCode: postalCode,
        city: city,
        country: country,
      },
    });
    console.log(userProfile);
    postUserProfile(userProfile);
  };

  const log = () => {
    console.log(userProfile.id);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          defaultValue={`${user.firstName}`}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          defaultValue={`${user.email}`}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Height:
        <input type="number" defaultValue={100} onChange={(event) => setHeight(event.target.value)} />
      </label>
      <label>
        Weight:
        <input type="number" defaultValue={100} onChange={(event) => setWeight(event.target.value)} />
      </label>
      <label>
        Medical Conditions:
        <input
          type="text"
          defaultValue={"none"}
          onChange={(event) => setMedicalConditions(event.target.value)}
        />
      </label>
      <label>
        Disabilities:
        <input
          type="text"
          defaultValue={"none"}
          onChange={(event) => setDisabilities(event.target.value)}
        />
      </label>
      <label>
        Address:
        <input
          type="text"
          defaultValue={"none"}
          onChange={(event) => setAddressLine1(event.target.value)}
        />
      </label>
      <label>
        Postal Code:
        <input type="text" defaultValue={"none"} onChange={(event) => setPostalCode(event.target.value)} />
      </label>
      <label>
        City:
        <input type="text" defaultValue={"none"} onChange={(event) => setCity(event.target.value)} />
      </label>
      <label>
        Country:
        <input type="text" defaultValue={"none"} onChange={(event) => setCountry(event.target.value)} />
      </label>

      {/* <label>
        Fitness Level:
        <select
          value={fitnessLevel || ""}
          onChange={(event) => setFitnessLevel(event.target.value)}
        >
          <option value="">Select One</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </label> */}
      <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
      <button onClick={log()}>log</button>
    </StyledForm>
  );
};

export default ProfileCreationForm;
