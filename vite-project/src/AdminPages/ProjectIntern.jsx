import React, { useEffect, useState } from 'react';
import { HiPencil, HiEye, HiTrash } from "react-icons/hi2";
import Searchbar from '../component/Searchbar';
import axiosClient from '../axios-client';

const TABS = [
  { label: "All", value: "all" },
];

function ProjectIntern() {
  const [activeTab, setActiveTab] = useState(TABS[0].value);
  const [projects, setProjects] = useState([]);
  const TABLE_HEAD = ["No", "Name", "Education", "Start", "End", "description", "repository", "Action"];

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axiosClient.get('/projects/all');
      setProjects(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const filteredData = projects;

  const handleRead = (project) => {
    console.log('Read project:', project);
  };

  const handleDelete = async (projectId) => {
    try {
      await axiosClient.delete(`/projects/${projectId}`);
      setProjects(projects.filter(project => project.id !== projectId));
      console.log('Delete project:', projectId);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className='overflow-x-auto'>
      <h5 className="mx-5 text-xl text-left text-gray-500 font-bold tracking-wide">Project Intern</h5>
      <div className='max-sm m-5 rounded-xl shadow-md mb-6 mt-4 bg-white'>
        <div className="flex items-center pt-5 justify-between mx-5">
          <Searchbar />
        </div>
        <div className="overflow-x-auto bg-transparent m-4 p-4">
          <table className='w-full text-left'>
            <thead>
              <tr className='border border-solid border-l-0 border-r-0 text-center'>
                {TABLE_HEAD.map((head) => (
                  <th className='text-sm text-gray-400 tracking-wide uppercase p-3 border-r border-l' key={head}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map(({ id, name, education, start_date, end_date, repository, description }, index) => {
                const isLast = index === projects.length - 1;
                const rows = isLast ? "p-4 border" : "p-4 border-b border border-blue-gray-50";
                return (
                  <tr key={id} className='border-t text-gray-500 text-sm'>
                    <td className={rows}>{index + 1}</td>
                    <td className={rows}>{name}</td>
                    <td className={rows}>{education}</td>
                    <td className={rows}>{start_date}</td>
                    <td className={rows}>{end_date}</td>
                    <td className={rows}>{description}</td>
                    <td className={rows}>
                      <a href={repository} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline hover:font-bold">
                        Repository
                      </a>
                    </td>
                    <td className='border text-center'>
                      <div className="inline-flex gap-2">
                        <button onClick={() => handleRead({ id, name, education, start_date, end_date, repository, description })}>
                          <HiEye className="text-gray-600" />
                        </button>
                        <button onClick={() => handleDelete(id)}>
                          <HiTrash className="text-gray-600" />
                        </button>
                        <button>
                          <HiPencil className="text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProjectIntern;
