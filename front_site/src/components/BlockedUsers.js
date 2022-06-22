import React, { useState, useEffect,  useMemo } from "react";
import DataTable from 'react-data-table-component';
import axios from "axios";


const ServerSideDataTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const fetchUsers = async () => {
      setLoading(true);
  
      const response = await axios.post(
        `http://localhost:3001/api/user/blocked-users`
      );
  
      setData(response.data.data);
      setLoading(false);
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const columns = useMemo(
      () => [
        {
          name: "User",
          selector: "b_first_name",
          cell:(row, index, column, id) =>{
            console.log(row);
            return 'Name : '+ row.b_first_name+' Country : '+row.b_country+' Email : '+row.b_email;
          },
          sortable: true
        },
        {
          name: "Blocked By",
          selector: "first_name",
          cell:(row, index, column, id) =>{
            return 'Name : '+ row.first_name+' Country : '+row.country+' Email : '+row.email;
          },
          sortable: true
        },
        {
          name: "Blocked at",
          selector: "createdAt",
          sortable: true
        }
       
      ],
    );
  
 
  
    return (
      <DataTable
        title="Users"
        columns={columns}
        data={data}
        progressPending={loading}
      />
    );
  };

function BlockedUsers() {

    return (
        <ServerSideDataTable/>
    );
};


export default BlockedUsers;