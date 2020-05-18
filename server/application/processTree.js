const omit = require('lodash.omit');

const DIRECTORY_TYPE = 'inode/directory';
const KEYS_TO_HIDE = ['originKey', 'originVersion', 'userId', 'projectId', 'key', 'current', 'fileId', 'permissions'];

const hasReadAccess = (accessType, permissions) => {
    return permissions.read.includes(accessType);
}
const hasWriteAccess = (accessType, permissions) => {
    return permissions.write.includes(accessType);
}
const isDirectory = (node) => {
    return node === DIRECTORY_TYPE;
}

const sortArray = (arr) => {
    return arr.sort((a, b) => {
        const aIsDir = isDirectory(a.type);
        const bIsDir = isDirectory(b.type);
        if (aIsDir !== bIsDir) {        
           return (aIsDir ? -1 : 1);       
        }                                     
        return a.name.localeCompare(b.name);   
    });
}

const populateChildNodes = (accessType, allNodes, children) => {
    const childrenArray = children.reduce( (acc, id) => {
        
        let childNode = allNodes.find(node => node.key === id && node.current);

        childNode = processNode(accessType, allNodes, childNode);

        if (childNode) {
            acc.push(childNode);
        }
        return acc;
    }, []);

    return sortArray(childrenArray);
}

const processNode = (accessType, allNodes, currentNode) => {

    if (!hasReadAccess(accessType, currentNode.permissions)) {
        return null;
    }
    if (!hasWriteAccess(accessType, currentNode.permissions)) {
        currentNode.readOnly = true;
        //currentNode.name = currentNode.name + ' (r)'; //done in UI
    }

    currentNode = omit(currentNode, KEYS_TO_HIDE);

    if (isDirectory(currentNode.type) && currentNode.children.length) {
        return {
            ...currentNode,
            children: populateChildNodes(accessType, allNodes, currentNode.children)
        }
    }
    return { ...currentNode };
}

module.exports = {
    processNode
};