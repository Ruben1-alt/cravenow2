import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';

import { logoutAction } from '../REDUX/userSlice';
import pic12 from '../assets/images/admindash.webp';
import { orderviewallAPI } from '../Services/adminServices';
import { getallreservationAPI } from '../Services/employeeServices';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      dispatch(logoutAction());
      sessionStorage.removeItem('token');
      navigate('/login');
    }
  };

  // Fetch order and reservation data
  const { data: allOrders = [], isLoading: loadingOrders } = useQuery({
    queryKey: ['allOrders'],
    queryFn: orderviewallAPI,
  });

  const { data: allReservations = [], isLoading: loadingReservations } = useQuery({
    queryKey: ['allReservations'],
    queryFn: getallreservationAPI,
  });

  // Process Monthly Order Data for Bar Chart
  const monthlySales = Array(12).fill(0);
  allOrders.forEach(order => {
    const month = new Date(order.createdAt).getMonth();
    monthlySales[month]++;
  });

  const barData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
    datasets: [
      {
        label: 'Monthly Orders',
        data: monthlySales,
        backgroundColor: 'rgba(99, 122, 255, 0.5)',
      },
    ],
  };

  // Process Daily Order Count for Line Chart
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dailyOrders = Array(7).fill(0);
  allOrders.forEach(order => {
    const day = new Date(order.createdAt).getDay();
    dailyOrders[day]++;
  });

  const lineData = {
    labels: weekDays,
    datasets: [
      {
        label: 'Orders Per Day',
        data: dailyOrders,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // Compare Reservations vs Deliveries in Pie Chart
  const deliveryCount = allOrders.length;
  const reservationCount = allReservations.length;

  const pieData = {
    labels: ['Reservations', 'Deliveries'],
    datasets: [
      {
        data: [reservationCount, deliveryCount],
        backgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* NAVBAR */}
      <nav className="bg-gray-900 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">CraveNow Admin</h1>
          <div className="flex space-x-4">
            <button onClick={() => navigate('/admin/menureg')} className="bg-blue-600 px-4 py-2 rounded-md hover:bg-pink-700 transition">
              🍽️ Menu
            </button>
            <button onClick={() => navigate('/employee/employeereg')} className="bg-green-600 px-4 py-2 rounded-md hover:bg-pink-700 transition">
              🧑‍💼 Employee
            </button>
            <button onClick={() => navigate('/admin/paymentview')} className="bg-yellow-600 px-4 py-2 rounded-md hover:bg-pink-700 transition">
              💳 Payment
            </button>
            <button onClick={() => navigate('/admin/notifications')} className="bg-white px-4 py-2 rounded-md hover:bg-pink-700 transition">
              🔔
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-gray-700 px-4 py-2 rounded-md transition"
          >
            🚪 Logout
          </button>
        </div>
      </nav>

      {/* HERO HEADER */}
      <div
        className="relative bg-cover bg-center h-40 flex items-center justify-center text-white text-center px-6"
        style={{ backgroundImage: `url(${pic12})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold">Welcome to CraveNow Admin Panel</h2>
          <p className="text-md mt-2">Manage your restaurant seamlessly with real-time insights.</p>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className="container mx-auto py-6 px-4">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Views</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button onClick={() => navigate('/admin/adminorderview')} className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center space-y-2 hover:shadow-lg transition">
            <span className="text-3xl">📦 Orders</span>
          </button>
          <button onClick={() => navigate('/admin/customerlist')} className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center space-y-2 hover:shadow-lg transition">
            <span className="text-3xl">👥 Customers</span>
          </button>
          <button onClick={() => navigate('/admin/reviewlist')} className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center space-y-2 hover:shadow-lg transition">
            <span className="text-3xl">⭐ Review</span>
          </button>
          <button onClick={() => navigate('/admin/complaintview')} className="bg-white shadow-md p-4 rounded-lg flex flex-col items-center space-y-2 hover:shadow-lg transition">
            <span className="text-3xl">⚠️ Complaints</span>
          </button>
        </div>
      </div>

      {/* ANALYTICS SECTION */}
      <div className="container mx-auto py-6 px-4">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Analytics</h3>
        {loadingOrders || loadingReservations ? (
          <p className="text-gray-600 text-center">Loading analytics...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h4 className="text-md font-medium mb-2">📊 Monthly Orders</h4>
              <Bar data={barData} />
            </div>
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h4 className="text-md font-medium mb-2">📈 Orders Per Day</h4>
              <Line data={lineData} />
            </div>
            <div className="bg-white shadow-md p-4 rounded-lg">
              <h4 className="text-md font-medium mb-2">🥗 Order Type Split</h4>
              <Pie data={pieData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
