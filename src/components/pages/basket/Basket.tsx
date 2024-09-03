"use client";

import {
  AddBasket,
  DeleteItem,
  RemoveFromBasket,
  ClearBasket,
} from "@/redux/ProductSlice";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import axios from "axios";
import scss from "./Basket.module.scss";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type BasketItem = {
  _id: string;
  url: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  kcal: number;
  protein: number;
  fats: number;
  carbohydrates: number;
  weight: number;
};

type FormData = {
  phone: string;
  email: string;
  basket: BasketItem[];
};

const Basket: React.FC = () => {
  const { basket: reduxBasket } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm<FormData>();

  const TOKEN = process.env.NEXT_PUBLIC_TG_TOKEN;
  const CHAT_ID = process.env.NEXT_PUBLIC_TG_CHAT_ID;

  const messageModel = (data: FormData) => {
    let messageTG = `<b>Product Order</b>\n`;
    data.basket.forEach((item) => {
      messageTG += `\nName: <b>${item.title}</b>\n`;
      messageTG += `Description: ${item.description}\n`;
      messageTG += `Price: ${item.price}\n`;
      messageTG += `Quantity: ${item.quantity}\n`;
    });
    messageTG += `\nPhone: ${data.phone}\n`;
    messageTG += `Email: ${data.email}\n`;
    return messageTG;
  };

  const sendMessageToTelegram = async (data: FormData) => {
    if (!TOKEN || !CHAT_ID) {
      console.error("Telegram token или chat ID не установлен");
      return;
    }

    try {
      await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        parse_mode: "HTML",
        text: messageModel(data),
      });
      console.log("Сообщение успешно отправлено");
    } catch (error) {
      console.error("Ошибка при отправке сообщения в Telegram:", error);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await sendMessageToTelegram({ ...data, basket });
    dispatch(ClearBasket()); // Clear basket in Redux
    setBasket([]); // Clear local state

    reset();
  };

  const [basket, setBasket] = useState<BasketItem[]>([]);
  console.log(basket);

  useEffect(() => {
    setBasket(reduxBasket);
  }, [reduxBasket]);

  const handleIncreaseQuantity = (item: BasketItem) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    dispatch(AddBasket(updatedItem));
  };

  const handleDecreaseQuantity = (item: BasketItem) => {
    dispatch(RemoveFromBasket(item._id));
  };

  const handleDeleteItem = (item: BasketItem) => {
    dispatch(DeleteItem(item._id));
  };

  return (
    <div className={scss.Basket}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.name}>
            <h1>Basket</h1>
          </div>
          <div className={scss.box}>
            {basket.length > 0 ? (
              basket.map((el) => (
                <div key={el._id} className={scss.card}>
                  <img src={el.url} alt="" />
                  <h2>{el.title}</h2>
                  <p>{el.description.slice(0, 50)}...</p>
                  <span>Price: {el.price * el.quantity}</span>
                  <div className={scss.btn1}>
                    <button onClick={() => handleDecreaseQuantity(el)}>
                      -
                    </button>
                    <span>{el.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(el)}>
                      +
                    </button>
                  </div>
                  <div className={scss.btn2}>
                    <button onClick={() => handleDeleteItem(el)}>
                      удалить
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Your basket is empty.</p>
            )}
          </div>
          <div className={scss.tg}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label>
                <p>Phone</p>
                <input type="tel" {...register("phone")} required />
              </label>
              <label>
                <p> Email</p>
                <input type="email" {...register("email")} required />
              </label>
              <button type="submit">SEND</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
