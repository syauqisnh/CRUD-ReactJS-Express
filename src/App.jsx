import { useState } from "react";
import Form from "./components/Form"
import TableData from "./components/TableData"

const App = () => {
  const [triggerUpdate, setTriggerUpdate] = useState(false); // State untuk memicu pembaruan data
  const [editData, setEditData] = useState(null); 

  const handleEditData = (data) => {
    setEditData(data);
  };


  const updateData = () => {
    setTriggerUpdate((prev) => !prev);
    setEditData(null);
  };
  return( 
      <>
         <div className="flex gap-4 m-20">
         <Form updateData={updateData} editData={editData}/>
          <TableData triggerUpdate={triggerUpdate} handleEditData={handleEditData}/>
         </div>
      </>
         
  )
}

export default App