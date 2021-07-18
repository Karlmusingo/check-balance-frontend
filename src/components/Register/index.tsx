import React from 'react';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { selectRegister } from 'src/redux/reducers/register/selectors';
import { register } from 'src/redux/reducers/register/actions';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 24px;
  width: 30%;
  max-width: 330px;
  min-width: 230px;
`;

const Title = styled.h2`
  font-size: 28px;
`;

const Register = (): React.ReactElement => {
  const [data, setdata] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const { registerLoading, user, registerError } = useSelector(selectRegister);

  const handleRegister = (): void => {
    if (!data.username) {
      setErrors((prev) => ({
        ...prev,
        username: 'Please enter the username',
      }));
    }
    if (!data.email) {
      setErrors((prev) => ({
        ...prev,
        email: 'Please enter the email',
      }));
    }
    if (!data.password) {
      setErrors((prev) => ({
        ...prev,
        password: 'Please enter the password',
      }));
    }
    if (data.username && data.password && data.email) {
      register(data)(dispatch)((data: any) => {
        history.push('/');
      });
    }
  };

  const clearError = (name: string) => {
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleChange = ({ target: { name, value } }: Record<string, any>) => {
    clearError(name);
    setdata({
      ...data,
      [name]: value,
    });
  };

  return (
    <Container>
      <FormContainer>
        <Form>
          <Title>Register</Title>
          <Form.Field onChange={handleChange}>
            <label>Username</label>
            <Form.Input
              error={errors.username || false}
              name="username"
              placeholder="Username"
            />
          </Form.Field>
          <Form.Field onChange={handleChange}>
            <label>Email</label>
            <Form.Input
              error={errors.email || false}
              name="email"
              placeholder="Email"
              type="email"
            />
          </Form.Field>
          <Form.Field onChange={handleChange}>
            <label>Password</label>
            <Form.Input
              error={errors.password || false}
              name="password"
              placeholder="Password"
              type="password"
            />
          </Form.Field>
          {registerError && (
            <Message negative>
              <p>{registerError.message}</p>
            </Message>
          )}
          <Form.Field>
            <Button
              type="submit"
              primary
              fluid
              onClick={handleRegister}
              loading={registerLoading}
            >
              REGISTER
            </Button>
          </Form.Field>
        </Form>
        <br />
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </FormContainer>
    </Container>
  );
};

export default Register;
