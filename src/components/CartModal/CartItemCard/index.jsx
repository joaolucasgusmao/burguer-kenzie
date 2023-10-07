import { MdDelete } from "react-icons/md";
import styles from "./style.module.scss";

export const CartItemCard = ({ product, removeProduct }) => {
  return (
    <li className={styles.productsList}>
      <div className={styles.itemsDiv}>
        <img src={product.img} alt={product.name} />
        <div>
          <h3>{product.name}</h3>
          <span>
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
      </div>
      <button onClick={() => removeProduct(product)} className={styles.delBtn}>
        <MdDelete size={21} />
      </button>
    </li>
  );
};