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
                console.log("Fetched Items:", response.data); // Debugging: check data
                setItems(response.data);
                setFilteredItems(
                    response.data.filter(item => item.status === 'available') // Filter only 'available' items
                );
            } catch (error) {
                console.error('Failed to fetch items:', error);
            }
        };

        fetchItems();
    }, []);

    useEffect(() => {
        if (activeCategory === 'all') {
            setFilteredItems(items.filter(item => item.status === 'available')); // Ensure only 'available' items
        } else {
            setFilteredItems(
                items.filter(item => item.category === activeCategory && item.status === 'available') // Filter by category and status
            );
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
                        <ul className="flex flex-wrap justify-center gap-2 py-10 font-extrabold">
                            <li className={`btn ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => handleCategoryClick('all')}>All</li>
                            <li className={`btn ${activeCategory === 'mochi mantap' ? 'active' : ''}`} onClick={() => handleCategoryClick('mochi mantap')}>Mochi Mantap</li>
                            <li className={`btn ${activeCategory === 'mochi daifuku' ? 'active' : ''}`} onClick={() => handleCategoryClick('mochi daifuku')}>Mochi Daifuku</li>
                        </ul>
                    </div>
                </div>

                <div className="menu__items flex justify-center">
                    <ul className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-12">
                        {filteredItems.map(item => (
                            <li key={item.id} className="item_wrap relative overflow-hidden rounded-xl" onClick={() => handleItemClick(item.id)}>
                                <div className="image-container h-52 w-full bg-primaryColorLight dark:bg-darkColorLight rounded-3xl flex items-center justify-center">
                                    {item.image_urls && item.image_urls.length > 0 ? (
                                        <img src={item.image_urls[0]} alt={item.name} className="h-full w-full object-cover transition-transform transform hover:scale-110 ease-linear duration-200 rounded-3xl" />
                                    ) : (
                                        <span>No image available</span>
                                    )}
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
