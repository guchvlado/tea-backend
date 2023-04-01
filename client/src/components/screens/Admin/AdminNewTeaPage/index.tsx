import { useEffect, useState } from "react";
import $api from "../../../../http";
import AdminPanelLayout from "layouts/AdminPanelLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/router";
import { ICategory } from "types/ICategory";
import BackButton from "components/UI/BackButton";

interface IFormInputs {
    title: string;
    price: number;
    rating: number;
    categoryId: number;
    image: object[];
}

const schema = yup.object({
    title: yup.string().required('Поле обязательно для заполнения'),
    price: yup.number().required('Поле обязательно для заполнения'),
    rating: yup.number().required('Поле обязательно для заполнения'),
    categoryId: yup.number().required('Поле обязательно для заполнения'),
    image: yup.mixed().required('Поле обязательно для заполнения'),
}).required();


const AdminNewTeaPage = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [categories, setCategories] = useState<ICategory[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      categoryId: 1
    }
  });
  const onSubmit = async (data: IFormInputs) => {
    try {
      const file: any = data.image[0];

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("price", data.price.toString());
      formData.append("rating", data.rating.toString());
      formData.append("categoryId", data.categoryId.toString());
      formData.append("image", file);

      $api
        .post("/tea/new", formData)
        .then(() => router.push("/admin/tea"))
        .catch((e) => console.log(e));
    } catch (e: any) {
      setError(e?.response?.data?.message || "");
    }
  };

  useEffect(() => {
    $api
      .get<ICategory[]>("categories")
      .then((res) => res.data)
      .then((data) => setCategories(data))
      .catch(() => setError("Не удалось загрузить категории"));
  }, []);

  return (
    <AdminPanelLayout>
      <div className="mx-28 mt-2 flex justify-end">
        <BackButton />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border rounded-xl border-gray-400 shadow-md my-6 mx-28 p-10 flex flex-col gap-4"
      >
        <h2 className="text-center">Добавление нового товара</h2>
        {error ? <p className="text-red-700">{error}</p> : null}
        <label htmlFor="email" className="input-label">
          Название
        </label>
        <input id="email" {...register("title")} className="input" />
        <p className="input-error">{errors.title?.message}</p>

        <label htmlFor="price" className="input-label">
          Цена
        </label>
        <input id="price" {...register("price")} className="input" />
        <p className="input-error">{errors.price?.message}</p>

        <label htmlFor="rating" className="input-label">
          Рейтинг
        </label>
        <input id="rating" {...register("rating")} className="input" />
        <p className="input-error">{errors.rating?.message}</p>

        <label htmlFor="categoryId" className="input-label">
          Id категории
        </label>
        <select id="categoryId" {...register("categoryId")} className="input">
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <p className="input-error">{errors.categoryId?.message}</p>

        <label htmlFor="image" className="input-label">
          Изображение
        </label>
        <input type="file" id="image" {...register("image")} />
        <p className="input-error">{errors.image?.message}</p>

        <button className="button rounded-xl w-full">Добавить</button>
      </form>
    </AdminPanelLayout>
  );
};

export default AdminNewTeaPage;
