import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../axios-client';

const DetailItem = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await axiosClient.get(`/items/${id}`);
                setItem(response.data);
            } catch (error) {
                console.error('Failed to fetch item:', error);
            }
        };

        fetchItem();
    }, [id]);

    if (!item) {
        return <div>Loading...</div>;
    }

    const handleOrder = () => {
        navigate(`/order/${id}`);
    };

    return (
        <section id="detailitem" className="bg-primaryColorLight py-10 pt-24">
            <div className="container mx-auto px-4 md:px-0">
                <div className="max-w-screen-lg mx-auto bg-primaryColor rounded-3xl shadow-md overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/2">
                            <img
                                src={`data:image/jpeg;base64,${item.photo}`}
                                alt={item.name}
                                className="w-full h-auto object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-t-none"
                                style={{ maxHeight: '400px' }}
                            />
                        </div>
                        <div className="md:w-1/2 p-6 md:py-10">
                            <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
                            <p className="text-lg mb-6">{item.description}</p>
                            <div className="mb-6">
                                <table className="table-auto text-white">
                                    <tbody>
                                        <tr>
                                            <td className="font-semibold pr-2">Stock:</td>
                                            <td>{item.stock}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold pr-2">Price:</td>
                                            <td>{item.price}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold pr-2">Category:</td>
                                            <td>{item.category}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <button
                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                                onClick={handleOrder}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailItem;
