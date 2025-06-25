import React from 'react'
import EmployeeDetails from '../../components/Employeedetails'
import GuestFooter from '../../components/Guestfooter'
import { useParams } from 'react-router-dom';

function Employeedetailspage() {
  const { id } = useParams();
  return (
<>

<EmployeeDetails id={id}/>
<GuestFooter/>
</>  )
}

export default Employeedetailspage