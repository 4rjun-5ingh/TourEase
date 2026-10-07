import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './app/Home';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* Future routes will be added here per PLAN.md phases */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
