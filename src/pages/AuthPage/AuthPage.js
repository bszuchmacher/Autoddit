import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Layout } from 'antd';
import { userAuth } from 'actions/userActions';

import styles from './AuthPage.module.css';
import AuthForm from './AuthForm';

const AuthPage = () => {
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    name => {
      dispatch(userAuth(name));
    },
    [dispatch]
  );

  return (
    <Layout className={styles.layout}>
      <Layout.Content className={styles.content}>
        <AuthForm onSubmit={handleSubmit} />
      </Layout.Content>
    </Layout>
  );
};

export default AuthPage;
