import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';

const Contents = () => {
    const [content, setContent] = useState(null);  // Menyimpan satu konten
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newContent, setNewContent] = useState({
        ig_links: '',
        fb_links: '',
        twitter_links: '',
        tiktok_links: '',
        headers: '',
        header_decs: '',
        abouts: '',
        about_decs: '',
        phones: '',
        emails: ''
    });

    const [updatedContent, setUpdatedContent] = useState({
        ig_links: '',
        fb_links: '',
        twitter_links: '',
        tiktok_links: '',
        headers: '',
        header_decs: '',
        abouts: '',
        about_decs: '',
        phones: '',
        emails: ''
    });

    const [selectedColumn, setSelectedColumn] = useState(''); // Track selected column for add/edit

    const fetchContent = async () => {
        try {
            const response = await axiosClient.get('/content');
            setContent(response.data);  // Mengambil satu konten
        } catch (error) {
            setError('Failed to fetch content.');
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (column, value) => {
        setSelectedColumn(column);
        setUpdatedContent({
            [column]: value || '',  // Jika belum ada, set sebagai string kosong
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSuccessMessage(null);
        setError(null);
    };

    const handleCreateOrUpdateContent = async (e) => {
        e.preventDefault();

        // Pastikan nilai kolom tidak kosong
        if (!updatedContent[selectedColumn]) {
            setError(`${selectedColumn} is required.`);
            return;
        }

        try {
            if (content && content[selectedColumn] !== undefined) {
                // Jika konten sudah ada, lakukan update kolom tertentu
                await axiosClient.put(`/content/${selectedColumn}`, { [selectedColumn]: updatedContent[selectedColumn] });
                setSuccessMessage(`${selectedColumn} updated successfully!`);
            } else {
                // Jika konten belum ada, lakukan penambahan kolom
                await axiosClient.post('/content', updatedContent);
                setSuccessMessage(`${selectedColumn} added successfully!`);
            }

            fetchContent(); // Refresh konten setelah update
            closeModal();   // Menutup modal setelah aksi selesai
        } catch (error) {
            setError('Failed to save content.');
        }
    };

    const handleDeleteContentColumn = async (column) => {
        if (!window.confirm(`Are you sure you want to delete this ${column}?`)) {
            return;
        }

        try {
            // Mengosongkan nilai kolom di state lokal terlebih dahulu
            const updatedContent = { ...content, [column]: '' };
            setContent(updatedContent); // Update state konten

            // Memanggil API untuk menghapus kolom dari server
            await axiosClient.put(`/content/${column}`, { [column]: '' });

            setSuccessMessage(`${column} deleted successfully!`);
        } catch (error) {
            setError('Failed to delete column content.');
        }
    };

    useEffect(() => {
        fetchContent();  // Fetch konten saat pertama kali render
    }, []);

    const renderTableData = (column, contentValue) => {
        return (
            <td className="py-3 px-6 text-gray-600">
                {contentValue || "Belum ada data"}
            </td>
        );
    };

    return (
        <section id="contents" className="pt-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-md p-5">
                    <h1 className="text-2xl font-bold mb-6">Content</h1>
                    {error && <div className="text-red-500 mb-3">{error}</div>}
                    {successMessage && <div className="text-green-500 mb-3">{successMessage}</div>}
                    {loading ? (
                        <div className="flex justify-center items-center h-32">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : content ? (
                        <div className="overflow-x-auto rounded-lg">
                            <table className="min-w-full bg-gray-50 rounded-xl shadow">
                                <thead>
                                    <tr>
                                        <th className="py-3 px-6 text-left text-sm font-bold text-black bg-gray-200">Column Name</th>
                                        <th className="py-3 px-6 text-left text-sm font-bold text-black bg-gray-200">Content</th>
                                        <th className="py-3 px-6 text-sm font-bold text-black bg-gray-200 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='text-justify'>
                                    {[
                                        ["IG Links", "ig_links"],
                                        ["FB Links", "fb_links"],
                                        ["Twitter Links", "twitter_links"],
                                        ["Tiktok Links", "tiktok_links"],
                                        ["Header", "headers"],
                                        ["Header Description", "header_decs"],
                                        ["About", "abouts"],
                                        ["About Description", "about_decs"],
                                        ["Phone", "phones"],
                                        ["Email", "emails"]
                                    ].map(([column, field]) => (
                                        <tr key={field}>
                                            <td className="py-3 px-6 text-gray-600">{column}</td>
                                            {renderTableData(field, content[field])}
                                            <td className="py-3 px-6 text-gray-600 text-center">
                                                <button
                                                    className="text-blue-500 hover:text-blue-700 mr-3"
                                                    onClick={() => openEditModal(field, content[field])}
                                                >
                                                    <i className="fa fa-edit"></i>
                                                </button>
                                                <button
                                                    className="text-red-500 hover:text-red-700"
                                                    onClick={() => handleDeleteContentColumn(field)}
                                                >
                                                    <i className="fa fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No content available</p>
                    )}
                </div>

                {/* Edit or Add Content Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center px-5 bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
                            <h2 className="text-lg font-bold mb-4">{content && content[selectedColumn] ? 'Edit' : 'Add'} {selectedColumn}</h2>
                            <form onSubmit={handleCreateOrUpdateContent}>
                                <div className="mb-4">
                                    <label className="font-semibold">{selectedColumn}</label>
                                    <input
                                        type="text"
                                        name={selectedColumn}
                                        value={updatedContent[selectedColumn] || ''}
                                        onChange={(e) => setUpdatedContent({ ...updatedContent, [selectedColumn]: e.target.value })}
                                        placeholder={selectedColumn}
                                        className="border w-full px-3 py-2 rounded"
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Contents;
