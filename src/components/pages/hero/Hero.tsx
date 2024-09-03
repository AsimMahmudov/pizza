"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import scss from "./Hero.module.scss";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import axios from "axios";
import { AddBasket, AddProduct, RemoveProduct } from "@/redux/ProductSlice";
import { useRouter } from "next/navigation";

type ProductItem = {
  _id: string;
  title: string;
  description: string;
  url: string;
  kcal: number;
  price: number;
  protein: number;
  fats: number;
  carbohydrates: number;
  weight: number;
};

const shop = process.env.NEXT_PUBLIC_PIZZA;

const Hero: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const nav = useRouter();
  const [todo, setTodo] = useState<ProductItem[]>([]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`${shop}`);
      dispatch(AddProduct(data));
      setTodo(data);
      console.log(data);
    } catch (error) {
      console.error("error products:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <section>
        <div className="container">
          <div className={scss.name}>
            <h1>Пицца</h1>
          </div>
          <div className={scss.content}>
            {todo?.map((el) => (
              <div key={el._id} className={scss.card}>
                <Link href={`/details/${el._id}`}>
                  <img src={el.url} alt={el.title} />
                </Link>
                <h1>{el.title}</h1>
                <p>{el.description.slice(0, 50)}... </p>

                <div className={scss.btn}>
                  <h3>{el.price} сом</h3>
                  <button
                    className={scss.AddBasket}
                    onClick={() => dispatch(AddBasket({ ...el, quantity: 1 }))}
                  >
                    Basket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;