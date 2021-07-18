import React, { useEffect } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  // useLocation,
} from 'react-router-dom';
import Login from 'src/components/Login';
import Register from 'src/components/Register';
import Home from 'src/components/Home';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthSelector } from './redux/reducers/login/selectors';
import { currentUser } from './redux/reducers/login/actions';

const routePath = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/',
};

const App: React.FC = () => {
  const isAuth = useSelector(isAuthSelector);
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  // const location = useLocation();

  useEffect(() => {
    currentUser()(dispatch);
  }, [isAuth]);

  return (
    <Router>
      <Switch>
        <Route
          exact
          path={routePath.REGISTER}
          render={(props: any) =>
            isAuth ? <Redirect to={routePath.HOME} /> : <Register {...props} />
          }
        />
        <Route
          exact
          path={routePath.LOGIN}
          render={(props: any) =>
            !isAuth ? <Login {...props} /> : <Redirect to={routePath.HOME} />
          }
        />

        <Route
          exact
          path={routePath.HOME}
          // component={Home}
          render={(props: any) =>
            !isAuth ? <Redirect to={routePath.LOGIN} /> : <Home {...props} />
          }
        />
      </Switch>
    </Router>
  );
};

export default App;
