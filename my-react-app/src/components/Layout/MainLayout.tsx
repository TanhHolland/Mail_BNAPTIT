import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";

export default function MainLayout() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}
