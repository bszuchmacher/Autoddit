import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import styles from './PageLayout.module.css';

const PageLayout = ({ children }) => (
  <Layout className={styles.layout}>{children}</Layout>
);

PageLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default PageLayout;
