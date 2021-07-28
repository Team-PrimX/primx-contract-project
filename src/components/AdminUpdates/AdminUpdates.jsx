import React from 'react'
import { useState, useEffect } from 'react'
import Select from '@material-ui/core/Select'
import { FormControl, MenuItem } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import AdminUpdateLicenses from './AdminUpdateLicenses'
import AdminUpdateTypes  from './AdminUpdateTypes'
import AdminUpdateShipping from './AdminUpdateShipping'
import AdminUpdateMaterials from './AdminUpdateMaterials'
import SystemAdmin from './SystemAdmin'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';


  

  
export default function AdminUpdates() {
  // defines dispatch
  const dispatch = useDispatch();
  // defines usehistory
  const history = useHistory();
  //holds value of selection to for page render conditionals
  let [selectedPage,setSelectedPage] = useState("");
  //holds values for conditional render boolean
   let [conditionalRender,setConditionalRender] = useState();
   let [conditionalBool,setConditionalBool] = useState(false);

  

  //handles values of selected page change on event change
  const handleSelectPage = (event) => {
    setSelectedPage(event.target.value);
  }

  const renderComponent = () => {
    setConditionalBool(true);
    console.log(selectedPage)

    if (selectedPage == 1) {
      // setConditionalRender(AdminUpdateLicenses)
      history.push('/AdminUpdateLicenses')
    } else if (selectedPage == 2) {
      // setConditionalRender(AdminUpdateTypes)
      history.push('/AdminUpdateTypes')
    } else if (selectedPage == 3) {
      // setConditionalRender(AdminUpdateShipping)
      history.push('/AdminUpdateShipping')

    } else if (selectedPage == 4) {
      // setConditionalRender(AdminUpdateMaterials)
      history.push('/AdminUpdateMaterials')

    } else if (selectedPage == 5) {
      // setConditionalRender(SystemAdmin)
      history.push('/SystemAdmin')
    }
  }

  // fetches companies on page load for update licenses page
  useEffect(() => {
    renderComponent(),dispatch({type: 'FETCH_COMPANIES' });
  },[selectedPage]);


  return (
    <div>
        <h2>Select Update Field</h2>
        {/* drop down for page selection */}
        <FormControl>
        <InputLabel> Select Page </InputLabel>
        <Select value={selectedPage} onChange={handleSelectPage}>
          <MenuItem value={1}>Update Licensees</MenuItem>
          <MenuItem value={2}>Add Floor Types/Placement Types</MenuItem>
          <MenuItem value={3}>Update Shipping Costs</MenuItem>
          <MenuItem value={4} >Update Material Costs/Inventory</MenuItem>
          {/* need to add conditional render for super user for system admin */}
          <MenuItem value={5}>System Admin</MenuItem>
        </Select>
        </FormControl>
        {conditionalBool ? conditionalRender : <></>}
    </div>
  )
}
