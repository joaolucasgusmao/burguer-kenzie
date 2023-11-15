import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import styles from "./style.module.scss";
import { api } from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loading } from "../../components/Loading";

export const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState(() => {
    const storedCartList = localStorage.getItem("@Products");
    return storedCartList ? JSON.parse(storedCartList) : [];
  });
  const [modalOpen, setModalOpen] = useState(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const request = await api.get("/products");
        const { data } = request;
        setProductList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const addToCart = (productToAdd) => {
    const isProductInCart = cartList.some(
      (product) => product.id === productToAdd.id
    );

    !isProductInCart
      ? (() => {
          setCartList([...cartList, productToAdd]);
          toast.success("Produto adicionado ao carrinho!");
        })()
      : toast.error("Este produto já foi adicionado ao carrinho!");
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleClickOutsideModal = (event) => {
    if (modalOpen && event.target.id === "modalOverlay") {
      closeModal();
    }
  };

  const handleKeyPress = (event) => {
    if (modalOpen && event.keyCode === 27) {
      closeModal();
    }
  };

  useEffect(() => {
    setValue(cartList.length);
    localStorage.setItem("@Products", JSON.stringify(cartList));
  }, [cartList]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideModal);
    document.addEventListener("keydown", handleKeyPress);
  }, [modalOpen]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header value={value} openModal={openModal} />
          <main className={styles.main}>
            <ProductList productList={productList} addToCart={addToCart} />
            {modalOpen ? (
              <CartModal
                cartList={cartList}
                closeModal={closeModal}
                setCartList={setCartList}
              />
            ) : null}
          </main>
          <ToastContainer autoClose={1000} />
        </>
      )}
    </>
  );
};
