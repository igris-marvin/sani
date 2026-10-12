import { Route, Routes } from "react-router-dom";
import { AdminLayout, StoreLayout } from "./components/Layouts";
import { Account, Login, Signup, SignupSuccess } from "./pages/store/Account";
import { About, Contact } from "./pages/store/Information";
import { Cart } from "./pages/store/Cart";
import { Wishlist } from "./pages/store/Wishlist";
import { Home } from "./pages/store/Home";
import { Browse, Shop } from "./pages/store/Shop";
import { Dashboard } from "./pages/admin/Dashboard";
import {
  ProductForm,
  Products,
} from "./pages/admin/ProductManagement";
import {
  AdminProfile,
  Customers,
  RegisterAdmin,
} from "./pages/admin/People";
import { ErrorPage } from "./pages/store/ErrorPage";

export default function App() {
  return (
    <Routes>
      <Route element={<StoreLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:category" element={<Browse />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signup/success" element={<SignupSuccess />} />
        <Route path="account" element={<Account />} />
        <Route path="error/:code" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage code="404" />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/new" element={<ProductForm />} />
        <Route path="products/:id" element={<ProductForm />} />
        <Route path="users" element={<Customers />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="register" element={<RegisterAdmin />} />
      </Route>
    </Routes>
  );
}
