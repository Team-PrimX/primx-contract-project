import React from 'react'

//import components
import AdminUpdates from './AdminUpdates';
import SystemAdminUpdateUsersGrid from './SystemAdminUpdateUsersGrid';
import AdminRegisterForm from '../AdminRegisterForm/AdminRegisterForm';

export default function SystemAdmin() {


  return (
    <div>
      <div>
        {/* shows nav dropdown */}
        <AdminUpdates />
      </div>

      <div>
        <AdminRegisterForm />
      </div>

      {/* providing some spacing */}
      <br></br>
      <br></br>

      <div>
        {/* grid component where all of the info and work is happening */}
        <SystemAdminUpdateUsersGrid />
      </div>
    </div>
  )
}
