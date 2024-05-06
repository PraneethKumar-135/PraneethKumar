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



  const handleCheck = (node, isChecked, parentIndex = '') => {
    const updatedCheckbox = { ...checkbox };
    console.log(node);

    function updateChildCheckbox(children, parentIndex = '') {
      children.forEach((child, index) => {
        const checkboxKey = parentIndex !== '' ? `${parentIndex}.${index}` : `${index}`;
        console.log(checkboxKey);
        updatedCheckbox[checkboxKey] = isChecked;
        if (child.children && child.children.length > 0) {
          updateChildCheckbox(child.children, checkboxKey);
        }
      });
    }

    updateChildCheckbox([node], parentIndex);
    setCheckbox(updatedCheckbox);
  };


  return (
    <div>
      {ShowData(Tree, openNodes, checkbox, handleCheck, handleClick)}
    </div>
  );
};

export default App;