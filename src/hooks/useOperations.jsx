import { useContext } from "react";
import OperationsContext from "../context/OperationsProvider";

const useOperations = () => {
    return useContext(OperationsContext);
};
export default useOperations;

