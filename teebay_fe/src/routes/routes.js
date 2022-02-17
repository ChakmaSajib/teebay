import React from 'react';
import { Route } from "react-router";
import { Routes, Navigate } from 'react-router-dom';
import { RoutePath } from "../utils/constant"
import { Login, Registration, NotFound, AccountSetting, AddProduct, Products, AllProducts } from '../pages';
import SingleProduct from '../components/SingleProduct';




function AppRoutes() {

    return (
        <>
            <Routes>

                <Route
                    path={RoutePath.root}
                    end
                    element={<Navigate to={RoutePath.login} />}
                />
                <Route path={RoutePath.login} end element={<Login />} />
                <Route path={RoutePath.signup} end element={<Registration />} />
                <Route path={RoutePath.accountSetting} end element={<AccountSetting />} />
                <Route path={RoutePath.addProduct} end element={<AddProduct />} />
                <Route path={RoutePath.product} end element={<Products />} />
                <Route path={RoutePath.allProducts} end element={<AllProducts />} />
                <Route path={RoutePath.singleProduct} end element={<SingleProduct />} />
                <Route path='*' element={<NotFound />} />

            </Routes>
        </>
    );
}
export default AppRoutes;