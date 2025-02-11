import React from 'react';
import { lazy, StrictMode, Suspense} from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; 
import appStore from './utlis/appStore.js';
import {Provider} from "react-redux";

const App = lazy(()=> import("./App.jsx"));
const Cart = lazy(()=> import("./Component/Cart.jsx"));
const ProductDetail = lazy(()=> import("./Component/ProductDetail.jsx"));
const ErrorComponent = lazy(()=> import("./Component/ErrorPage.jsx"));
const ProductList = lazy(()=> import("./Component/ProductList.jsx"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (<Suspense fallback={<div>Loading...</div>}><App /> </Suspense>),
    errorElement: <ErrorComponent /> 
  },
  {
    path: "/product/:id",
    element: (<Suspense fallback={<div>Loading...</div>}><ProductDetail /> </Suspense>),
  },
  {
   path:"/productlist",
   element: <ProductList />
  },
  {
    path:"/cart",
    element:(<Suspense fallback={<div>Loading...</div>}><Cart /> </Suspense>),
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
    <RouterProvider router={appRouter} /> 
    </Provider>
  </StrictMode>
);
