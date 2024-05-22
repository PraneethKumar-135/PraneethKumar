import React, { useState } from 'react'
const columns = [
  {
    label: "ID",
    key: "index",
    IdRetrival: (Data) => { alert(`Id ${Data}`) }
  },
  {
    label: "Requester Name",
    key: "requesterName",
    NameBold: (Data, age) => {
      const color = age > 30 ? "red" : "green";
      return (<span style={{ fontWeight: "bold", color }} onClick={() => alert(`Requester Name: ${Data}`)}>{Data}</span>)
    }
  },
  {
    label: "Subjects",
    key: "subject",
  },
  {
    label: "Age",
    key: "age",
    AgeBold: (Data) => {
      const color = Data > 30 ? "red" : "green";
      return (<span style={{ fontWeight: "bold", color }} onClick={() => alert(`Age: ${Data}`)}>{Data}</span>);
    },
  }
]

const data = [
  { index: "27", requesterName: "Rodney Artichoke", subject: "I need help with aading a New Contact....", age: "34" },
  { index: "39", requesterName: "Chaplain Mondover", subject: "I need help with aading a New Contact data to be pre...", age: "45" },
  { index: "47", requesterName: "Rodney Artichoke", subject: "Mobile Campaign", age: "27" },
  { index: "52", requesterName: "Inverness McKenzie", subject: "Service related announcements", age: "58" },
  { index: "87", requesterName: "Douglas Lyphe", subject: "I need help with aading a New Contact....", age: "41" },
  { index: "92", requesterName: "Theodore Handle", subject: "Adding a payment methods", age: "63" },
  { index: "27", requesterName: "Rodney Artichoke", subject: "I need help with aading a New Contact....", age: "22" },
  { index: "27", requesterName: "Rodney Artichoke", subject: "I need help with aading a New Contact....", age: "37" },
  { index: "39", requesterName: "Chaplain Mondover", subject: "I need help with aading a New Contact data to be pre...", age: "50" },
  { index: "47", requesterName: "Rodney Artichoke", subject: "Mobile Campaign", age: "29" },
  { index: "52", requesterName: "Inverness McKenzie", subject: "Service related announcements", age: "55" },
  { index: "87", requesterName: "Douglas Lyphe", subject: "I need help with aading a New Contact....", age: "39" },
  { index: "92", requesterName: "Theodore Handle", subject: "Adding a payment methods", age: "68" },
  { index: "27", requesterName: "Rodney Artichoke", subject: "I need help with aading a New Contact....", age: "26" },
  { index: "27", requesterName: "Rodney Artichoke", subject: "I need help with aading a New Contact....", age: "31" },
  { index: "39", requesterName: "Chaplain Mondover", subject: "I need help with aading a New Contact data to be pre...", age: "43" },
  { index: "47", requesterName: "Rodney Artichoke", subject: "Mobile Campaign", age: "32" },
  { index: "52", requesterName: "Inverness McKenzie", subject: "Service related announcements", age: "60" },
  { index: "87", requesterName: "Douglas Lyphe", subject: "I need help with aading a New Contact....", age: "47" },
  { index: "92", requesterName: "Theodore Handle", subject: "Adding a payment methods", age: "72" },
  { index: "27", requesterName: "Rodney Artichoke", subject: "I need help with aading a New Contact....", age: "20" }
];





function Table(Data, Coloumn, currentPage, pagenation, open, handleOpen, sortConfig) {
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
  // console.log(activeColumns);m

  const idSorting = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedData = [...data].sort((a, b) => {
      if (!isNaN(a[key]) && !isNaN(b[key])) {
        return direction === 'ascending' ? Number(a[key]) - Number(b[key]) : Number(b[key]) - Number(a[key]);
      } else {
        if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
      }
    });

    handleOpen(sortedData, { key, direction });
  };

  return (
    <table style={{
      border: "2px solid black",
      margin: "10px",
      borderCollapse: "collapse"
    }}>
      <thead>
        <tr>
          {activeColumns.map((column, index) => (
            <th key={index} style={{ border: '1px solid black', padding: '10px', cursor: 'pointer' }} onClick={() => idSorting(column.key)}>
              {column.label}
              {sortConfig.key === column.key ? (sortConfig.direction === 'ascending' ? ' ⬆️' : ' ⬇️') : null}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {currentData.map((data, index) => {

          return (
            <tr key={index}>
              {activeColumns.map((coloumn, index) => {
                return (
                  <td key={index} style={{ border: "1px solid black", padding: "5px" }}>
                    {coloumn.key === "index" ? (
                      <span
                        style={{ backgroundColor: "Black", color: "White", cursor: "pointer" }}
                        onClick={() => coloumn.IdRetrival(data[coloumn.key])}
                      >
                        {data[coloumn.key]}
                      </span>
                    ) : coloumn.key === "requesterName" ? (
                      coloumn.NameBold(data[coloumn.key], data["age"])
                    ) :
                      coloumn.key === "age" ? (
                        coloumn.AgeBold(data[coloumn.key])
                      ) : (
                        data[coloumn.key]
                      )}
                  </td>
                );
              })}
            </tr>
          )
        })}


      </tbody>
    </table >
  )
}
const App = () => {
  const [Data, setData] = useState(data);
  const [Coloumn, setColoumn] = useState(columns);
  const [currentPage, setcurrentPage] = useState(1)
  const [pagenation, setPagenation] = useState(5);
  const [open, setOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState({ key: 'index', direction: 'ascending' });
  const [search, setsearch] = useState('');
  const handleOpen = (sortedData, KeyDirection) => {
    setOpen(!open);
    setData(sortedData);
    setSortConfig(KeyDirection)
  };
  const totalPages = Math.ceil(Data.length / pagenation);

  const Increase = () => {
    setcurrentPage(currentPage + 1)
  }
  const Decrease = () => {
    setcurrentPage(currentPage - 1)
  }
  const handlePagenationChange = (e) => {
    setPagenation(parseInt(e.target.value));
  }

  const handlePageClick = (page) => {
    setcurrentPage(page);
  };
  const handleSearch = (searchData) => {
    setsearch(searchData);
    const filteredData = data.filter((item) =>
      Object.values(item).some((value) =>
        typeof value === 'string' && value.toLowerCase().includes(searchData.toLowerCase())
      )
    );
    setData(filteredData);
  };


  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          style={{
            margin: '0 2px',
            padding: '5px 10px',
            borderRadius: '3px',
            backgroundColor: currentPage === i ? '#007bff' : '#fff',
            color: currentPage === i ? '#fff' : '#000',
            border: '1px solid #ddd',
            cursor: 'pointer'
          }}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };



  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
      <label>Search: <input onChange={(e) => handleSearch(e.target.value)} /></label>
      {Table(Data, Coloumn, currentPage, pagenation, open, handleOpen, sortConfig)}
      <div>
        <select style={{ marginRight: "20px", width: "50px", height: "20px" }} onChange={handlePagenationChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
        </select>
        <button style={{ marginRight: "10px" }} onClick={Decrease} disabled={currentPage === 1}>Previous</button>
        {renderPageNumbers()}
        <button style={{ marginLeft: "10px" }} onClick={Increase} disabled={currentPage >= totalPages}>Next</button>
      </div>
    </div>
  )
}

export default App






