import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./paginas/Login";
import Register from "./paginas/Register";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";
import Operations from "./paginas/Operations";
import NewOperation from "./paginas/NewOperation";
import { AuthProvider } from "./context/AuthProvider";
import { OperationsProvider } from "./context/OperationsProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <OperationsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Register />} />
            </Route>

            <Route path="/operations" element={<ProtectedRoute />}>
              <Route index element={<Operations />} />
              <Route path="new-operation" element={<NewOperation />} />
            </Route>
          </Routes>
        </OperationsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
