import styles from "./style.module.scss";

export const ProductCard = ({ product, addToCart }) => {
  return (
    <li className={styles.productCard}>
      <div className={styles.productDiv}>
        <img src={product.img} alt={product.name} />
      </div>
      <div className={styles.productInfos}>
        <h3>{product.name}</h3>
        <span className={styles.category}>{product.category}</span>
        <span className={styles.price}>
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <button onClick={() => addToCart(product)} className="btn">
          Adicionar
        </button>
      </div>
    </li>
  );
};