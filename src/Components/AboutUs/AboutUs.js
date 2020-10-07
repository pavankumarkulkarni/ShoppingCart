import React from "react";
import style from "./AboutUs.module.css";
export default function AboutUs() {
  return (
    <div>
      <header className={style.header}>
        <h2>ShoppingCart</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
          pariatur reiciendis, doloremque nulla odit laudantium?
        </p>
      </header>
      <nav>
        <ul className={style.navbar}>
          <li className={style.navitem}>Testimonials</li>
          <li className={style.navitem}>Contact Us</li>
          <li className={style.hasdropdown}>
            <button className='btnAsLink'>Theme</button>
            <ul className={style.dropdown}>
              <li className={style.dropdownitem}>
                <button className='btnAsLink'>Dark</button>
              </li>
              <li className={style.dropdownitem}>
                <button className='btnAsLink'>Light</button>
              </li>
              <li className={style.dropdownitem}>
                <button className='btnAsLink'>Red</button>
              </li>
              <li className={style.dropdownitem}>
                <button className='btnAsLink'>Green</button>
              </li>
            </ul>
          </li>
          <li className={style.navitem}>Testimonials</li>
        </ul>
      </nav>
      <main className={style.main}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat,
          architecto non consequatur odio similique perspiciatis repellendus
          facere adipisci dolorum animi nam exercitationem, a eum eius,
          provident facilis nisi! Voluptatibus, tenetur!
        </p>
      </main>
    </div>
  );
}
