import "./footer.css";
import { BsGithub } from "react-icons/bs";

export default function Footer() {
  return (
    <div className="footer-container">
      <span>Made by Zak</span>
      <div className="social">
        <a href="https://github.com/zeeshan-ahmad-khan/color-grab">
          <BsGithub />
        </a>
      </div>
    </div>
  );
}
