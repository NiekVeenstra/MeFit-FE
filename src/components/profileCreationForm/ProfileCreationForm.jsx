import React, { useState } from "react";
import styled from "styled-components";
import { updateUserProfile } from "../../api/profile/profile";
import { useUser, useUserCheck, useUserProfile } from "../../context/UserContext";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
  max-width: 45rem;

  border: solid 0.15rem ${(props) => props.theme.colors.mainColor};
  border-radius: 15px;

  @media (max-width: 450px) {
    width: 100%;
    border: none;
  }
`;

const StyledLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70%;
`;

const StyledLabel = styled.label`
  margin: 0.7rem 0;
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const StyledSubmitButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  padding: 0.6rem;
  margin: 1rem 0;
  border-radius: 15px;
  width: 8rem;
  background-color: ${(props) => props.theme.colors.mainColor};
  align-self: center;
`;

const ProfileCreationForm = ({onProfileUpdate}) => {
  const { user } = useUser({});
  const { userProfile, setUserProfile } = useUserProfile({});
  const { setUserCheck } = useUserCheck();

  const [setName] = useState(user.firstName);
  const [setEmail] = useState(user.email);
  const [height, setHeight] = useState("100");
  const [weight, setWeight] = useState("100");
  const [medicalConditions, setMedicalConditions] = useState("none");
  const [disabilities, setDisabilities] = useState("none");
  const [addressLine1, setAddressLine1] = useState("none");
  const [postalCode, setPostalCode] = useState("none");
  const [city, setCity] = useState("none");
  const [country, setCountry] = useState("none");

  const handleSubmit = async (event) => {
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

    updateUserProfile(user, {
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
    setUserCheck(false);
    onProfileUpdate();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabelContainer>
        <StyledLabel>
          Name:
          <input
            type="text"
            defaultValue={`${user.firstName}`}
            onChange={(event) => setName(event.target.value)}
          />
        </StyledLabel>
        <StyledLabel>
          Email:
          <input
            type="email"
            defaultValue={`${user.email}`}
            onChange={(event) => setEmail(event.target.value)}
          />
        </StyledLabel>
        <StyledLabel>
          Height:
          <input
            type="number"
            defaultValue={height}
            onChange={(event) => setHeight(event.target.value)}
          />
        </StyledLabel>
        <StyledLabel>
          Weight:
          <input
            type="number"
            defaultValue={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
        </StyledLabel>
        <StyledLabel>
          Medical Conditions:
          <input
            type="text"
            defaultValue={medicalConditions}
            onChange={(event) => setMedicalConditions(event.target.value)}
          />
        </StyledLabel>
        <StyledLabel>
          Disabilities:
          <input
            type="text"
            defaultValue={disabilities}
            onChange={(event) => setDisabilities(event.target.value)}
          />
        </StyledLabel>
        <StyledLabel>
          Address:
          <input
            type="text"
            defaultValue={addressLine1}
            onChange={(event) => setAddressLine1(event.target.value)}
          />
        </StyledLabel>
        <StyledLabel>
          Postal Code:
          <input
            type="text"
            defaultValue={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
          />
        </StyledLabel>
        <StyledLabel>
          City:
          <input
            type="text"
            defaultValue={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </StyledLabel>
        <StyledLabel>
          Country:
          <input
            type="text"
            defaultValue={country}
            onChange={(event) => setCountry(event.target.value)}
          />
        </StyledLabel>
      </StyledLabelContainer>
      <StyledSubmitButton type="submit">Submit</StyledSubmitButton>
    </StyledForm>
  );
};

export default ProfileCreationForm;
