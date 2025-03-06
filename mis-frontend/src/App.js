import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./component/register/Register";
import Login from "./component/login/Login";
import ProtectedRoute from "./component/protectedRoute/ProtectedRoute";
import Dashboard from "./component/dashboard/Dashboard";
import ForgotPassword from "./component/forgotPassword/ForgotPassword";

function App() {
  return (
    // <h1>Hii Kaushik</h1>
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
