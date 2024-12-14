import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiDiscountPercentFill } from "react-icons/ri";
import axiosClient from '../axios-client';

const Items = () => {
    const [items, setItems] = useState([]);
    const [promos, setPromos] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItemsAndPromos = async () => {
            try {
                // Ambil data produk
                const productsResponse = await axiosClient.get('/products');
                setItems(productsResponse.data);
                // console.log("Products:", productsResponse.data); // Log produk untuk verifikasi

                // Ambil data promo
                const promosResponse = await axiosClient.get('/promos');
                setPromos(promosResponse.data);
                // console.log("Promos:", promosResponse.data); // Log promo untuk verifikasi

                // Filter produk yang tersedia
                setFilteredItems(productsResponse.data.filter(item => item.status === 'available'));
            } catch (error) {
                console.error('Failed to fetch items or promos:', error);
            }
        };

        fetchItemsAndPromos();
    }, []);

    useEffect(() => {
        if (activeCategory === 'all') {
            setFilteredItems(items.filter(item => item.status === 'available'));
        } else {
            setFilteredItems(
                items.filter(item => item.category === activeCategory && item.status === 'available')
            );
        }
    }, [activeCategory, items]);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    const handleItemClick = (itemId) => {
        navigate(`/detailitem/${itemId}`);
    };

    const getDiscountedPrice = (item) => {
        // console.log('Checking promo for product', item.name); // Log nama produk
        // console.log('Promo IDs:', promos.map(promo => promo.id_product)); // Log ID produk pada promo

        const currentPromo = promos.find(promo => promo.id_product === item.id && promo.status === 'available');

        // console.log('Current Promo:', currentPromo); // Log promo yang ditemukan

        if (currentPromo) {
            const discount = currentPromo.discount;
            const priceBeforeDiscount = item.price;
            const discountedPrice = priceBeforeDiscount - (priceBeforeDiscount * (discount / 100));

            return { priceBeforeDiscount, discountedPrice, discount };
        }
        return null;
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
                        {filteredItems.map(item => {
                            const discountInfo = getDiscountedPrice(item);
                            return (
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
                                        <p className="text-secondaryColor">
                                            {discountInfo ? (
                                                <>
                                                    <div className="flex items-center justify-center">
                                                        <span className="line-through text-gray-400">
                                                            <i className="fas fa-ban mr-2"></i>Rp.{discountInfo.priceBeforeDiscount}.- {/* Icon untuk harga dicoret */}
                                                        </span>
                                                        <span className="text-red-500 font-semibold ml-4">
                                                            <i className="fas fa-percent mr-2"></i>{discountInfo.discount}% {/* Icon untuk diskon */}
                                                        </span>
                                                    </div>
                                                    <span className="text-green-500 font-bold text-lg">
                                                        <i className="fas fa-tag mr-2"></i>Rp.{discountInfo.discountedPrice.toFixed(2)}.- {/* Icon untuk harga promo */}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="font-semibold text-lg">
                                                    <i className="fas fa-tag mr-2"></i>Rp.{item.price}.- {/* Icon untuk harga normal */}
                                                </span>
                                            )}
                                        </p>
                                    </div>

                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Items;
