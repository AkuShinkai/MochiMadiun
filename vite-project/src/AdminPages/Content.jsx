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
        emails: '',
        alamat: ''
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
        emails: '',
        alamat: ''
    });

    const [selectedColumn, setSelectedColumn] = useState(''); // Melacak kolom yang dipilih untuk ditambah/edit

    const fetchContent = async () => {
        try {
            const response = await axiosClient.get('/content');
            setContent(response.data);  // Mengambil satu konten
        } catch (error) {
            setError('Gagal mengambil konten.');
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
            setError(`${selectedColumn} harus diisi.`);
            return;
        }

        try {
            if (content && content[selectedColumn] !== undefined) {
                // Jika konten sudah ada, lakukan update kolom tertentu
                await axiosClient.put(`/content/${selectedColumn}`, { [selectedColumn]: updatedContent[selectedColumn] });
                setSuccessMessage(`${selectedColumn} berhasil diperbarui!`);
            } else {
                // Jika konten belum ada, lakukan penambahan kolom
                await axiosClient.post('/content', updatedContent);
                setSuccessMessage(`${selectedColumn} berhasil ditambahkan!`);
            }

            fetchContent(); // Refresh konten setelah update
            closeModal();   // Menutup modal setelah aksi selesai
        } catch (error) {
            setError('Gagal menyimpan konten.');
        }
    };

    const handleDeleteContentColumn = async (column) => {
        if (!window.confirm(`Apakah Anda yakin ingin menghapus ${column} ini?`)) {
            return;
        }

        try {
            // Mengosongkan nilai kolom di state lokal terlebih dahulu
            const updatedContent = { ...content, [column]: '' };
            setContent(updatedContent); // Update state konten

            // Memanggil API untuk menghapus kolom dari server
            await axiosClient.put(`/content/${column}`, { [column]: '' });

            setSuccessMessage(`${column} berhasil dihapus!`);
        } catch (error) {
            setError('Gagal menghapus kolom konten.');
        }
    };

    useEffect(() => {
        fetchContent();  // Ambil konten saat pertama kali render
    }, []);

    const renderTableData = (column, contentValue) => {
        return (
            <td className="py-3 px-6 text-gray-600 border-b-2">
                {contentValue || "Belum ada data"}
            </td>
        );
    };

    return (
        <section id="contents" className="pt-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-md p-5">
                    <h1 className="text-2xl font-bold mb-6">Konten</h1>
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
                                        <th className="py-3 px-6 text-left text-sm font-bold text-black bg-gray-200">Nama Kolom</th>
                                        <th className="py-3 px-6 text-left text-sm font-bold text-black bg-gray-200">Konten</th>
                                        <th className="py-3 px-6 text-sm font-bold text-black bg-gray-200 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className='text-justify border-b-2'>
                                    {[
                                        ["Tautan IG", "ig_links"],
                                        ["Tautan FB", "fb_links"],
                                        ["Tautan Twitter", "twitter_links"],
                                        ["Tautan Tiktok", "tiktok_links"],
                                        ["Header", "headers"],
                                        ["Deskripsi Header", "header_decs"],
                                        ["Tentang", "abouts"],
                                        ["Deskripsi Tentang", "about_decs"],
                                        ["Telepon", "phones"],
                                        ["Email", "emails"],
                                        ["Alamat", "alamat"]
                                    ].map(([column, field]) => (
                                        <tr key={field}>
                                            <td className="py-3 px-6 text-gray-600 border-b-2">{column}</td>
                                            {renderTableData(field, content[field])}
                                            <td className="py-3 px-6 text-gray-600 text-center border-b-2">
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
                        <p>Tidak ada konten yang tersedia</p>
                    )}
                </div>

                {/* Modal Edit atau Tambah Konten */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center px-5 bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
                            <h2 className="text-lg font-bold mb-4">{content && content[selectedColumn] ? 'Edit' : 'Tambah'} {selectedColumn}</h2>
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
                                        Batal
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                    >
                                        Simpan Perubahan
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
