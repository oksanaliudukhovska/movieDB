
import { createRoot } from 'react-dom/client'
import s from './index.module.scss'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routes/routes.jsx'
import { Provider } from 'react-redux'
import store from './redux/store/store.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router}>
    <App/>
  </RouterProvider>
</Provider> 
)
