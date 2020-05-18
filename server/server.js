const express = require('express');
const cors = require("cors");
const fs = require('fs');

const { processNode } = require('./application/processTree');

const app = express();
const port = 9000;

/** these variables should come as an arg **/
const FILENAME = '../data.json';
const ACCESS_TYPE = 'student';
const ROOT_DIR = '.';

app.use(cors());
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

app.get('/', (req, res) => {
    fs.readFile(FILENAME, (err, data) => {
    
        if (err) throw err;

        let dirTree;
        const allNodes = JSON.parse(data);
    
        dirTree = allNodes.find(node => node.name === ROOT_DIR && node.current);
        
        dirTree = processNode(ACCESS_TYPE, allNodes, dirTree);
    
        //logTree();
        res.json(dirTree);
    });
})

/**
 * for debug
 *
const logTree = () => {
    dirTree.children.forEach(child1 => {
        console.log('  ' + child1.name)
        if (child1.children) {
            child1.children.forEach(child2 => {
                console.log('    ' + child2.name)
                if (child2.children) {
                    child2.children.forEach(child3 => {
                        console.log('        ' + child3.name)
                    })
                }
            })
        }
    })
}
*/

module.exports = app;