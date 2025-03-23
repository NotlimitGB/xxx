import toast from "react-hot-toast";
import { useCreateModel } from "../../../queries/models/models";
import "./main.scss";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function EditPage() {
  const createUser = useCreateModel();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      description: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const result = await toast.promise(
      createUser.mutateAsync({ ...formData, images: [""] }),
      {
        loading: "Загружаем модель...",
        success: (data) => {
          navigate(`/profile/${data.id}`);
          return "Модель получена!";
        },

        error: "Ошибка при получении модели",
      }
    );
  };

  return (
    <>
      <section className="section-edit">
        <div className="section-cont">
          <form onSubmit={handleSubmit(onSubmit)} className="form-edit">
            <div>
              <label htmlFor="name">Имя:</label>
              <input
                className="input-field"
                id="name"
                type="text"
                {...register("name", { required: "Имя обязательно" })}
              />
              {errors.name && (
                <p style={{ color: "red" }}>{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                className="input-field"
                id="email"
                type="email"
                {...register("email", {
                  required: "Email обязателен",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Некорректный email",
                  },
                })}
              />
              {errors.email && (
                <p style={{ color: "red" }}>{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="description">Описнаие:</label>
              <input
                className="input-field"
                id="description"
                type="description"
                {...register("description")}
              />
              {errors.password && (
                <p style={{ color: "red" }}>{errors.password.message}</p>
              )}
            </div>

            <button className="button accent" type="submit">
              Отправить
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
