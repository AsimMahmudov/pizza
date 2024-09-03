"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useParams } from "next/navigation";
import scss from "./Details.module.scss";
import axios from "axios";
import { AddBasket, AddProduct } from "@/redux/ProductSlice";

const pizza = process.env.NEXT_PUBLIC_PIZZA;

const Details = () => {
  const { id } = useParams();
  const { products } = useAppSelector((s) => s.product);
  const dispatch = useAppDispatch();

  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [originalPrice, setOriginalPrice] = useState<number | null>(null);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`${pizza}`);
      dispatch(AddProduct(data));
      console.log(data);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const findProduct = products.find((el) => el._id == id);
  console.log(findProduct);

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (findProduct) {
      setCurrentPrice(findProduct.price);
      setOriginalPrice(findProduct.price);
    }
  }, [findProduct]);

  const handleBigClick = () => {
    if (originalPrice !== null) {
      const newPrice = originalPrice * 3;
      setCurrentPrice(newPrice);
    }
  };

  const handleSmallClick = () => {
    if (originalPrice !== null) {
      setCurrentPrice(originalPrice);
    }
  };

  const handleAverageClick = () => {
    if (originalPrice !== null) {
      const newPrice = originalPrice * 2;
      setCurrentPrice(newPrice);
    }
  };

  const handleAddToBasket = () => {
    if (findProduct) {
      const productToAdd = {
        ...findProduct,
        price: currentPrice ?? findProduct.price,
      };
      dispatch(AddBasket(productToAdd));
    }
  };

  if (!findProduct) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className={scss.Details}>
        <div className="container">
          <div className={scss.content}>
            <div className={scss.box}>
              <div className={scss.images}>
                {findProduct.url && (
                  <img src={findProduct.url} alt={findProduct.title} />
                )}
              </div>

              <div className={scss.boxtext}>
                <div className={scss.text}>
                  <h1>{findProduct.title}</h1>
                  <p>{findProduct.description}</p>
                  <div className={scss.card}>
                    <div className={scss.b1}>
                      <h3>Энерг. ценность</h3>

                      <h3>Белки</h3>
                      <h3>Жиры</h3>
                      <h3>Углеводы</h3>
                      <h3>Вес</h3>
                    </div>
                    <div className={scss.b2}>
                      <h3>{findProduct.kcal}ккал</h3>
                      <h3>{findProduct.protein}г</h3>
                      <h3>{findProduct.fats}г</h3>
                      <h3>{findProduct.carbohydrates}г</h3>
                      <h3>{findProduct.weight}г</h3>
                    </div>
                  </div>
                </div>

                <div className={scss.boxbtn}>
                  <div className={scss.btn}>
                    <button onClick={handleBigClick} className={scss.big}>
                      big
                    </button>
                    <button
                      onClick={handleAverageClick}
                      className={scss.average}
                    >
                      average
                    </button>
                    <button onClick={handleSmallClick} className={scss.mause}>
                      Small
                    </button>
                  </div>
                  <button
                    className={scss.btnBasket}
                    onClick={handleAddToBasket}
                  >
                    {currentPrice} сом
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
