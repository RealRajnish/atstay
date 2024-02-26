import React from 'react'
import { useSwipeable } from "react-swipeable";
import rooms from "../images/rooms.jpg";
import beach from "../images/beach.jpg";
import lake from "../images/lake.jpg";
import camping from "../images/camping.jpg";
import trending from "../images/trending.jpg";
import mansion from "../images/Mansion.jpg";
import tea from "../images/tea.jpg";
import less from "../images/less.png";
import Beach from "../images/Beach.png";
import CityView from "../images/CityView.png";
import Heritage from "../images/Heritage.png";
import TreeHouse from "../images/TreeHouse.png";
import SunView from "../images/SunView.png";
import NationalPark from "../images/NationalPark.png";
import BedBreakFast from "../images/Bed&Breakfast.png";
import Tropical from "../images/Tropical.png";
import Luxe from "../images/Luxe.png";
import Mountains from "../images/Mountains.png";
import "../styles/lowerNavbar.css"


const LowerNavbar = () => {

  const btnpressprev = () => {
    // const box = document.getElementById('box'); // Get the element by its id
    let box = document.querySelector(".product-container");

    if (box) {
      const width = box.clientWidth;
      box.scrollLeft -= width; // Use -= to scroll to the left
      console.log(width);
    } else {
      console.error('Element with id "box" not found.');
    }
  };

  const btnpressnext = () => {
    // const box = document.getElementById('box'); // Get the element by its id
    let box = document.querySelector(".product-container");

    if (box) {
      const width = box.clientWidth;
      box.scrollLeft += width; // Use += to scroll to the right
      console.log(width);
    } else {
      console.error('Element with id "box" not found.');
    }
  };

  const handleSwipe = (direction) => {
    console.log(`Swiped ${direction}`);
    if (direction === "left") {
      btnpressnext();
    } else if (direction === "right") {
      btnpressprev();
    }
  };

  // Use the useSwipeable hook to add swipe functionality
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
  });
  return (
    <div className="product-carousel-1">
        <div
          className="pre-btn-1"
          onClick={(e) => {
            btnpressprev();
            e.stopPropagation();
          }}
        >
          <p>
            <img src={less} style={{ width: "22px" }} />
          </p>
        </div>

        <div
          className="product-container"
          {...handlers}
          id="carousel-prod-container"
        >
          <div className="carousel-1">
            <div className="img-container">
              <img
                className="d-block-1 mycard-1"
                src={rooms}
                alt="First slide"
                // onClick={() => handleProductClick(1)}
              />
            </div>
            <div className="text-container">
              <p>Rooms</p>
            </div>
          </div>

          <div className="carousel-1">
            <div className="img-container">
              <img
                className="d-block-1 mycard-1"
                src={beach}
                alt="First slide"
                // onClick={() => handleProductClick1(2)}
              />
            </div>
            <div className="text-container">
              <p>Beach</p>
            </div>
          </div>

          <div className="carousel-1">
            <div className="img-container">
              <img
                className="d-block-1 mycard-1"
                src={NationalPark}
                alt="First slide"
                // onClick={() => handleProductClick1(2)}
              />
            </div>
            <div className="text-container">
              <p>National Park</p>
            </div>
          </div>

          <div className="carousel-1">
            <div className="img-container">
              <img
                className="d-block-1 mycard-1"
                src={lake}
                alt="First slide"
                // onClick={() => handleProductClick2(3)}
              />
            </div>
            <div className="text-container">
              <p>Farms</p>
            </div>
          </div>

          <div className="carousel-1">
            <div className="img-container">
              <img
                className="d-block-1 mycard-1"
                src={trending}
                alt="First slide"
                // onClick={() => handleProductClick3(4)}
              />
            </div>
            <div className="text-container">
              <p>Trek</p>
            </div>
          </div>

          <div className="carousel-1">
            <div className="img-container">
              <img
                className="d-block-1 mycard-1"
                src={camping}
                alt="First slide"
                // onClick={() => handleProductClick4(5)}
              />
            </div>
            <div className="text-container">
              <p>Camping</p>
            </div>
          </div>

          <div className="carousel-1">
            <div className="img-container">
              <img
                className="d-block-1 mycard-1"
                src={mansion}
                alt="First slide"
                // onClick={() => handleProductClick5(6)}
              />
            </div>
            <div className="text-container">
              <p>SnowFall</p>
            </div>
          </div>

          <div className="carousel-1">
            <div className="img-container">
              <img
                className="d-block-1 mycard-1"
                src={Mountains}
                alt="First slide"
                // onClick={() => handleProductClick6(7)}
              />
            </div>
            <div className="text-container">
              <p> Mountains</p>
            </div>
          </div>

          <div className="carousel-1">
            <div className="img-container">
              <img
                className="d-block-1 mycard-1"
                src={rooms}
                alt="First slide"
                // onClick={() => handleProductClick7(8)}
              />
            </div>
            <div className="text-container">
              <p>Amazing View</p>
            </div>
          </div>

          <div className="carousel-1">
            <div className="img-container">
              <img
                className="d-block-1 mycard-1"
                src={Beach}
                alt="First slide"
                // onClick={() => handleProductClick7(8)}
              />
            </div>
            <div className="text-container">
              <p>River</p>
            </div>
          </div>
          <div className="carousel-1">
            <div className="img-container">
              <img
                className="d-block-1 mycard-1"
                src={CityView}
                alt="First slide"
                // onClick={() => handleProductClick7(8)}
              />
            </div>
            <div className="text-container">
              <p>City View</p>
            </div>
          </div>

          <div className="carousel-1">
            <div className="img-container">
              <img
                className="d-block-1 mycard-1"
                src={Heritage}
                alt="First slide"
                // onClick={() => handleProductClick7(8)}
              />
            </div>
            <div className="text-container">
              <p>Heritage</p>
            </div>
          </div>

          <div className="carousel-1">
            <div className="img-container">
              <img
                className="d-block-1 mycard-1"
                src={TreeHouse}
                alt="First slide"
                // onClick={() => handleProductClick7(8)}
              />
            </div>
            <div className="text-container">
              <p>Tree House</p>
            </div>
          </div>

          <div className="carousel-1">
            <div className="img-container">
              <img
                className="d-block-1 mycard-1"
                src={SunView}
                alt="First slide"
                // onClick={() => handleProductClick7(8)}
              />
            </div>
            <div className="text-container">
              <p>Sun View</p>
            </div>
          </div>

          <div className="carousel-1">
            <div className="img-container">
              <img
                className="d-block-1 mycard-1"
                src={Luxe}
                alt="First slide"
                // onClick={() => handleProductClick7(8)}
              />
            </div>
            <div className="text-container">
              <p>Luxe</p>
            </div>
          </div>

          <div className="carousel-1">
            <div className="img-container">
              <img
                className="d-block-1 mycard-1"
                src={BedBreakFast}
                alt="First slide"
                // onClick={() => handleProductClick7(8)}
              />
            </div>
            <div className="text-container">
              <p>Bed & Breakfast</p>
            </div>
          </div>

          <div className="carousel-1">
            <div className="img-container">
              <img
                className="d-block-1 mycard-1"
                src={Tropical}
                alt="First slide"
                // onClick={() => handleProductClick7(8)}
              />
            </div>
            <div className="text-container">
              <p>Tropical</p>
            </div>
          </div>
        </div>
        <div
          className="next-btn-1"
          onClick={(e) => {
            btnpressnext();
            e.stopPropagation();
          }}
        >
          <p>
            <img
              src={less}
              style={{ width: "22px", transform: "scaleX(-1)" }}
            />
          </p>
        </div>
      </div>
  )
}

export default LowerNavbar