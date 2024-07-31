import React, { useState, useMemo } from "react";
import useOperations from "../hooks/useOperations";
import PreviewOperations from "../components/PreviewOperations";
import Alerta from "../components/Alerta";

const Operations = () => {
  const { operations, alerta } = useOperations();
  const { msg } = alerta;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedOperations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return operations.slice(startIndex, startIndex + itemsPerPage);
  }, [operations, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(operations.length / itemsPerPage);

  return (
    <>
      <h1 className="font-bold text-4xl">Operations</h1>

      {msg && <Alerta alerta={alerta} />}

      <div className="bg-white rounded-lg shadow mt-10">
        {operations.length ? (
          <>
            {paginatedOperations.map((operation) => (
              <PreviewOperations key={operation._id} operation={operation} />
            ))}
            <div className="flex justify-between items-center mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center uppercase text-gray-600 font-bold p-5">
            There are no operations to show
          </p>
        )}
      </div>
    </>
  );
};

export default Operations;
