import React from 'react';
import { Route } from "react-router";
import { Routes, Navigate } from 'react-router-dom';
import { RoutePath } from "../utils/constant"
import { Login, Registration, NotFound, AccountSetting, AddProduct, Products, AllProducts, UpdateProduct, Profile, Home } from '../pages';
import SingleProduct from '../components/SingleProduct';
import PrivateRoute from '../components/PrivateRoute';

function AppRoutes() {

    return (
        <>
            <Routes>
                <Route
                    path={RoutePath.root}
                    end
                    element={<Home />}
                />
                <Route path={RoutePath.login} end element={<Login />} />
                <Route path={RoutePath.signup} end element={<Registration />} />
                <Route path={RoutePath.profile} end element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path={RoutePath.accountSetting} end element={<PrivateRoute><AccountSetting /></PrivateRoute>} />
                <Route path={RoutePath.addProduct} end element={<PrivateRoute><AddProduct /></PrivateRoute>} />
                <Route path={RoutePath.product} end element={<PrivateRoute><Products /></PrivateRoute>} />
                <Route path={RoutePath.allProducts} end element={<AllProducts />} />
                <Route path={RoutePath.singleProduct} end element={<PrivateRoute><SingleProduct /></PrivateRoute>} />
                <Route path={RoutePath.editProduct} end element={<PrivateRoute><UpdateProduct /></PrivateRoute>} />
                <Route path='*' element={<NotFound />} />

            </Routes>
        </>
    );
}
export default AppRoutes;