import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';

import styles from './AddCommentModal.module.css';
import { getValidationFunc, rules } from 'utils/validation';
import produce from 'immer';

const validateComment = getValidationFunc([rules.required()]);

const autoSizeProps = {
  minRows: 5
};

const initialCommentState = {
  value: '',
  isTouched: false,
  error: null
};

const AddCommentModal = ({ visible = false, onOk, onCancel }) => {
  const [comment, setComment] = useState(initialCommentState);

  const handleCommentChange = useCallback(e => {
    const { value } = e.target;

    const error = validateComment(value);

    setComment(
      produce(state => {
        state.isTouched = true;
        state.error = error ? error.message : null;
        state.value = value;
      })
    );
  }, []);

  const handleOkClick = useCallback(() => {
    onOk(comment.value);

    setComment(initialCommentState);
  }, [comment.value, onOk]);

  const okButtonProps = useMemo(
    () => ({
      disabled: !comment.isTouched || comment.error
    }),
    [comment.error, comment.isTouched]
  );

  return (
    <Modal
      visible={visible}
      title="Add comment"
      okText="Save"
      okButtonProps={okButtonProps}
      onOk={handleOkClick}
      onCancel={onCancel}
      closable={false}
    >
      <Form.Item
        className={styles.formItem}
        validateStatus={
          comment.isTouched && comment.error ? 'error' : 'validating'
        }
        help={(comment.isTouched && comment.error) || ''}
      >
        <Input.TextArea
          autoSize={autoSizeProps}
          value={comment.value}
          onChange={handleCommentChange}
        />
      </Form.Item>
    </Modal>
  );
};

export default AddCommentModal;
