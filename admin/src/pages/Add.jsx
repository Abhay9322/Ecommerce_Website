import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-5 bg-white rounded shadow-sm">

      {/* Upload Images */}
      <div>
        <p className="font-medium mb-2">Upload Images</p>
        <div className="flex gap-4 flex-wrap">
          {[image1, image2, image3, image4].map((img, i) => {
            const setter = [setImage1, setImage2, setImage3, setImage4][i];
            return (
              <label key={i} htmlFor={`image${i + 1}`} className="cursor-pointer w-24 h-24 border rounded overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={!img ? assets.upload_area : URL.createObjectURL(img)}
                  alt=""
                />
                <input onChange={(e) => setter(e.target.files[0])} type="file" id={`image${i + 1}`} hidden />
              </label>
            );
          })}
        </div>
      </div>

      {/* Product Name */}
      <div>
        <p className="mb-2 font-medium">Product Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-lg px-4 py-2 border rounded outline-none"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Description */}
      <div>
        <p className="mb-2 font-medium">Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-lg px-4 py-2 border rounded outline-none"
          rows="4"
          placeholder="Write product details"
          required
        />
      </div>

      {/* Category, SubCategory, Price */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="flex-1">
          <p className="mb-2 font-medium">Category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded">
            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>

        <div className="flex-1">
          <p className="mb-2 font-medium">Sub Category</p>
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full px-3 py-2 border rounded">
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Winterwear</option>
          </select>
        </div>

        <div className="flex-1">
          <p className="mb-2 font-medium">Price</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2 font-medium">Available Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                )
              }
              className={`px-4 py-1 rounded cursor-pointer border ${sizes.includes(size) ? 'bg-pink-100 border-pink-300' : 'bg-gray-100'
                }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Mark as Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-32 py-2 px-4 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
