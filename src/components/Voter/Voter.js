import React from 'react';
import PropTypes from 'prop-types';

import styles from './Voter.module.css';
import { Icon } from 'antd';

const noop = () => {};
const cn = (...classes) => classes.filter(Boolean).join(' ');

const Voter = ({
  score,
  prevVote,
  ownsItem,
  onScoreChange,
  className = ''
}) => {
  return (
    <div className={cn(className, styles.score)}>
      <Icon
        type="caret-up"
        onClick={prevVote !== 1 && !ownsItem ? onScoreChange(1) : noop}
        className={cn((ownsItem || prevVote === 1) && styles.disableVote)}
      />
      <div className={cn(score < 0 && styles.negativeScore)}>{score}</div>
      <Icon
        type="caret-down"
        onClick={prevVote !== -1 && !ownsItem ? onScoreChange(-1) : noop}
        className={cn((ownsItem || prevVote === -1) && styles.disableVote)}
      />
    </div>
  );
};

export default Voter;
