import { useForm } from "react-hook-form";
import "./main.scss";
import { useState } from "react";

export default function TestRHF() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      age: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Отправлено:", data);
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      {/* Name */}
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="asd">Имя</label>
        <input
          id="asd"
          {...register("name", { required: "Имя обязательно" })}
          placeholder="Введите имя"
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div style={{ marginBottom: 16 }}>
        <label>Email</label>
        <input
          {...register("email", {
            required: "Email обязателен",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Неверный формат email",
            },
          })}
          placeholder="Введите email"
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      {/* Age */}
      <div style={{ marginBottom: 16 }}>
        <label>Возраст</label>
        <input
          type="number"
          {...register("age", {
            required: "Возраст обязателен",
            min: {
              value: 18,
              message: "Возраст должен быть от 18 лет",
            },
          })}
          placeholder="Введите возраст"
        />
        {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
      </div>

      <button onClick={handleSubmit(onSubmit)} type="button">
        Отправить
      </button>
    </div>
  );
}
