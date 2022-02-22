import React, { useContext, useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { io } from 'socket.io-client';
import { UserContext } from '../context/userContext';
import { API } from '../config/api';
let socket;

function Admin() {
  const [login, setLogin] = useState(false);
  const [state] = useContext(UserContext);
  const [transactions, setTransactions] = useState([]);
  function status(status) {
    switch (status) {
      case 'pending':
        return <p className="text-yellow-500">{status}</p>;

      case 'success':
        return <p className="text-green-500">{status}</p>;

      case 'cancel':
        return <p className="text-red-500">{status}</p>;

      default:
        break;
    }
  }
  async function getAllTransactions() {
    try {
      const response = await API.get('/transactions');
      setTransactions(response.data.transactions);
    } catch (error) {
      console.log(error);
    }
  }
  async function approve(id, user_id) {
    try {
      await API.patch('/transaction/' + id, {
        status: 'success',
      });
      socket.emit('status approved', user_id);
      getAllTransactions();
    } catch (error) {
      console.log(error);
    }
  }
  async function cancel(id) {
    try {
      await API.patch('/transaction/' + id, {
        status: 'cancel',
      });

      getAllTransactions();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllTransactions();
    socket = io('http://localhost:5000', {
      query: {
        id: state.user.id,
      },
    });
    socket.on('new transaction', () => {
      getAllTransactions();
    });
  }, []);
  return (
    <div>
      <Navigation login={login} setLogin={(val) => setLogin(val)} />
      <div className="lg:px-40 md:px-20 sm:px-4 py-10">
        <h1 className="text-white text-sm md:text-[28px] font-bold mb-10">
          Incoming Transactions
        </h1>
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full">
                  <thead class="bg-[#1F1F1F] border-b">
                    <tr>
                      <th
                        scope="col"
                        class="text-sm font-medium text-[#E50914] px-6 py-4 text-left"
                      >
                        No
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-[#E50914] px-6 py-4 text-left"
                      >
                        Users
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-[#E50914] px-6 py-4 text-left"
                      >
                        Bukti Transfer
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-[#E50914] px-6 py-4 text-left"
                      >
                        Film
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-[#E50914] px-6 py-4 text-left"
                      >
                        Number Account
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-[#E50914] px-6 py-4 text-left"
                      >
                        Status Payment
                      </th>
                      <th
                        scope="col"
                        class="text-sm font-medium text-[#E50914] px-6 py-4 text-center"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions?.map((item, i) => {
                      if (i % 2 === 0) {
                        return (
                          <tr class="border-b bg-[#2B2B2B]">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                              {i + 1}
                            </td>
                            <td class="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                              {item.user.full_name}
                            </td>
                            <td class="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                              <a
                                href={item.bill}
                                target="_blank"
                                rel="noreferrer"
                              >
                                link
                              </a>
                            </td>
                            <td class="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                              {item.movie.title}
                            </td>
                            <td class="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                              {item.number_account}
                            </td>
                            <td class="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                              {status(item.status)}
                            </td>
                            <td class="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                              {item.status === 'pending' ? (
                                <div className="flex justify-between">
                                  <button
                                    onClick={() => cancel(item.id)}
                                    className="px-6 py-0.5 bg-red-500 rounded-md"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() =>
                                      approve(item.id, item.user_id)
                                    }
                                    className="px-6 py-0.5 bg-green-500 rounded-md"
                                  >
                                    Approve
                                  </button>
                                </div>
                              ) : (
                                <p className="text-center">➖</p>
                              )}
                            </td>
                          </tr>
                        );
                      } else {
                        return (
                          <tr class="border-b bg-[#1F1F1F]">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                              {i + 1}
                            </td>
                            <td class="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                              {item.user.full_name}
                            </td>
                            <td class="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                              <a
                                href={item.bill}
                                target="_blank"
                                rel="noreferrer"
                              >
                                link
                              </a>
                            </td>
                            <td class="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                              {item.movie.title}
                            </td>
                            <td class="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                              {item.number_account}
                            </td>
                            <td class="text-sm text-white font-light px-6 py-4 whitespace-nowrap">
                              {status(item.status)}
                            </td>
                            <td class="text-sm text-white font-light px-6 py-4 whitespace-nowrap ">
                              {item.status === 'pending' ? (
                                <div className="flex justify-between">
                                  <button
                                    onClick={() => cancel(item.id)}
                                    className="px-6 py-0.5 bg-red-500 rounded-md"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() =>
                                      approve(item.id, item.user_id)
                                    }
                                    className="px-6 py-0.5 bg-green-500 rounded-md"
                                  >
                                    Approve
                                  </button>
                                </div>
                              ) : (
                                <p className="text-center">➖</p>
                              )}
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
