// InboxMenuDesktop.jsx
import React from "react";

function InboxMenuDesktop({
  isOpen,
  filter,
  onFilterChange,
  entries,
  onEntryClick,
  onDeleteEntry,
}) {
  return (
    isOpen && (
      <div className="absolute top-full left-0 mt-2 p-2 bg-white shadow-md rounded min-w-[465px]">
        <div className="flex space-x-2">
          <button
            className={`flex-1 text-gray-400 hover:text-black focus:outline-none ${
              filter === "unread" && "font-bold"
            }`}
            onClick={() => onFilterChange("unread")}
          >
            Unread
          </button>
          <button
            className={`flex-1 text-gray-400 hover:text-black focus:outline-none ${
              filter === "read" && "font-bold"
            }`}
            onClick={() => onFilterChange("read")}
          >
            Read
          </button>
          <button
            className={`flex-1 text-gray-400 hover:text-black focus:outline-none ${
              filter === "all" && "font-bold"
            }`}
            onClick={() => onFilterChange("all")}
          >
            All
          </button>
        </div>
        <div className="mt-2">
          {entries.length > 0 ? (
            <table className="w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border-b">Sender</th>
                  <th className="py-2 px-4 border-b">Subject</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr
                    key={entry.emailId}
                    className="hover:bg-gray-50"
                    onClick={() => onEntryClick(entry.emailId)}
                  >
                    <td className="py-2 px-4 border-b">{entry.teacherEmail}</td>
                    <td className="py-2 px-4 border-b">{entry.subject}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => onDeleteEntry(entry.emailId)}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                      >
                        Fixed
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No inbox entries available.</p>
          )}
        </div>
      </div>
    )
  );
}

export default InboxMenuDesktop;
