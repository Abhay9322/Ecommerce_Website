import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">🛍️ All Products List</h2>

      {/* Header Row */}
      <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-100 border rounded py-2 px-4 text-sm font-semibold text-gray-700">
        <div>Image</div>
        <div>Name</div>
        <div>Category</div>
        <div>Price</div>
        <div className="text-center">Action</div>
      </div>

      {/* Product Rows */}
      <div className="flex flex-col gap-2 mt-2">
        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-3 px-4 py-3 border rounded hover:shadow-sm text-sm bg-white transition"
          >
            <img src={item.image[0]} alt="product" className="w-12 h-12 object-cover rounded" />
            <p className="truncate">{item.name}</p>
            <p>{item.category}</p>
            <p>₹{item.price.toLocaleString('en-IN')}</p>
            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-500 font-bold text-center hover:scale-110 transition-transform"
              title="Remove Product"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
