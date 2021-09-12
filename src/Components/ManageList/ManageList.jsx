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

    const [tableData, setTableData] = useState(data);
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
        fetch('https://kodo-assessment-api.herokuapp.com/data', {
          method: 'GET',
          //mode: 'no-cors',
          headers:{
            "Access-Control-Allow-Origin": "https://kodo-assessment-api.herokuapp.com",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
          }
        }).then(response => response.json()).then(data => console.log('data', data)).catch(err=> console.log('err', err));
      }, [data]);
      

      const handleSearch = (searchValue) => {
        //console.log('searchValue', searchValue);
        let tData = JSON.parse(JSON.stringify(data));
        let searchData = [];
        if(searchValue.startsWith(`"`)&&searchValue.endsWith(`"`)){
          //console.log('phrase', searchValue, 'searchValue', searchValue.split(`"`)[1].toLowerCase());
          searchData = tData.filter(e => { return (e.name.toLowerCase().includes(searchValue.split(`"`)[1].toLowerCase()) || e.description.toLowerCase().includes(searchValue.split(`"`)[1].toLowerCase()))});
        } else{
          //searchValue.toLowerCase().split(" ").forEach(sv => console.log('sv', sv));
        searchData = tData.filter(e => { 
          //console.log('search', ((searchValue.toLowerCase().split(" ").map(sv => e.name.toLowerCase().includes(sv))[0]) || (searchValue.toLowerCase().split(" ").map(sv => e.description.toLowerCase().includes(sv))[0])));
          return ((searchValue.toLowerCase().split(" ").map(sv => e.name.toLowerCase().includes(sv))[0]) || (searchValue.toLowerCase().split(" ").map(sv => e.description.toLowerCase().includes(sv))[0]))});
        }
        //console.log('tData', tData, 'searchData', searchData);
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