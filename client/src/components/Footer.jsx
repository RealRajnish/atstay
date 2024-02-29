import "../styles/Footer.scss";
import { LocationOn, LocalPhone, Email } from "@mui/icons-material";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import FooterLower from "./FooterLower";

const Footer = () => {
  return (
    <div>
      <div className="footer">
        <div className="footer_left">
          <a href="/">
            <img src="/assets/logo.webp" alt="logo" />
          </a>
        </div>

        <div className="footer_center">
          <h3>Useful Links</h3>
          <ul>
            <li>
              {" "}
              <a to="https://www.facebook.com/atraskitravel?mibextid=nW3QTL">
                {" "}
                <FaSquareFacebook style={{ fontSize: "2.3rem" }} />
              </a>
              <a to="https://www.instagram.com/atstaysbyatraski/?igshid=MzRlODBiNWFlZA%3D%3D">
                {" "}
                <FaInstagramSquare style={{ fontSize: "2.3rem" }} />
              </a>
            </li>
            <li>About Us</li>
            <li>Terms and Conditions</li>
            <li>Refund Policy</li>
          </ul>
        </div>

        <div className="footer_right">
          <h3>Contact</h3>
          <div className="footer_right_info">
            <LocalPhone />
            <p>+91 8077412283</p>
          </div>
          <div className="footer_right_info">
            <Email />
            <p>atstaytravel@gmail.com</p>
          </div>
        </div>

        <div>
          <p>Pay Via</p>
          <img src="/assets/payment.png" alt="payment" />
        </div>
      </div>
      <FooterLower />
    </div>
  );
};

export default Footer;
