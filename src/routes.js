import Products from './components/products/Products'
import Comments from './components/comments/Comments'
import Users from './components/users/Users'
import Orders from './components/orders/Orders'
import Offers from './components/offers/Offers'
let routes = [
    {path:'/',element:<Products/>},
    {path:'/products',element:<Products/>},
    {path:'/comments',element:<Comments/>},
    {path:'/users',element:<Users/>},
    {path:'/orders',element:<Orders/>},
    {path:'/offers',element:<Offers/>},
]

export default routes