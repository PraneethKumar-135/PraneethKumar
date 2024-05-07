

import React from 'react';

const Tree = [
  {
    "name": "Parent 1",
    "children": [
      {
        "name": "Child1",
        "children": [
          {
            "name": "Grand child 1",
            "children": [
              {
                "name": "Grand Grand child 1",
                "children": []
              },
              {
                "name": "Grand Grand child 2",
                "children": []
              },
              {
                "name": "Grand Grand child 3",
                "children": []
              }
            ]
          },
          {
            "name": "Grand child 2",
            "children": []
          }
        ]
      },
      {
        "name": "Child2",
        "children": [
          {
            "name": "Grand child 1",
            "children": [
              {
                "name": "Grand Grand child 1",
                "children": []
              }
            ]
          },
          {
            "name": "Grand child 2",
            "children": [
              {
                "name": "Grand Grand child 1",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "name": "Child3",
        "children": [
          {
            "name": "Grand child 1",
            "children": [
              {
                "name": "Grand Grand child 1",
                "children": []
              },
              {
                "name": "Grand Grand child 2",
                "children": []
              },
              {
                "name": "Grand Grand child 3",
                "children": []
              }
            ]
          },
          {
            "name": "Grand child 2",
            "children": []
          }
        ]
      },
    ]
  }
];

const ShowData = (data, openNodes, checkbox, handleCheck, handleClick, parentIndex = '') => {
  const childrenData = [];

  if (data) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];

      const isOpen = openNodes[`${element.name}.${index}`] || false;
      // console.log(isOpen);
      const checkboxKey = parentIndex !== '' ? `${parentIndex}.${index}` : `${index}`;
      const isCheckedd = checkbox[checkboxKey]
      // console.log(isCheckedd);

      const handleChange = (e) => {
        const isChecked = e.target.checked;
        handleCheck(element, isChecked, parentIndex);
      };

      childrenData.push(
        <div key={index} style={{ marginLeft: "20px", marginTop: "10px" }}>
          <input type='checkbox' checked={isCheckedd} onChange={handleChange} />
          <button onClick={() => handleClick(element.name, index)}>{element.name}</button>
          {isOpen && ShowData(element.children, openNodes, checkbox, handleCheck, handleClick, checkboxKey)}
        </div>
      );
    }
  }

  return childrenData;
};

const App = () => {
  const [openNodes, setOpenNodes] = React.useState({});
  const [checkbox, setCheckbox] = React.useState({});

  const handleClick = (nodeName, index) => {
    setOpenNodes(prevOpenNodes => ({
      ...prevOpenNodes,
      [`${nodeName}.${index}`]: !prevOpenNodes[`${nodeName}.${index}`]
    }));
  };


  const findIndexInTree = (node, tree, parentIndex = '') => {
    for (let i = 0; i < tree.length; i++) {
      const element = tree[i];
      const currentIndex = parentIndex ? `${parentIndex}.${i}` : `${i}`;

      if (element.name === node.name) {
        return currentIndex;
      }

      if (element.children && element.children.length > 0) {
        const childIndex = findIndexInTree(node, element.children, currentIndex);
        if (childIndex !== null) {
          return childIndex;
        }
      }
    }
    return null;
  };

    const handleCheck = (node, isChecked, parentIndex = '') => {
      const updatedCheckbox = { ...checkbox };
      console.log(node);

      const nodeIndex = findIndexInTree(node, Tree);
      if (nodeIndex === null) {
        console.error('Node not found in the tree');
      }
      console.log(nodeIndex);


      function updateChildCheckbox(children, parentIndex = '') {
        children.forEach((child, index) => {
          const childCheckboxKey = parentIndex !== '' ? `${parentIndex}.${index}` : `${index}`;
          updatedCheckbox[childCheckboxKey] = isChecked;
          if (child.children && child.children.length > 0) {
            updateChildCheckbox(child.children, childCheckboxKey);
          }
        });
      }

      if (!isChecked) {
        let parentCheckboxKey = nodeIndex;
        while (parentCheckboxKey) {
          updatedCheckbox[parentCheckboxKey] = false;
          parentCheckboxKey = getParentCheckboxKey(parentCheckboxKey);
        }
      }
      if (isChecked) {
        let parentCheckboxKey = nodeIndex;
        while (parentCheckboxKey) {
          updatedCheckbox[parentCheckboxKey] = true;
          parentCheckboxKey = getParentCheckboxKey(parentCheckboxKey);
        }
      }

      updatedCheckbox[nodeIndex] = isChecked;
      updateChildCheckbox(node.children, nodeIndex);
      setCheckbox(updatedCheckbox);
    }


    function getParentCheckboxKey(checkboxKey) {
      const lastDotIndex = checkboxKey.lastIndexOf('.');
      if (lastDotIndex !== -1) {
        return checkboxKey.slice(0, lastDotIndex);
      }
      return null;
    }


  return (
    <div>
      {ShowData(Tree, openNodes, checkbox, handleCheck, handleClick)}
    </div>
  );
};

export default App;
