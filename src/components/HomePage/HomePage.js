import React, { useState } from 'react';
import Title from 'antd/lib/typography/Title';



const HomePage = ({ onSubmit }) => {
  const [name, setName] = useState({
    error: null,
    value: '',
    isTouched: false
  });

  const handleNameChange = e => {
    const { value } = e.target;

  };

  return (
    <div style={{textAlign:"center", marginTop:200, fontSize: 30 }}>
      <Title>Welcome to Autoditt!!</Title>
      <Title>Please Login to Enjoy the site!</Title>
    </div>
  );
};

export default HomePage;
