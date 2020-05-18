import React, { useState } from 'react';
import Tooltip from './Tooltip';
import classNames from 'classnames';

import './DirTree.css';

const DIRECTORY_TYPE = 'inode/directory'

const SingleNodeDisplay = ({ identation, name, readOnly, version, type, createdAt, size, toggleOpen, isOpen }) => (
  <div 
    className={classNames({
      'single-node': true, 
      'single-node--is-clickable': type === DIRECTORY_TYPE })} 
    onClick={() => type === DIRECTORY_TYPE && toggleOpen(!isOpen) }>

    <div className={'ident-with-' + identation}>
      {readOnly ? <p>{name} (R)</p> : <p>{name}</p>}
    </div>
    <div className='single-node__tooltip'>
      <Tooltip 
        name={name}
        version={version}
        type={type}
        createdAt={createdAt}
        size={size}
      /> 
    </div>
  </div>
)

const NodeWithChildrenDisplay = ({ node, identation = 0 }) => {

  const [isOpen, toggleOpen] = useState(true);

  if (!node) {
    return <p>No directory list found</p>
  }

  return (
    <div>
      <SingleNodeDisplay 
        {...node}
        identation={identation} 
        toggleOpen={toggleOpen} 
        isOpen={isOpen} 
      />
      {node.children && isOpen && node.children.map( node => {
        return <NodeWithChildrenDisplay key={node._id} node={node} identation={identation + 1}/>
      })}
    </div>
  )
}

const DirTree = ({ tree }) => {
  return (
    <div className="dirtree">
      <NodeWithChildrenDisplay node={tree} />
    </div>
  );
}

export default DirTree;