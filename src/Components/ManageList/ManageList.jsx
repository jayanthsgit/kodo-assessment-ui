import React, {useState, useEffect} from 'react';
import mockData from '../../Data/mock_data.json';
import '../ManageList/ManageList.css';
import Table from '../Table/Table.jsx';
import moment from 'moment';

const ManageList = () => {

    const data = React.useMemo(
        () => mockData,
        []
      );

    const [tableData, setTableData] = useState([]);
    const columns = React.useMemo(
        () => [
          {
            Header: 'Title',
            accessor: 'name'
          },
          {
            Header: 'Description',
            accessor: 'description'
          },
          {
            Header: 'Last Edited',
            accessor: row => moment(row.dateLastEdited).format('DD-MM-YYYY HH:MM'),
          },
        ],
        []
      );

      useEffect(() => {
        fetch('http://localhost:8081/data').then(response => response.json()).then(data => {
          //console.log('data', data.data)
          setTableData(data.data)}).catch(err=> console.log('err', err));
      }, []);
      

      const handleSearch = (searchValue) => {
        let tData = JSON.parse(JSON.stringify(data));
        let searchData = [];
        if(searchValue.startsWith(`"`)&&searchValue.endsWith(`"`)){
          searchData = tData.filter(e => { return (e.name.toLowerCase().includes(searchValue.split(`"`)[1].toLowerCase()) || e.description.toLowerCase().includes(searchValue.split(`"`)[1].toLowerCase()))});
        } else{
        searchData = tData.filter(e => { 
          return ((searchValue.toLowerCase().split(" ").map(sv => e.name.toLowerCase().includes(sv))[0]) || (searchValue.toLowerCase().split(" ").map(sv => e.description.toLowerCase().includes(sv))[0]))});
        }
        setTableData(searchData);
      };

 return(
<div className="container">
    <h1 style={{margin: "0px 0px 0px 20px"}}>
    Manage List:
    </h1>
    <div className="table-styles">
        <div className="search">
            <h3> Search: </h3>
            <input className="search-input" placeholder="Search" onChange={(e) => handleSearch(e.target.value)}/>
        </div>
    <Table  data={tableData} columns={columns}/>
    </div>
</div>
 );
};

export default ManageList;