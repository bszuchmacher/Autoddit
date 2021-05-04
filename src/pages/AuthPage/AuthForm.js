import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

import styles from './AuthPage.module.css';
import Title from 'antd/lib/typography/Title';
import produce from 'immer';
import { getValidationFunc, rules } from 'utils/validation';

const validateName = getValidationFunc([
  rules.required(),
  rules.max(12)(maxLength => `Sorry, no names longer than ${maxLength} :\\`)
]);

const AuthForm = ({ onSubmit }) => {
  const [name, setName] = useState({
    error: null,
    value: '',
    isTouched: false
  });

  const handleNameChange = e => {
    const { value } = e.target;

    const error = validateName(value);

    setName(
      produce(state => {
        state.isTouched = true;
        state.error = error ? error.message : null;
        state.value = value;
      })
    );
  };

  return (
    <div className={styles.form}>
      <Title>Welcome to Autoditt!!</Title>
      <Title>Please Login to Enjoy the site!</Title>
      <Form.Item
        className={styles.formItem}
        validateStatus={name.isTouched && name.error ? 'error' : 'validating'}
        help={(name.isTouched && name.error) || ''}
      >
        <Input placeholder="Enter your name..." onChange={handleNameChange} />
      </Form.Item>
      <Form.Item>
        
        <Button
          type="primary"
          size="large"
          disabled={!name.isTouched || name.error}
          onClick={() => onSubmit(name.value)}
        >
          That's my name!
        </Button>
      </Form.Item>
    </div>
  );
};

export default Form.create({ name: 'auth' })(AuthForm);
