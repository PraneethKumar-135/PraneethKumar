import React, { useState } from 'react'
const columns = [
  {
    label: "ID",
    key: "index"
  },
  {
    label: "Requester Name",
    key: "requesterName",
  },
  {
    label: "Subjects",
    key: "subject",
  },
  {
    label: "Status",
    key: "status",
  }
]

const data = [
  {
    index: "#27",
    requesterName: "Rodney Artichoke",
    subject: "I need help with aading a New Contact....",
    // status: "Pending"
  },
  {
    index: "#39",
    requesterName: "Chaplain Mondover",
    subject: "I need help with aading a New Contact data to be pre...",
  },
  {
    index: "#47",
    requesterName: "Rodney Artichoke",
    subject: "Mobile Campaign"
  },
  {
    index: "#52",
    requesterName: "Inverness McKenzie",
    subject: "Service related announcements"
  },
  {
    index: "#87",
    requesterName: "Douglas Lyphe",
    subject: "I need help with aading a New Contact...."
  },
  {
    index: "#92",
    requesterName: "Theodore Handle",
    subject: "Adding a payment methods"
  },
  {
    index: "#27",
    requesterName: "Rodney Artichoke",
    subject: "I need help with aading a New Contact...."
  }
]





function Table(Data, Coloumn, currentPage, pagenation) {
  // console.log(Data);
  // console.log(Coloumn);

  // const Coloumndata = [];
  // const Bodydata = [];
  // for (let index = 0; index < Coloumn.length; index++) {
  //   const ColoumnElement = Coloumn[index];
  //   console.log(ColoumnElement);
  //   Coloumndata.push(
  //     <div>
  //       <div key={index}>{ColoumnElement.label}</div>
  //     </div>
  //   )
  //   for (let index = 0; index < data.length; index++) {
  //     const DataElement = data[index];
  //     console.log(DataElement);
  //     Bodydata.push(
  //       <div>
  //         <div>
  //           {DataElement.index}
  //           {DataElement.requesterName}
  //           {DataElement.subject}
  //         </div>
  //       </div>
  //     )
  //   }
  // }
  // return (
  //   <>
  //     <div style={{ display: "flex"}}>
  //       {Coloumndata}
  //     </div>
  //     <div>
  //       {Bodydata}
  //     </div>
  //   </>
  // );

  const startIndex = (currentPage - 1) * pagenation;
  const endIndex = startIndex + pagenation;
  const currentData = Data.slice(startIndex, endIndex);
  // console.log(currentData);
  const activeColumns = Coloumn.filter(column =>
    Data.find(dataItem => column.key in dataItem)
  );
  // console.log(activeColumns);
  return (
    <table style={{
      border: "2px solid black",
      margin: "10px",
      borderCollapse: "collapse"
    }}>
      <thead>
        <tr>
          {activeColumns.map((coloumn, index) => {
            return <th key={index} style={{
              border: '1px solid black',
              padding: '10px',
            }}>
              {/* {coloumn.key ? coloumn.label : null} */}
              {coloumn.label}
            </th>
          })}
        </tr>
      </thead>
      <tbody>
        {currentData.map((data, index) => {
          return (
            <tr key={index}>
              {activeColumns.map((coloumn, index) => {
                return <td key={index} style={{ border: '1px solid black', padding: '5px' }}>{data[coloumn.key]}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
const App = () => {
  const [Data, setData] = useState(data);
  const [Coloumn, setColoumn] = useState(columns);
  const [currentPage, setcurrentPage] = useState(1)
  const [pagenation, setPagenation] = useState(5);
  const totalPages = Math.ceil(Data.length / pagenation);
  const Increase = () => {
    setcurrentPage(currentPage + 1)
  }
  const Decrease = () => {
    setcurrentPage(currentPage - 1)
  }

  return (
    <div>
      {Table(Data, Coloumn, currentPage, pagenation)}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
        <button onClick={Decrease} disabled={currentPage === 1}>Previous</button>
        <span>CurrentPage<span style={{border:"1px solid black", padding:"3px", borderRadius:"4px",marginLeft:"5px"}}>{currentPage}</span></span>
        <button onClick={Increase} disabled={currentPage >= totalPages}>Next</button>
      </div>
    </div>
  )
}

export default App

