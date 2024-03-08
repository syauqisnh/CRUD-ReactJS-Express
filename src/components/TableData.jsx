import { useState, useEffect } from "react";
import axios from "axios";
import { useSnackbar } from 'notistack';

// eslint-disable-next-line react/prop-types
const TableData = ({ triggerUpdate, handleEditData }) => {
    const [data, setData] = useState([])
    
    const { enqueueSnackbar } = useSnackbar();

    const getData = async () => {
     await axios.get('http://localhost:3002/crud/get_all').then((res) => {
        setData(res.data)

     }).catch((err) => {
        console.log(err)
     })
}

const handleEdit = async (data) => {
    // Panggil fungsi handleEditData yang diteruskan dari props
    handleEditData(data);
}

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:3002/crud/${id}`)
        enqueueSnackbar('Data berhasil dihapus', {
            variant: 'success',
            autoHideDuration: 2000, 
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'right'
            }
          });
        getData()
    }
 
useEffect(() => {
    getData();
  }, [triggerUpdate]); 
    return(
        <table className="table w-[60%]">
        {/* head */}
        <thead>
          <tr>
            
            <th>Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return(
                <>
                    <tr>
          
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
                <div>
                  <div className="font-bold">{`${item.firstName} ${item.lastName}`}</div>
                </div>
              </div>
            </td>
           
            <th>
              <div className="btn btn-ghost btn-xs">{item.email}</div>
            </th>
            <th className="">
                <button onClick={() => handleEdit(item)} className="btn btn-warning mr-1">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="btn btn-error">Delete</button>
            </th>
          </tr>
                </>
            )
          })}
        </tbody>
      </table>
    )
}

export default TableData;