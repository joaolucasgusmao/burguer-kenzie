import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import styles from "./style.module.scss";
import { toast } from "react-toastify";

export const CartModal = ({ cartList, setCartList, closeModal }) => {
  const total = cartList.reduce((prevValue, product) => {
    return prevValue + product.price;
  }, 0);

  const removeAllProducts = () => {
    setCartList([]);
    {
      cartList.length === 0
        ? toast.error("O carrinho já está vazio!")
        : toast.success("Itens removidos do carrinho!");
    }
  };

  const removeProduct = (productId) => {
    const filteredList = cartList.filter(
      (product) => product.id !== productId.id
    );
    setCartList(filteredList);
    toast.success("Item removido do carrinho!");
  };

  return (
    <div id="modalOverlay" className={styles.modalOverlay}>
      <div className={styles.modal} role="dialog">
        <div className={styles.topDiv}>
          <h2>Carrinho de compras</h2>
          <button onClick={closeModal} aria-label="close" title="Fechar">
            <MdClose className={styles.closeIcon} />
          </button>
        </div>
        <div className={styles.productsDiv}>
          {cartList.length === 0 ? (
            <div className={`${styles.emptyCartText} ${styles.productsDiv}`}>
              <p>O seu carrinho está vazio!</p>
            </div>
          ) : (
            <ul>
              {cartList.map((product) => (
                <CartItemCard
                  key={product.id}
                  product={product}
                  removeProduct={removeProduct}
                />
              ))}
            </ul>
          )}
        </div>
        <div className={styles.bottomDiv}>
          <div className={styles.totalDiv}>
            <span className={styles.total}>Total</span>
            <span className={styles.value}>
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <button onClick={removeAllProducts} className="btn remove">
            Remover todos
          </button>
        </div>
      </div>
    </div>
  );
};
