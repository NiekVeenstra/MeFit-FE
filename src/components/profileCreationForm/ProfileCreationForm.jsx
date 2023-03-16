import React, { useState } from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ProfileCreationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Height:
        <input type="number" value={height} onChange={(event) => setHeight(event.target.value)} />
      </label>
      <label>
        Weight:
        <input type="number" value={weight} onChange={(event) => setWeight(event.target.value)} />
      </label>
      <label>
        Fitness Level:
        <select value={fitnessLevel} onChange={(event) => setFitnessLevel(event.target.value)}>
          <option value="">Select One</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </StyledForm>
  );
};

export default ProfileCreationForm;
