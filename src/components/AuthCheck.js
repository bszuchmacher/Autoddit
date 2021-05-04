import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AuthCheck = ({ children }) => {
  const userStore = useSelector(state => state.userStore);
  const history = useHistory();

  useEffect(() => {
    if (!Boolean(userStore.name)) history.replace('/auth');
    else history.replace('/');
  }, [history, userStore.name]);

  return children;
};

AuthCheck.propTypes = {
  children: PropTypes.element
};

export default AuthCheck;
