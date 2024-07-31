import useAuth from "./useAuth"
import useOperations from "./useOperations"

const useAdmin = () => {
    const { operation } = useOperations();
    const { auth } = useAuth();
  return operation.creator === auth._id  ;
}

export default useAdmin