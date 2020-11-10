import React from 'react';
import { Button as AntButton } from 'antd';

import styles from './Button.module.css';

const Button: React.FC = (props) => {
  return <AntButton className={styles.button} {...props} />;
};

export default Button;
