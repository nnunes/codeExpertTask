import React from 'react';

const Tooltip = ({ name, createdAt, version, size, type }) => (
  <div>
    <p><strong>{name}</strong></p>
    <p>created at: {createdAt}</p>
    <p>version: {version}</p>
    <p>type: {type}</p>
    {size && <p>size: {size}</p> }
  </div>
)


export default Tooltip;