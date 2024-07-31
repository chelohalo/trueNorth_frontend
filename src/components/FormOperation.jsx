import { useState } from "react";
import useOperations from "../hooks/useOperations";
import Alerta from "./Alerta";
import useAuth from "../hooks/useAuth";

const FormOperation = () => {
  const [operand1, setOperand1] = useState("");
  const [operand2, setOperand2] = useState("");
  const [operator, setOperator] = useState("+");
  const [result, setResult] = useState(null);

  const { showAlert, alerta, submitOperation } = useOperations();
  const { auth, updateBalance } = useAuth();

  const handleCalculate = async (e) => {
    e.preventDefault();
    let calcResult;
    const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2);

    switch (operator) {
      case "+":
        calcResult = num1 + num2;
        break;
      case "-":
        calcResult = num1 - num2;
        break;
      case "x":
        calcResult = num1 * num2;
        break;
      case "/":
        calcResult = num2 !== 0 ? num1 / num2 : "Error: Division by zero";
        break;
      case "sqrt":
        calcResult = Math.sqrt(num1);
        break;
        case 'rand':
          try {
            const response = await fetch(import.meta.env.VITE_RANDOM_ORG_URL);
            const data = await response.text();
            calcResult = data.trim();
          } catch (error) {
            console.error('Error fetching random generator:', error);
            calcResult = 'Error fetching random generator';
          }
          break;
      default:
        calcResult = "Invalid operation";
    }

    if (
      operator !== "sqrt" &&
      operator !== "rand" &&
      [operand1, operand2].includes("")
    ) {
      showAlert({
        msg: "All fields are required",
        error: true,
      });
      return;
    }

    if (operator === "sqrt" && operand1 === "") {
      showAlert({
        msg: "Operand 1 is required for square root",
        error: true,
      });
      return;
    }

    if (auth.credit < 10) {
      showAlert({
        msg: "Not enough credit to perform the operation",
        error: true,
      });
      return;
    }

    try {
      await updateBalance(10);
      setResult(calcResult);
      await submitOperation({ operand1, operand2, operator, calcResult });
    } catch (error) {
      console.error("Error during calculation:", error);
      showAlert({
        msg: "Error updating balance",
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <div>
      {msg && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <h1 className="font-bold text-lg mb-2">
          Each operation has a cost of 10 points, it will be deducted from your
          credit
        </h1>
        <div className="flex flex-col md:flex-row items-center">
          <select
            className="border w-full md:w-1/4 p-2 m-2 placeholder-gray-400 rounded-md"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
          >
            <option value="+">Addition</option>
            <option value="-">Subtraction</option>
            <option value="x">Multiplication</option>
            <option value="/">Division</option>
            <option value="sqrt">Square Root</option>
            <option value="rand">Random</option>
          </select>
          <div className="flex flex-col md:flex-row items-center w-full md:w-3/4">
            {operator !== "rand" && (
              <>
                <input
                  type="number"
                  placeholder="Operand 1"
                  className="border w-full p-2 m-2 placeholder-gray-400 rounded-md"
                  value={operand1}
                  onChange={(e) => setOperand1(e.target.value)}
                />
                {operator !== "sqrt" && (
                  <input
                    type="number"
                    placeholder="Operand 2"
                    className="border w-full p-2 m-2 placeholder-gray-400 rounded-md"
                    value={operand2}
                    onChange={(e) => setOperand2(e.target.value)}
                  />
                )}
              </>
            )}
          </div>
        </div>
        <button
          type="button"
          className="bg-green-500 w-full p-3 uppercase font-bold text-white rounded-md cursor-pointer hover:bg-green-600 transition-colors"
          onClick={handleCalculate}
        >
          Calculate
        </button>
        {result !== null && (
          <div className="mt-4 text-xl font-bold">Result: {result}</div>
        )}
      </div>
    </div>
  );
};

export default FormOperation;
