import React, { useCallback, useState, useMemo } from 'react';
import { Layout, Button, List, Spin } from 'antd';

import styles from './Feed.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  postsVote,
  postsGet,
  postsCommentAdd,
  postsCommentGet
} from 'actions/postsActions';
import { Post, AddCommentModal, Comment } from 'components';

const Feed = () => {
  const dispatch = useDispatch();
  const userStore = useSelector(state => state.userStore);
  const postsStore = useSelector(state => state.postsStore);

  const [openPosts, setOpenPosts] = useState([]);

  const dataSource = useMemo(
    () =>
      postsStore.data.posts.reduce((res, post) => {
        if (openPosts.includes(post.id)) {
          return [
            ...res,
            post,
            ...(postsStore.data.comments[post.id] || []).map(c => ({
              ...c,
              isComment: true
            }))
          ];
        }

        return [...res, post];
      }, []),
    [openPosts, postsStore.data.comments, postsStore.data.posts]
  );

  const handleScoreChange = useCallback(
    (change, postId, commentId) => () => {
      dispatch(postsVote(change, postId, commentId));
    },
    [dispatch]
  );

  const [idsForModal, setIdsForModal] = useState(null);

  const handleOpenModal = useCallback(
    (postId, commentId = null) => () => setIdsForModal([postId, commentId]),
    []
  );
  const handleCloseModal = useCallback(() => setIdsForModal(null), []);

  const handleToggleComments = useCallback(
    postId =>
      setOpenPosts(state => {
        if (state.includes(postId)) {
          return state.filter(id => id !== postId);
        }

        if (!postsStore.data.comments[postId]) {
          dispatch(postsCommentGet(postId));
        }

        return [...state, postId];
      }),
    [dispatch, postsStore.data.comments]
  );

  const handleAddComment = useCallback(
    comment => {
      dispatch(postsCommentAdd(...idsForModal, comment));
      handleCloseModal();

      setOpenPosts(state => [...state, idsForModal[0]]);
    },
    [dispatch, handleCloseModal, idsForModal]
  );

  const handleLoadMore = useCallback(() => dispatch(postsGet()), [dispatch]);

  return (
   
    <Spin spinning={postsStore.isLoading}>
      <Layout className={styles.layout}>
        <Layout.Content className={styles.content}>
          <Link to="new" className={styles.addBtnLink}>
            <Button className={styles.addBtn}>
              Add
            </Button>
          </Link>
          <List
            itemLayout="horizontal"
            dataSource={dataSource}
            renderItem={item =>
              item.isComment ? (
                <Comment
                  comment={item}
                  prevVote={userStore.voted[item.id]}
                  ownsItem={userStore.name === item.createdBy}
                  onScoreChange={handleScoreChange}
                  onAddComment={handleOpenModal}
                />
              ) : (
                <Post
                  post={item}
                  prevVote={userStore.voted[item.id]}
                  ownsItem={userStore.name === item.createdBy}
                  onScoreChange={handleScoreChange}
                  onToggleComments={handleToggleComments}
                  onAddComment={handleOpenModal}
                />
              )
            }
            loadMore={
              !postsStore.isLoading &&
              !postsStore.isFull && (
                <div className={styles.loadMoreContainer}>
                  <Button className={styles.loadMoreButton} onClick={handleLoadMore}>Load more</Button>
                </div>
              )
            }
          />
        </Layout.Content>
      </Layout>
      <AddCommentModal
        visible={idsForModal !== null}
        onOk={handleAddComment}
        onCancel={handleCloseModal}
      />
    </Spin>
    
  );
};

export default Feed;
