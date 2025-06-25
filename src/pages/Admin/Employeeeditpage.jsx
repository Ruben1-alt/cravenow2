import React from 'react'
import EmployeeEdit from '../../components/Employeeedit'
import GuestFooter from '../../components/Guestfooter'
import { useParams } from 'react-router-dom';

function Employeeeditpage() {
  const { id } = useParams();
  return (
<>
<EmployeeEdit id={id}/>
<GuestFooter/>

</>  )
}

export default Employeeeditpage