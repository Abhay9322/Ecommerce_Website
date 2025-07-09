import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="border-t pt-10 px-4 md:px-10 flex flex-col sm:flex-row gap-10 bg-white">

      {/* Left Filters Panel */}
      <div className="sm:w-64">
        <div
          onClick={() => setShowFilter(!showFilter)}
          className="text-xl font-semibold mb-4 cursor-pointer flex items-center justify-between sm:justify-start gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="Toggle"
            className={`w-4 sm:hidden transform transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`}
          />
        </div>

        <div className={`${showFilter ? 'block' : 'hidden'} sm:block space-y-6`}>
          {/* Category Filter */}
          <div className="border rounded-lg p-4">
            <p className="font-medium mb-3 text-sm">CATEGORIES</p>
            <div className="space-y-2 text-sm text-gray-700">
              {['Men', 'Women', 'Kids'].map((cat, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input type="checkbox" value={cat} onChange={toggleCategory} className="accent-blue-600" />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Subcategory Filter */}
          <div className="border rounded-lg p-4">
            <p className="font-medium mb-3 text-sm">TYPE</p>
            <div className="space-y-2 text-sm text-gray-700">
              {['Topwear', 'Bottomwear', 'Winterwear'].map((type, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input type="checkbox" value={type} onChange={toggleSubCategory} className="accent-blue-600" />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Products Panel */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Title text1="ALL" text2="COLLECTIONS" />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border text-sm px-4 py-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="relavent">Sort by: Relevance</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Collection;
