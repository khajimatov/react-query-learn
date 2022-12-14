import React from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import {
  Outlet,
  RouterProvider,
  Link,
  createReactRouter,
  createRouteConfig,
} from '@tanstack/react-router'
import axios from 'axios'



const rootRoute = createRouteConfig({
  component: () => (
    <>
      <div>
        <Link to="/hmm">Home</Link> <Link to="/items">Items</Link>
      </div>
      <hr />
      <Outlet />
    </>
  )
})

const indexRoute = rootRoute.createRoute({
  path: '/',
  component: Index,
})

const itemsRoute = rootRoute.createRoute({
  path: '/items',
  component: Items,
})

const routeConfig = rootRoute.addChildren([indexRoute, itemsRoute])

const router = createReactRouter({ routeConfig })

function App() {
  return <QueryClientProvider client={new QueryClient()}><RouterProvider router={router} /><ReactQueryDevtools /></QueryClientProvider>
}

function Index() {
  return (
    <div>
      <h3>Welcome Home!</h3>
    </div>
  )
}

function Items() {
  const fetchItems = () => {
    return axios.get('https://611a826e5710ca00173a1a6e.mockapi.io/items')
  }
  const { data, isError, error, refetch } = useQuery('items', fetchItems, { enabled: false, refetchOnWindowFocus: false})
  return (

    <>
      <div>Hello from Items!</div>
      <button onClick={() => refetch()}>LEZGO</button>
      {data?.data.map((value: any) => console.log(value))}
    </>

  )
}

export default App
