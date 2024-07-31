import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/clientAxios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const OperationsContext = createContext();

const OperationsProvider = ({ children }) => {
  const [operations, setOperations] = useState([]);
  const [alerta, setAlerta] = useState({});
  const [operation, setOperation] = useState({});
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    const mostrarOperations = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        const { data } = await clientAxios("/operations", config);
        setOperations(data);
      } catch (error) {
        console.log(error);
      }
    };

    mostrarOperations();
  }, [auth]);

  const showAlert = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };

  const submitOperation = async (operation) => {
    if (operation.id) {
      await editarOperation(operation);
    } else {
      await newOperation(operation);
    }
  };

  const newOperation = async (operation) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clientAxios.post("/operations", operation, config);
      setOperations([...operations, data]);
      setAlerta({
        msg: "Operation successfully created ",
        error: false,
      });
      setTimeout(() => {
        setAlerta({});
        navigate("/operations");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOperation = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clientAxios.patch(
        `/operations/${id}`,
        { isDeleted: true },
        config
      );
      const operationsActualizados = operations.filter(
        (operation) => operation._id !== id
      );
      setOperations(operationsActualizados);

      alert(data.msg);

      setTimeout(() => {
        navigate("/operations");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const cerrarSesionOperations = () => {
    setOperations([]);
    setOperation({});
    setAlerta({});
  };

  return (
    <OperationsContext.Provider
      value={{
        operations,
        showAlert,
        alerta,
        submitOperation,
        operation,
        cargando,
        deleteOperation,
        cerrarSesionOperations,
      }}
    >
      {children}
    </OperationsContext.Provider>
  );
};

export { OperationsProvider };

export default OperationsContext;
