import React from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ labelLeft, labelRight, leftChecked, rightChecked, onChangeLeft, onChangeRight }) => {
  return (
    <div className="toggle-switch">
      <label className={`toggle-label ${leftChecked ? 'active' : ''}`} onClick={onChangeLeft}>
        {labelLeft}
      </label>
      <label className={`toggle-label ${rightChecked ? 'active' : ''}`} onClick={onChangeRight}>
        {labelRight}
      </label>
    </div>
  );
};

export default ToggleSwitch;

