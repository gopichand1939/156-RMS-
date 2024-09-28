import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { registerUser } from '../api/api'; // Import the function

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
`;

const FormBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 350px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background: linear-gradient(45deg, #6e8efb, #a777e3);
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  font-size: 16px;

  &:hover {
    background: linear-gradient(45deg, #a777e3, #6e8efb);
  }
`;

const Heading = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

const Plan = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const user = await registerUser(data);
      console.log('User registered successfully:', user);
      alert('Registration successful!'); // Show alert on successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Registration failed. Please try again.'); // Show alert on error
    }
  };

  return (
    <FormContainer>
      <FormBox>
        <Heading>Recruitment Management System</Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Name"
            {...register('name', { required: true })}
          />
          {errors.name && <span>Name is required</span>}
          
          <Input
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
          />
          {errors.email && <span>Email is required</span>}
          
          <Input
            type="password"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          {errors.password && <span>Password is required</span>}
          
          <Select {...register('plan')}>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="VIP">VIP</option>
          </Select>
          
          <Button type="submit">Register</Button>
        </form>
      </FormBox>
    </FormContainer>
  );
};

export default Plan;
