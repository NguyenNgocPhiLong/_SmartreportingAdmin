import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './page/Home';
import Sidebar from './compoments/Sidebar';
import Create from './page/Create'; // Import trang Create User
import Update from './page/Update';

function App() {
  const token = 'hardToken';

  return (
    <div>
      {!token ? (
        <div>LoginPage</div>
      ) : (
        <BrowserRouter>
          <Sidebar>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/project" element={<HomePage />} />
              <Route path="/process" element={<HomePage />} />
              <Route path="/task" element={<HomePage />} /> */}
              <Route path="/create-user" element={<Create />} /> {/* Thêm route cho Create User */}
              <Route path="/update/:id" element={<Update />} /> {/* Thêm route cho Update User */}
            </Routes>
          </Sidebar>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
