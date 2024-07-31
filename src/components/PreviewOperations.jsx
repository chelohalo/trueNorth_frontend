import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useOperations from '../hooks/useOperations';

const PreviewOperations = ({ operation }) => {
  const { auth } = useAuth();
  const { deleteOperation } = useOperations(); // Import the deleteOperation function from your context
  const { creator, operand1, operand2, operator, calcResult } = operation;
  console.log(operation, operator)

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteOperation(operation._id); // Call the deleterOperation function with the project ID
    }
  };

  return (
    <div className='border-b p-5 flex flex-col md:flex-row justify-between'>
      <div className='flex-1 flex justify-between items-center gap-2'>
        <p className='font-bold'>
          {operand1} {operator} {operand2} = {calcResult}
        </p>
        <button 
          onClick={handleDelete} 
          className='bg-red-400 text-white px-4 py-2 rounded ml-auto'>
          Delete
        </button>
      </div>
    </div>
  );
};

export default PreviewOperations;
