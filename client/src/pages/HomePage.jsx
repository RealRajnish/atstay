import Navbar from "../components/Navbar";
import Slide from "../components/Slide";
import Categories from "../components/Categories";
import Listings from "../components/Listings";
import Footer from "../components/Footer";
import LowerNavbar from "../components/LowerNavbar";

const HomePage = () => {
  return (
    <>
      <LowerNavbar />
      <Slide />
      <Categories />
      <Listings />
      <Footer />
    </>
  );
};

export default HomePage;
