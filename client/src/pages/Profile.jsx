import React, { useContext, useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { API } from '../config/api';
import { UserContext } from '../context/userContext';

function Profile() {
  const [state] = useContext(UserContext);
  const [login, setLogin] = useState(false);
  const [transactions, setTransactions] = useState([]);

  async function getTransactions() {
    try {
      const response = await API.get('/user-transactions');
      setTransactions(response.data.transactions);
    } catch (error) {
      console.log(error);
    }
  }
  function status(status) {
    switch (status) {
      case 'pending':
        return (
          <p className="bg-[#fbff0018] px-8 py-0.5 w-fit text-yellow-600 text-xs font-bold rounded-sm float-right">
            Pending
          </p>
        );
      case 'success':
        return (
          <p className="bg-[#00ff4818] px-8 py-0.5 w-fit text-green-600 text-xs font-bold rounded-sm float-right">
            Success
          </p>
        );

      case 'cancel':
        return (
          <p className="bg-[#ff000018] px-8 py-0.5 w-fit text-red-600 text-xs font-bold rounded-sm float-right">
            Cancel
          </p>
        );

      default:
        break;
    }
  }
  useEffect(() => {
    getTransactions();
  }, []);
  return (
    <div>
      <Navigation login={login} setLogin={(val) => setLogin(val)} />
      <div className="px-40 py-10 flex justify-between">
        <div>
          <h1 className="text-[36px] text-white font-bold mb-6">My Profile</h1>
          <div className="flex">
            <img
              className="w-[180px] h-[221px] mr-8"
              src={state.user.url ? state.user.url : '/assets/user.png'}
              alt=""
            />
            <div>
              <div className="mb-6">
                <p className="text-[#CD2E71] font-bold lg:text-xl md:text-sm">
                  Full Name
                </p>
                <p className="text-[#616161] text-[18px]">
                  {state.user.full_name}
                </p>
              </div>
              <div className="mb-6">
                <p className="text-[#CD2E71] font-bold lg:text-xl md:text-sm">
                  Email
                </p>
                <p className="text-[#616161] text-[18px]">
                  {state.user.full_name}
                </p>
              </div>
              <div className="mb-6">
                <p className="text-[#CD2E71] font-bold lg:text-xl md:text-sm">
                  Phone
                </p>
                <p className="text-[#616161] text-[18px]">-</p>
              </div>
            </div>
          </div>
        </div>
        <div className="min-w-[10rem]">
          <h1 className="text-[36px] text-white font-bold mb-6">
            History Transactions
          </h1>
          <div
            style={{ scrollbarWidth: 'thin' }}
            className="max-h-128 overflow-y-auto overflow-x-hidden"
          >
            {transactions?.map((item) => {
              let date = item.createdAt.split('T');

              return (
                <div
                  key={item.id}
                  className="bg-[#CD2E7170] p-4 w-[419px] mb-4"
                >
                  <p className="text-white text-[16px] font-bold">
                    {item.movie.title}
                  </p>
                  <p className="text-[#616161] text-[14px] mb-1">{date[0]}</p>
                  <p className="text-[#CD2E71] font-bold text-xs">
                    Total: {item.price}
                  </p>
                  {status(item.status)}
                  <div className="clear-right"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
