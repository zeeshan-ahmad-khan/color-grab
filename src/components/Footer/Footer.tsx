import "./footer.css";
import { BsGithub, BsLinkedin } from "react-icons/bs";

export default function Footer() {
  return (
    <div className="footer-container">
      <span>Made by Zak</span>
      <div className="social">
        <a href="https://github.com/zeeshan-ahmad-khan/color-grab">
          <BsGithub />
        </a>
        <a href="https://www.linkedin.com/in/zeeshan-ahmad-khan-178563170">
          <BsLinkedin />
        </a>
      </div>
    </div>
  );
}
