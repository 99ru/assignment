import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from './SearchBar.jsx';

const Customers = () => {
  const [customerData, setCustomerData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`https://startdeliver-mock-api.glitch.me/customer?name=${searchQuery}`);
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, [searchQuery]);

  const handleSearchChange = (newQuery) => {
    setSearchQuery(newQuery);
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <strong>
        <h2 className="text-3xl mb-6 mt-2">Customers</h2>
      </strong>

      <SearchBar onSearchChange={handleSearchChange} />

      {customerData ? (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div>
            <h2 className="text-gray-500 text-sm mb-1">NAME</h2>
            <ul>
              {customerData.map((customer) => (
                <li
                  key={customer.id}
                  className="text-blue-500 cursor-pointer hover:underline pb-1"
                  style={{ textDecoration: "underline" }}
                >
                  {customer.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="ml-auto">
            <h2 className="text-gray-500 text-sm mb-1">ARR</h2>
            <ul>
              {customerData.map((customer) => (
                <li key={customer.id} className="font-bold">
                  {customer.arr}
                </li>
              ))}
            </ul>
          </div>
          <div className="ml-auto mr-2">
            <h2 className="text-gray-500 text-sm mb-1">ID</h2>
            <ul>
              {customerData.map((customer) => (
                <li key={customer.id} className="font-bold">
                  {customer.id}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading customer data...</p>
      )}
    </div>
  );
};

export default Customers;
