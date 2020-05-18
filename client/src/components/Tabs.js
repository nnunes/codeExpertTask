import React, { useState } from 'react';

import Tab from './Tab';
import './Tabs.css';

const Tabs = ({ children }) => {
  
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  return (
    <div className="tabs">
      <ul className="tab-list">
        {children.map((child) => {
          const { label } = child.props;

          return (
            <Tab
              key={label}
              activeTab={activeTab}
              label={label}
              onClick={() => setActiveTab(label)}
            />
          );
        })}
      </ul>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
}

export default Tabs;