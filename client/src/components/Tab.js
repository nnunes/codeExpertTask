import React from 'react';
import classNames from 'classnames';

import './Tab.css';

const Tab = ({ activeTab, label, onClick }) => {

    return (
      <li className={
          classNames({
            'tab-list-item' : true,
            'tab-list-active': activeTab === label
          })
        }
        onClick={onClick}
      >
        {label}
      </li>
    );
}

export default Tab;