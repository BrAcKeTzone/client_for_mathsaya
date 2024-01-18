import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import "../../../../assets/styles/hideVerticalScrollbar.css";
import ModalAddSection from "../Modals/ModalAddSection";

function T_Sections({ teacherId, server_url, handleClickSection }) {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuerySections, setSearchQuerySections] = useState("");
  const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);

  const openAddSectionModal = () => {
    setIsAddSectionModalOpen(true);
  };

  const closeAddSectionModal = () => {
    setIsAddSectionModalOpen(false);
  };

  useEffect(() => {
    fetchSections(teacherId);
  }, [teacherId, server_url]);

  const fetchSections = async (teacherId) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${server_url}/sections/list/${teacherId}`
      );
      setSections(response.data);
    } catch (error) {
      console.error("Error fetching sections:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSection = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this section?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`${server_url}/sections/delete/${id}`, {});
      fetchSections(teacherId);
    } catch (error) {
      alert(error);
    }
  };

  const filteredSections = sections.filter((section) => {
    const { schoolYear, sectionName } = section;
    const searchValue = searchQuerySections.toLowerCase();
    return (
      schoolYear.toString().toLowerCase().includes(searchValue) ||
      sectionName.toString().toLowerCase().includes(searchValue)
    );
  });

  const handleSearchChangeSections = (e) => {
    setSearchQuerySections(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-white text-6xl pt-4 pb-2">SECTIONS</h1>
        <div className="flex items-center mt-4 md:mt-0 md:ml-4">
          <input
            type="text"
            placeholder="Search Sections"
            value={searchQuerySections}
            onChange={handleSearchChangeSections}
            className="p-2 border rounded"
          />
          <button
            className="ml-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={openAddSectionModal}
          >
            ADD NEW
          </button>
        </div>
      </div>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        {isLoading ? (
          <span className="loader"></span>
        ) : (
          filteredSections.length > 0 &&
          filteredSections.map((section) => (
            <div
              key={section.sectionId}
              className="flex flex-col bg-blue-500 rounded-t-none rounded-b mr-2 overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              <button
                onClick={() => {
                  handleClickSection(section.sectionId);
                }}
              >
                <div className="p-4 flex flex-col h-full min-h-24">
                  <div className="text-xl font-bold mb-2">
                    {section.schoolYear}
                  </div>
                  <div className="text-base">{section.sectionName}</div>
                </div>
              </button>
              <div className="flex justify-center p-2 border-t-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 p-2 rounded mx-1"
                  onClick={() => {
                    console.log(
                      `Edit button clicked for section ${section.sectionId}`
                    );
                  }}
                >
                  <FaRegEdit className="text-xl" />
                </button>
                <button
                  className="bg-red-500 hover:bg-red-400 p-2 rounded mx-1"
                  onClick={() => handleDeleteSection(section.sectionId)}
                >
                  <FaTrashAlt className="text-xl" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <ModalAddSection
        teacherId={teacherId}
        server_url={server_url}
        isOpen={isAddSectionModalOpen}
        closeModal={closeAddSectionModal}
        fetchSections={fetchSections}
      />
    </>
  );
}

export default T_Sections;
