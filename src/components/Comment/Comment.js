import React, { useMemo } from 'react';
// import PropTypes from 'prop-types';

import styles from './Comment.module.css';
import dayjs from 'dayjs';
import { Button } from 'antd';
import { Voter } from 'components';

const Comment = ({
  comment,
  prevVote,
  ownsItem,
  onScoreChange,
  onAddComment
}) => {
  const depthStyle = useMemo(
    () => ({
      marginLeft: `${(comment.depth + 1) * 32}px`
    }),
    [comment.depth]
  );

  const timeString = useMemo(
    () => dayjs(comment.createdAt).format('MMM DD, YYYY HH:MM'),
    [comment.createdAt]
  );

  return (
    <div className={styles.container} style={depthStyle}>
      <Voter
        prevVote={prevVote}
        ownsItem={ownsItem}
        className={styles.voter}
        onScoreChange={change =>
          onScoreChange(change, comment.postId, comment.id)
        }
        score={comment.score}
      />
      <div className={styles.contentContainer}>
        <div className={styles.content}>{comment.content}</div>
        <div className={styles.createdAt}>
          Submitted on {timeString} by <b>{comment.createdBy}</b>
        </div>
        <div className={styles.commentSection}>
          <div className={styles.commentsCount}>
            {comment.children.length} comments
          </div>
          <Button
            type="link"
            onClick={onAddComment(comment.postId, comment.id)}
          >
            Add comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
