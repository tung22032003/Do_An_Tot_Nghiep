import React, { useContext, useEffect, useState } from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Categories.scss';
import { CategoryContext } from './CategoryContext';
import InfiniteScroll from 'react-infinite-scroll-component';


const Categories = () => {
    const [searchTerm, setSearchTerm] = useState('');   
    const [categoriesData, setCategoriesData] = useState([]);
    const [displayedCategories, setDisplayedCategories] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const { setSelectedCategory } = useContext(CategoryContext);
    useEffect(() => {
        fetch('https://localhost:7061/api/Categories')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCategoriesData(data);
                    setDisplayedCategories(data.slice(0, 8));
                } else {
                    console.error('Dữ liệu không đúng định dạng', data);
                }
            })
            .catch(error => console.error('Lỗi khi lấy dữ liệu danh mục:', error));
    }, []);
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
    };
    const fetchMoreData = () => {
        if (displayedCategories.length >= categoriesData.length) {
            setHasMore(false);
            return;
        }
        const newCategories = categoriesData.slice(displayedCategories.length, displayedCategories.length + 8);
        setDisplayedCategories([...displayedCategories, ...newCategories]);
    };
    const filteredCategoriesData = categoriesData.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="categories-wrapper">
            <div className="search-container-categories">
                <input 
                    type="text"
                    placeholder="Tìm kiếm sản phẩm"
                    className="search-bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search search-icon"></i>
            </div>
            <div className="categories-container">
                <div className="category-container">
                    <h2>Danh Mục</h2>
                    {filteredCategoriesData.length > 0 ? (
                        <InfiniteScroll
                        dataLength={filteredCategoriesData.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        
                        endMessage={<p>Bạn đã xem hết danh mục.</p>}
                    >
                        <ul className="category-list">
                            {filteredCategoriesData.map((category) => (
                                <li key={category.id} className="category-item" onClick={() => handleCategoryClick(category.id)}>
                                    <a href="#">{category.name}</a>
                                </li>
                            ))}
                        </ul>
                    </InfiniteScroll>
                    ) : (
                        <p>Không có danh mục nào</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Categories;
