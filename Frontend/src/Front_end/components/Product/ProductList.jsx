import React, { useContext, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import '../Page/page.scss';
import { BrandContext } from '../Brand/BrandContext';
import { CategoryContext } from '../Category/CategoryContext';
 
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState('default'); 
    const itemsPerPage = 15; 

    const { selectedBrand } = useContext(BrandContext);
    const { selectedCategory } = useContext(CategoryContext);


    useEffect(() => {
      const fetchProducts = async () => {
          setLoading(true);
          try {
              let url = `https://localhost:7061/api/Products?page=${currentPage}&limit=${itemsPerPage}&filter=${selectedFilter}`;
              if (selectedBrand) {
                url += `&brandId=${selectedBrand}`;
              }
              if (selectedCategory) {
                url += `&categoryId=${selectedCategory}`;
              }
              const response = await fetch(url);
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              console.log('API response data:', data);
              setProducts(data.products || []);
              setTotalCount(data.totalCount || 0);
          } catch (error) {
              console.error('Error fetching products:', error);
              setProducts([]); 
          } finally {
              setLoading(false);
          }
      };

      fetchProducts();
  }, [currentPage, selectedFilter,selectedBrand,selectedCategory]);

    const handlePreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        window.scrollTo(0, 0); 
      }
    };
  
    const handleNextPage = () => {
      if (currentPage < totalCount) {
        setCurrentPage(currentPage + 1);
        window.scrollTo(0, 0); 
      }
    };
    const handleFilterChange = (event) => {
      setSelectedFilter(event.target.value);
      setCurrentPage(1);  
  };
  return (
    <div className="container">
      
      <div className="filter-section mb-4">
                <label htmlFor="filter" className="filter-label">Sắp xếp theo:</label>
                <select id="filter" value={selectedFilter} onChange={handleFilterChange} className="filter-select">
                    <option value="default">Mặc định</option>
                    <option value="discount">Hàng khuyến mãi</option>
                    <option value="new">Sản phẩm mới</option>
                    <option value="bestseller">Bán chạy</option>
                    <option value="name-asc">Tên sản phẩm A-Z</option>
                    <option value="name-desc">Tên sản phẩm Z-A</option>
                    <option value="price-desc">Giá giảm dần</option>
                    <option value="price-asc">Giá tăng dần</option>
                </select>
      </div>
       {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <>
      <div className="row"> 
        {products.map(product => (
          <div key={product.id} className="col-12 col-md-4 mb-4  ">
            <ProductCard product={product}/>        
          </div>
          
        ))}
        
      </div>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalCount}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalCount}>
          Next
        </button>
      </div>
      </>
      )}
    </div>
    
  );
};

export default ProductList;
