import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import Header from './components/header/Header';
import routes from './routes';
import { useRoutes } from 'react-router-dom';
export default function App() {
  const router = useRoutes(routes)
  return (
    <div className="app d-flex justify-content-between w-100">
    <Sidebar />

    <div className="main">
      <Header />
      {router}
    </div>
    </div>
  );
}
