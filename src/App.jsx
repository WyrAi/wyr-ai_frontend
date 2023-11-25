import "./App.css";
import CustomRoutes from "./routes";
import {UserContextProvider} from './UserContext';
// import PoBoard from "./pages/PoBoard";
// import Layout from './Layout';
// import Layout from './Layout';
// import TestPo from './pages/TestPo';
// import TestPo from "./pages/TestPo";
// import Report from "./container/Report";
// import Inspection from './pages/Inspection';
// import Home from './pages/Home';
// import InspectionForm from './Components/InspectionForm';
// import Purchase from './pages/Purchase';
// import PurchaseOrder from './Components/PurchaseOrder';
// import ReportVideos from "./pages/ReportVideos";
// import ProtectedRoutes from "./routes/ProtectedRoutes";
// import Menu from "./container/Menu";
// import SignUp from "./pages/SignUp";
// import SignUpRole from "./pages/SignUpRole";
// import CompanyDetails from "./pages/CompanyDetails";
// import Login from "./pages/Login";
// import Layout from "./Layout";
// import Dashboard from "./pages/Dashboard";
// import UserMgt from "./pages/UserMgt";
// import AddUser from "./container/AddUser";
// import ProductOrder from "./pages/ProductOrder";
// import SignUp from './pages/SignUp';
// import CompanyDetails from './pages/CompanyDetails';
// import Login from './pages/Login';
// import Layout from './Layout';
// import Dashboard from './pages/Dashboard';
// import UserMgt from './pages/UserMgt';
// import AddUser from './container/AddUser';
// import ReportVideos from './pages/ReportVideos';
// import Menu from './container/Menu';

const App = () => {
  return (
    <UserContextProvider>
      <CustomRoutes />
    </UserContextProvider>
  );
};

export default App;
