import Link from "next/link";
import scss from "./Header.module.scss";

const Header = () => {
  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo}>
            <Link href={"/"}>
              <img
                src="https://img.freepik.com/premium-vector/pizza-logo-vector_25327-119.jpg"
                alt=""
              />
            </Link>
          </div>
          <div className={scss.nav}>
            <a href="/basket">корзина</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
