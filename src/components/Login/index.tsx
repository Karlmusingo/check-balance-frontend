import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectLogin } from 'src/redux/reducers/login/selectors';
import { login } from 'src/redux/reducers/login/actions';
import { Link, useHistory } from 'react-router-dom';

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

const Login = (): React.ReactElement => {
  const [data, setdata] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    password: '',
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const { loginLoading, user, loginError } = useSelector(selectLogin);

  const handleLogin = (): void => {
    if (!data.username) {
      setErrors((prev) => ({
        ...prev,
        username: 'Please enter the username',
      }));
    }
    if (!data.password) {
      setErrors((prev) => ({
        ...prev,
        password: 'Please enter the password',
      }));
    }
    if (data.username && data.password) {
      login(data)(dispatch)((data: any) => {
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
          <Title>Login</Title>
          <Form.Field onChange={handleChange}>
            <label>Username</label>
            <Form.Input
              name="username"
              placeholder="Username"
              error={errors.username || false}
            />
          </Form.Field>
          <Form.Field onChange={handleChange}>
            <label>Password</label>
            <Form.Input
              name="password"
              placeholder="Password"
              type="password"
              error={errors.password || false}
            />
          </Form.Field>
          {loginError && (
            <Message negative>
              <p>{loginError.message}</p>
            </Message>
          )}
          <Form.Field>
            <Button
              type="submit"
              primary
              fluid
              onClick={handleLogin}
              loading={loginLoading}
            >
              Login
            </Button>
          </Form.Field>
        </Form>
        <br />
        <p>
          Don't have an account?{' '}
          <Link
            to="/register"
            onClick={() => {
              history.push('/home');
            }}
          >
            Register
          </Link>
        </p>
      </FormContainer>
    </Container>
  );
};

export default Login;
