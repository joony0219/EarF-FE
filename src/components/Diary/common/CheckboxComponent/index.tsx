import React from 'react';
import styles from './styles.module.scss';

interface CheckboxComponentProps {
  label: string;
  isChecked: boolean;
  onChange: () => void;
  tag: string;
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({ label, isChecked, onChange, tag }) => {
  const buttonClass = `${styles.button} ${styles[tag]}`;
  return (
    <div className={styles.container}>
      <input type='checkbox' checked={isChecked} onChange={onChange} className={buttonClass} />
      {label}
    </div>
  );
};

export default CheckboxComponent;
