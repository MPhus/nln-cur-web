import Home from './pages/Homes/Home'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Store from './pages/Store/Store'
import Other from './pages/Other/Other'
import Detail from '~/pages/Detail/Detail'
import Cart from '~/pages/Cart/Cart'
import Login from './pages/Login/Login'
import Management from './pages/Management/Management'
import Admin from './pages/Admin/Admin'
import Checkout from './pages/Checkout/Checkout'
import NotFound from './pages/NotFound/NotFound'
import VerifyOrder from './pages/Veriry/VerifyOrder'
import { isEmpty } from 'lodash'
// import ConfirmOrder from './pages/ConfirmOrder/ConfirmOrder'

const ProtectCheckOutRoute = () => {
  const item = JSON.parse(localStorage.getItem('cartItems'))
  if (isEmpty(item)) {
    return (
      <Navigate to="/" replace={true} />
    )
  }
  return (
    <Outlet />
  )
}
const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  if (!user) {
    return (
      <Navigate to="/login" replace={true} />
    )
  }
  return (
    <Outlet />
  )
}
const ProtectedRouteAdmin = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  if (!user) {
    return (
      <Navigate to="/login" replace={true} />
    )
  } else if (!user.isAdmin) {
    return (
      <Navigate to="/employee" replace={true} />
    )
  }
  return (
    <Outlet />
  )
}
const AuthorizeRoute = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  if (user) {
    let toRoute = '/employee'
    if (user.isAdmin) {
      toRoute = '/admin'
    } return (
      <Navigate to={toRoute} replace={true} />
    )
  }
  return (
    <Outlet />
  )
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/store-tops' element={<Store type={'top'} />} />
      <Route path='/store-bottoms' element={<Store type={'bottom'} />} />
      <Route path='/store/:id' element={<Detail />} />
      <Route path='/other' element={<Other />} />
      <Route path='/cart' element={<Cart />} />

      <Route element={<AuthorizeRoute />}>
        <Route path='/login' element={<Login />} />
      </Route>

      <Route element={<ProtectedRouteAdmin />}>
        <Route path='/admin' element={<Admin />} />
      </Route>

      {/* <Route path='/confirm/:payMethod' element={<ConfirmOrder />} /> */}
      <Route path='/verifyMail/:token' element={<VerifyOrder />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/employee' element={<Management />} />
      </Route>
      <Route element={<ProtectCheckOutRoute />}>
        <Route path='/checkout' element={<Checkout />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
