import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';
import { useParams } from 'react-router-dom';
import { HiCheck, HiOutlineX } from "react-icons/hi";

function DetailSubmission() {
    const { id } = useParams();
    const [submission, setSubmission] = useState(null);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosClient.get(`/submissions/${id}`)
            .then(response => {
                setSubmission(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching submission detail:', error);
                setLoading(false);
            });

        axiosClient.get(`/submissions/${id}/members`)
            .then(response => {
                setMembers(response.data.members);
            })
            .catch(error => {
                console.error('Error fetching members detail:', error);
            });
    }, [id]);

    const updateMembersStatus = (newStatus) => {
        const updatedMembers = members.map(member => {
            return { ...member, status: newStatus };
        });
        setMembers(updatedMembers);
    };

    const handleAccept = () => {
        axiosClient.put(`/submissions/${id}`, { status: "accepted" }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setSubmission({ ...submission, status: "accepted" });
                updateMembersStatus("accepted");
                console.log('Status updated:', response.data);
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    };

    const handleReject = () => {
        axiosClient.put(`/submissions/${id}`, { status: "rejected" }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setSubmission({ ...submission, status: "rejected" });
                updateMembersStatus("rejected");
                console.log('Status updated:', response.data);
            })
            .catch(error => {
                console.error('Error updating status:', error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!submission) {
        return <div>No data found for this submission.</div>;
    }

    return (
        <div className="max-w-screen-2xl mx-0 p-8">
            <h5 className="mx-5 text-2xl mb-3 text-left text-gray-500 font-bold tracking-wide">Submission Detail</h5>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 uppercase font-bold text-gray-900">Submission Information</h3>
                </div>
                <div className="border-b text-left capitalize border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 border-r whitespace-nowrap text-sm font-medium text-gray-500">Institution</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.institution}</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r whitespace-nowrap text-sm font-medium text-gray-500">Major</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.major}</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r whitespace-nowrap text-sm font-medium text-gray-500">Start Date</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.start_date}</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r whitespace-nowrap text-sm font-medium text-gray-500">End Date</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.end_date}</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r whitespace-nowrap text-sm font-medium text-gray-500">File Link</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"><a href={submission.file_link} target="_blank" rel="noopener noreferrer" className="underline text-blue-500">{submission.file_link}</a></td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r whitespace-nowrap text-sm font-medium text-gray-500">Status</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${submission.status === "pending"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : submission.status === "accepted"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {submission.status}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-8 capitalize">
                <h3 className="mx-5 text-2xl mb-3 text-left text-gray-500 font-bold tracking-wide">Members</h3>
                <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-4">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left border-r text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left border-r text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                                <th scope="col" className="px-6 py-3 text-left border-r text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left border-r text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th scope="col" className="px-6 py-3 text-left border-r text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y text-left divide-gray-200">
                            {members && members.map((member, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap border-r">{member.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap border-r">{member.gender}</td>
                                    <td className="px-6 py-4 whitespace-nowrap border-r">{member.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap border-r">{member.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${member.status === "pending"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : member.status === "accepted"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                                }`}
                                        >
                                            {member.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="mt-4 flex justify-center gap-3">
                <button
                    onClick={handleAccept}
                    className="inline-flex items-center bg-green-500 text-md px-3 py-1 rounded text-white hover:bg-green-700"
                >
                    <HiCheck className="mr-2" /> Accept
                </button>
                <button
                    onClick={handleReject}
                    className="inline-flex items-center bg-red-500 text-md px-3 py-1 rounded text-white hover:bg-red-700"
                >
                    <HiOutlineX className="mr-2" /> Reject
                </button>
                <button
                    onClick={() => window.history.back()}
                    className="inline-flex items-center bg-gray-400 text-md px-3 py-1 rounded text-white hover:bg-gray-700"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default DetailSubmission;
