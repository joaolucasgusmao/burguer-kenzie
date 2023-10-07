import Logo from "../../assets/Logo.svg";
import { MdShoppingCart } from "react-icons/md";
import styles from "./style.module.scss";

export const Header = ({ openModal, value }) => {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo Kenzie Burguer" />
      <div>
        <button onClick={openModal}>
          <MdShoppingCart className={styles.cart} color="#bdbdbd" size={25} />
          <span>{value}</span>
        </button>
      </div>
    </header>
  );
};