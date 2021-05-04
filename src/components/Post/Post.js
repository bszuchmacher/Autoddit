import React, { useMemo } from 'react';
// import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import styles from './Post.module.css';
import { Icon, Avatar, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Voter } from 'components';

const getAvatarProps = ({ imageSrc }) =>
  imageSrc
    ? {
        src: imageSrc
      }
    : {
        icon: <Icon type="link" />
      };

const Post = ({
  post,
  prevVote,
  ownsItem,
  onScoreChange,
  onToggleComments,
  onAddComment
}) => {
  const timeString = useMemo(
    () => dayjs(post.createdAt).format('MMM DD, YYYY HH:MM'),
    [post.createdAt]
  );

  return (
    <div className={styles.post}>
      <Voter
        prevVote={prevVote}
        ownsItem={ownsItem}
        className={styles.voter}
        score={post.score}
        onScoreChange={change => onScoreChange(change, post.id)}
      />
      <div className={styles.image}>
        <Avatar {...getAvatarProps(post)} shape="square" style={{height: 68, width: 100}} />
      </div>
      <div className={styles.content}>
        <a target="_blank" href={post.url} rel="noopener noreferrer">
          <Title level={4}>{post.title}</Title>
        </a>
        <div className={styles.createdAt}>
          Submitted on {timeString} by <b>{post.createdBy}</b>
        </div>
        <div className={styles.commentSection}>
          <Button
            type="link"
            disabled={post.commentsCount === 0}
            className={styles.commentsCount}
            onClick={() => onToggleComments(post.id)}
          >
            {post.commentsCount} comments
          </Button>
          <Button type="link" onClick={onAddComment(post.id)}>
            Add comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Post;
