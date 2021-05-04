import React, { useCallback } from 'react';
import { Layout } from 'antd';
import { PageLayout } from 'components';

import styles from './AddPostPage.module.css';
import AddPostForm from './AddPostForm/AddPostForm';
import { useDispatch } from 'react-redux';
import { postsAdd } from 'actions/postsActions';
import { useHistory } from 'react-router-dom';

const AddPostPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const goBack = useCallback(() => history.push('/'), [history]);

  const handleSubmit = postDetails => {
    dispatch(postsAdd(postDetails));

    goBack();
  };

  return (
    <PageLayout>
      <Layout.Content className={styles.content}>
        <AddPostForm onSubmit={handleSubmit} onCancel={goBack} />
      </Layout.Content>
    </PageLayout>
  );
};

export default AddPostPage;
