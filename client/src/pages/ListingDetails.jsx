import { useEffect, useState } from "react";
import "../styles/ListingDetails.scss";
import { useNavigate, useParams } from "react-router-dom";
import { facilities } from "../data";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Footer from "../components/Footer";
import { API_10, API_11, API_3, API_9 } from "../api/api";
import { setHostData } from "../redux/state";

const ListingDetails = () => {
  const [loading, setLoading] = useState(true);
  const [selectRoom, setSelectedRoom] = useState("single");
  const [price, setPrice] = useState(0);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [datesArray, setDatesArray] = useState([]);
  const [listing, setListing] = useState(null);
  // const [date,setDate]=useState([])

  const dispatch = useDispatch();

  const { listingId } = useParams();
  const getHostInfo = async () => {
    try {
      const resp = await axios.post(API_11, { id: listing.hostId });
      dispatch(setHostData({ host: resp.data }));
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHostInfo();
  }, [listing]);

  const getListingDetails = async () => {
    try {
      const response = await fetch(`${API_9}${listingId}`, {
        method: "GET",
      });

      const data = await response.json();
      // console.log(data[0]);
      setListing(data[0]);
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listing Details Failed", err.message);
    }
  };

  useEffect(() => {
    getListingDetails();
  }, []);

  // console.log(listing);

  /* BOOKING CALENDAR */
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    // Update the selected date range when user makes a selection
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);
  const dayCount = Math.round(end - start) / (1000 * 60 * 60 * 24); // Calculate the difference in day unit

  /* SUBMIT BOOKING */
  const customerId = useSelector((state) => state?.user?._id);
  const host = useSelector((state) => state?.host);

  const navigate = useNavigate();

  const checkAvailability = async () => {
    const resp = await fetch(API_10, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: datesArray,
        hotelId: "hotel123",
        roomType: "Standard",
        roomNum: 3,
      }),
    });
  };

  useEffect(() => {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    // console.log("startDate", startDateObj);
    // console.log("endDate", endDateObj);
    const dates = [];
    let currentDate = startDateObj;

    // Loop through each date until the day before the end date
    while (currentDate < endDateObj) {
      const formattedDate = currentDate.toISOString().split("T")[0];
      dates.push(formattedDate);

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setDatesArray(dates);
  }, [startDate, endDate]);
  useEffect(() => {
    console.log("Dates Array", datesArray);
  }, [datesArray]);

  useEffect(() => {
    const startdate = new Date(dateRange[0].startDate);
    const startyear = startdate.getFullYear();
    const startmonth = String(startdate.getMonth() + 1).padStart(2, "0");
    const startday = String(startdate.getDate()).padStart(2, "0");
    const startformattedDate = `${startyear}-${startmonth}-${startday}`;
    setStartDate(startformattedDate);
    const enddate = new Date(dateRange[0].endDate);
    const endyear = enddate.getFullYear();
    const endmonth = String(enddate.getMonth() + 1).padStart(2, "0");
    const endday = String(enddate.getDate()).padStart(2, "0");
    const endformattedDate = `${endyear}-${endmonth}-${endday}`;
    setEndDate(endformattedDate);
  }, [dateRange]);

  const handleSubmit = async () => {
    try {
      const bookingForm = {
        customerId,
        listingId,
        hostId: listing.creator._id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listing.price * dayCount,
      };

      const response = await fetch("http://localhost:3001/bookings/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingForm),
      });

      if (response.ok) {
        navigate(`/${customerId}/trips`);
      }
    } catch (err) {
      console.log("Submit Booking Failed.", err.message);
    }
  };

  useEffect(() => {
    // console.log("listing", listing.rooms[0].price);
    if (listing) {
      if (listing.type === "Rooms") {
        if (selectRoom === "single") {
          setPrice(listing.rooms[0].price);
          // console.log("listing", listing.rooms[0].price);
        } else if (selectRoom === "double") {
          setPrice(listing.rooms[1].price);
          // console.log("listing", listing.rooms[1].price);
        } else if (selectRoom === "delux") {
          setPrice(listing.rooms[2].price);
          // console.log("listing", listing.rooms[2].price);
        }
      } else if (listing.type === "An entire place") {
        setPrice(listing.price);
      }
    }
  }, [selectRoom, listing]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="listing-details">
        <div className="title">
          <h1>{listing.title}</h1>
        </div>

        <div className="photos">
          {listing.listingPhotoPaths?.map((item) => (
            <img
              src={`${API_3}${item.replace("public", "")}`}
              alt="listing photo"
            />
          ))}
        </div>

        <h2>
          {listing.type} in {listing.city}, {listing.province},{" "}
          {listing.country}
        </h2>

        <p style={{ display: listing.type === "Rooms" ? "none" : "" }}>
          {listing.guestCount} guests - {listing.bedroomCount} bedroom(s) -{" "}
          {listing.bedCount} bed(s) - {listing.bathroomCount} bathroom(s)
        </p>
        <hr />

        <div className="profile">
          {/*<img
            src={`http://localhost:3001/${listing.creator.profileImagePath.replace(
              "public",
              ""
            )}`}
          />*/}
          <h3>
            Hosted by {host ? host.firstName : "firstname"}{" "}
            {host ? host.lastName : "lastNAme"}
          </h3>
        </div>
        <hr />

        <h3>Description</h3>
        <p>{listing.description}</p>
        <hr />

        <h3>{listing.highlight}</h3>
        <p>{listing.highlightDesc}</p>
        <hr />

        <div className="booking">
          <div>
            <h2>What this place offers?</h2>
            <div className="amenities">
              {listing.amenities[0].split(",").map((item, index) => (
                <div className="facility" key={index}>
                  <div className="facility_icon">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2>How long do you want to stay?</h2>
            <div className="date-range-calendar">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2>
                  ${price} x {dayCount} nights
                </h2>
              ) : (
                <h2>
                  ${price} x {dayCount} night
                </h2>
              )}

              <div
                className="div"
                style={{ display: listing.type === "Rooms" ? "" : "none" }}
              >
                <button onClick={() => setSelectedRoom("single")}>
                  Single
                </button>
                <button onClick={() => setSelectedRoom("double")}>
                  Double
                </button>
                <button onClick={() => setSelectedRoom("delux")}>Delux</button>
              </div>
              <h2>Total price: ${price * dayCount}</h2>
              <p>CheckIn Date: {dateRange[0].startDate.toDateString()}</p>
              <p>CheckOut Date: {dateRange[0].endDate.toDateString()}</p>

              <button className="button" type="submit" onClick={handleSubmit}>
                BOOKING
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ListingDetails;
