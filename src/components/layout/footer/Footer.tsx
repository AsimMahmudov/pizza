"use client";
import scss from "./Footer.module.scss";
import { BsGithub } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { BsTelegram } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className={scss.Footer}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.discription}></div>

          <div className={scss.homebtn}>
            <a href="https://github.com/AlimMahmudov">
              <button>
                <BsGithub />
              </button>
            </a>
            <a href="https://www.instagram.com/alimdev_05">
              <button>
                <GrInstagram />
              </button>
            </a>
            <a href="https://t.me/MahmudovAlim">
              <button>
                <BsTelegram />
              </button>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
