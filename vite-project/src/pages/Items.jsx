import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';

const Items = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axiosClient.get('/products');
                console.log(response.data); // Debug: cek data
                setItems(response.data);
                setFilteredItems(response.data);
            } catch (error) {
                console.error('Failed to fetch items:', error);
            }
        };

        fetchItems();
    }, []);

    useEffect(() => {
        if (activeCategory === 'all') {
            setFilteredItems(items);
        } else {
            setFilteredItems(items.filter(item => item.category === activeCategory)); // Pastikan category ada di data produk
        }
    }, [activeCategory, items]);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    const handleItemClick = (itemId) => {
        navigate(`/detailitem/${itemId}`);
    };

    return (
        <section id="more">
            <div className="container">
                <div className="max-w-md mx-auto text-center">
                    <h2 className="section__title">Our Products</h2>
                    <div className="separator mx-auto"></div>

                    <div className="tabs_wrap">
                        <ul className="flex flex-wrap justify-center gap-2 py-10">
                            <li data-tabs="all" className={`btn bg-primaryColorLight dark:bg-darkColorLight ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => handleCategoryClick('all')}>All</li>
                            <li data-tabs="gadget" className={`btn bg-primaryColorLight dark:bg-darkColorLight ${activeCategory === 'gadget' ? 'active' : ''}`} onClick={() => handleCategoryClick('gadget')}>Gadget</li>
                            <li data-tabs="accessories" className={`btn bg-primaryColorLight dark:bg-darkColorLight ${activeCategory === 'accessories' ? 'active' : ''}`} onClick={() => handleCategoryClick('accessories')}>Accessories</li>
                            <li data-tabs="laptop" className={`btn bg-primaryColorLight dark:bg-darkColorLight ${activeCategory === 'laptop' ? 'active' : ''}`} onClick={() => handleCategoryClick('laptop')}>Laptop</li>
                            <li data-tabs="electronic" className={`btn bg-primaryColorLight dark:bg-darkColorLight ${activeCategory === 'electronic' ? 'active' : ''}`} onClick={() => handleCategoryClick('electronic')}>Electronic</li>
                        </ul>
                    </div>
                </div>

                <div className="menu__items">
                    <ul className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-12">
                        {filteredItems.map(item => (
                            <li key={item.id} className="item_wrap relative overflow-hidden rounded-xl" onClick={() => handleItemClick(item.id)}>
                                <div className="image-container h-52 w-full bg-primaryColorLight dark:bg-darkColorLight rounded-3xl flex items-center justify-center">
                                    {/* Menggunakan URL gambar yang disimpan di database */}
                                    <img src={`data:image/jpeg;base64,${item.photo}`} alt={item.name} className="h-full w-full object-cover transition-transform transform hover:scale-110 ease-linear duration-200 rounded-3xl" />
                                </div>
                                <div className="description pt-3 text-center">
                                    <h4 className="card__title uppercase">{item.name}</h4>
                                    <p className="text-secondaryColor">Rp.{item.price}.-</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Items;
