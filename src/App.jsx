
import { Outlet } from 'react-router'
import s from './App.module.scss'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  console.log("Current pathname in App:", location.pathname);
  return (
    <div className={s.App}>
      <Header/>
      <Outlet className={s.content}/>
      <Footer/>
    </div>
  )
}

export default App
