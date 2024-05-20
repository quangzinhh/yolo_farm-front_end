// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';
import Logout from './pages/logout/logout';
import ProtectedRoute from './pages/protect/ProtectedRoute';
import { productInputs, userInputs } from './formSource';
import './style/dark.scss';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/infor" element={<ProtectedRoute element={<Logout />} />} />
          <Route path="/users">
            <Route index element={<ProtectedRoute element={<List />} />} />
            <Route
              path=":userId"
              element={<ProtectedRoute element={<Single />} />}
            />
            <Route
              path="new"
              element={<ProtectedRoute element={<New inputs={userInputs} title="Add New User" />} />}
            />
          </Route>
          <Route path="/products">
            <Route index element={<ProtectedRoute element={<List />} />} />
            <Route
              path=":productId"
              element={<ProtectedRoute element={<Single />} />}
            />
            <Route
              path="new"
              element={<ProtectedRoute element={<New inputs={productInputs} title="Add New Product" />} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
