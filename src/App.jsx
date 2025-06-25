import React from 'react'
import Index from './routes'
import Menueditpage from './pages/Employee/Menueditpage'
import EmployeeNotificationView from './components/Employeenotification'
import Cashierdutypage from './pages/Employee/Cashierdutypage'
import Deliverydutypage from './pages/Employee/Deliverydutypage'
import Witerdutypage from './pages/Employee/Witerdutypage'
import Chefdutypage from './pages/Employee/Chefdutypage'
import Managerdutypage from './pages/Employee/Managerdutypage'
import Employeeattendancepage from './pages/Employee/Employeeattendancepage'
import Employeeprofilepage from './pages/Employee/Employeeprofilepage'
import Customerviewpage from './pages/Employee/Customerviewpage'
import Deliveryregpage from './pages/Employee/Deliveryregpage'
import Employeeregpage from './pages/Employee/Employeeregpage'
import Employeehomepage from './pages/Employee/Employeehomepage'
import Reservationviewpage from './pages/Customer/Reservationviewpage'
import Searchmenupage from './pages/Customer/Searchmenupage'
import Reservationpage from './pages/Customer/Reservationpage'
import Choosepaymentpage from './pages/Customer/Choosepaymentpage'
import Menudetailspage from './pages/Customer/Menudetailspage'
import Customereditprofilepage from './pages/Customer/Customereditprofilepage'
import PaymentPage from './components/Payment'
import Deliverviewpage from './pages/Customer/Deliverviewpage'
import Reviewviewpage from './pages/Customer/Reviewviewpage'
import Complaintregpage from './pages/Customer/Complaintregpage'
import Reviewregpage from './pages/Customer/Reviewregpage'
import Restaurantviewpage from './pages/Customer/Restaurantviewpage'
import Customerregpage from './pages/Customer/Customerregpage'
import Notificationpage from './pages/Customer/Notificationpage'
import Cartpage from './pages/Customer/Cartpage'
import Orderspage from './pages/Customer/Orderpage'
import Menupage from './pages/Customer/Menupage'
import C_homepage from './pages/Customer/C_homepage'
import AdminNotificationView from './components/Adminnotification'
import Reviewlistpage from './pages/Admin/Reviewlistpage'
import Customerlistpage from './pages/Admin/Customerlistpage'
import Adminorderviewpage from './pages/Admin/Adminorderviewpage'
import Employeedetailspage from './pages/Admin/Employeedetailspage'
import Employeeeditpage from './pages/Admin/Employeeeditpage'
import Paymentviewpage from './pages/Admin/Paymentviewpage'
import Complaintviewpage from './pages/Admin/Complaintviewpage'
import Employeeviewpage from './pages/Admin/Employeeviewpage'
import Notificationaddpage from './pages/Admin/Notificationaddpage'
import Cartregpage from './pages/Admin/Cartregpage'
import Restaurantaddpage from './pages/Admin/Restaurantaddpage'
import Menuregpage from './pages/Admin/Menuregpage'
import Admindashboardpage from './pages/Admin/Admindashboardpage'
import ResetPassword from './components/Resetpassword'
import ForgotPassword from './components/Forgotpassword'
import Adminloginpage from './pages/Guest/Adminloginpage'
import Servicepage from './pages/Guest/Servicepage'
import Contactuspage from './pages/Guest/Contactuspage'
import Aboutpage from './pages/Guest/Aboutpage'
import Restaurentpage from './pages/Guest/Restaurentpage'
import Signup from './components/Signup'
import Homepage from './pages/Guest/Homepage'
// import Login from './pages/Login'


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>

        <Route path='/'element={<Homepage/>}/>
        <Route path="/login" element={<LoginPage/>} /> 
        <Route path="/signup" element={<Signup/>} /> 
        <Route path="/restaurants" element={<Restaurentpage/>} /> 
        <Route path="/about" element={<Aboutpage/>} /> 
        <Route path="/contactus" element={<Contactuspage/>} /> 
        <Route path="/services" element={<Servicepage/>} /> 
        <Route path="/adminlogin" element={<Adminloginpage/>} /> 
        <Route path="/forgotpassword" element={<ForgotPassword/>} /> 
        <Route path="/reset-password" element={<ResetPassword/>} /> 





        <Route path="/admin">
        <Route path='dashboard' element={<Admindashboardpage/>} />
        <Route path='menureg' element={<Menuregpage/>} />
        <Route path='restadd' element={<Restaurantaddpage/>} />
        <Route path='cartreg' element={<Cartregpage/>} />
        <Route path='notifreg' element={<Notificationaddpage/>} />
        <Route path='employeeview' element={<Employeeviewpage/>} />
        <Route path='complaintview' element={<Complaintviewpage/>} />
        <Route path='paymentview' element={<Paymentviewpage/>} />
        <Route path='employeeedit/:id' element={<Employeeeditpage/>} />
        <Route path='employeedet/:id' element={<Employeedetailspage/>} />
        <Route path="adminorderview" element={<Adminorderviewpage/>} /> 
        <Route path="customerlist" element={<Customerlistpage/>} /> 
        <Route path="reviewlist" element={<Reviewlistpage/>} /> 
        <Route path='notifications' element={<AdminNotificationView/>} />

        </Route> 



        <Route path="/customer">
        <Route path='chome' element={<C_homepage/>} />
        <Route path='menu' element={<Menupage/>} />
        <Route path='orders' element={<Orderspage/>} />
        <Route path='cartview' element={<Cartpage/>} />
        <Route path='notifications' element={<Notificationpage/>} />
        <Route path='profile' element={<Customerregpage/>} />
        <Route path='restaurantview' element={<Restaurantviewpage/>} />
        <Route path='review/:id' element={<Reviewregpage/>} />
        <Route path='complaint' element={<Complaintregpage/>} />
        <Route path='reviewview/:id' element={<Reviewviewpage/>} />
        <Route path='deliveryview' element={<Deliverviewpage/>} />
        <Route path="payment/:orderId" element={<PaymentPage/>}/>
        <Route path='custedit' element={<Customereditprofilepage/>} />
        <Route path='menudet/:id' element={<Menudetailspage/>} />
        <Route path='choosepayment' element={<Choosepaymentpage/>} />
        <Route path='reservation' element={<Reservationpage/>} />
        <Route path='search' element={<Searchmenupage/>} />
        <Route path='reservationview' element={<Reservationviewpage/>} />

        </Route> 



        <Route path="/employee">
        <Route path='employeehome' element={<Employeehomepage/>} />
        <Route path='employeereg' element={<Employeeregpage/>} />
        <Route path='deliveryreg' element={<Deliveryregpage/>} />
        <Route path='profileview' element={<Customerviewpage/>} />
        <Route path='empprofileview' element={<Employeeprofilepage/>} />
        <Route path='attendancemark' element={<Employeeattendancepage/>} />
        <Route path='managerduty' element={<Managerdutypage/>} />
        <Route path='chefduty' element={<Chefdutypage/>} />
        <Route path='waiterduty' element={<Witerdutypage/>} />
        <Route path='deliveryduty' element={<Deliverydutypage/>} />
        <Route path='cashierduty' element={<Cashierdutypage/>} />
        <Route path='notifications' element={<EmployeeNotificationView/>} />
        <Route path='edit/:id' element={<Menueditpage/>} />


        </Route> 

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App