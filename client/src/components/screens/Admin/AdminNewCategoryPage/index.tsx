import { useState } from "react";
import $api from "../../../../http";
import AdminPanelLayout from "layouts/AdminPanelLayout";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/router";
import BackButton from "components/UI/BackButton";

interface IFormInputs {
    name: string;
}

const schema = yup.object({
    name: yup.string().required('Поле обязательно для заполнения'),
}).required();


const AdminNewCategoryPage = () => {
  const router = useRouter();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: IFormInputs) => {
    try {
      $api
        .post("/categories", data)
        .then(() => router.push("/admin/categories"))
        .catch((e) => console.log(e));
    } catch (e: any) {
      setError(e?.response?.data?.message || "");
    }
  };

  return (
    <AdminPanelLayout>
      <div className="mx-28 mt-2 flex justify-end">
        <BackButton />
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border rounded-xl border-gray-400 shadow-md my-6 mx-28 p-10 flex flex-col gap-4"
      >
        <h2 className="text-center">Добавление новой категории</h2>
        {error ? <p className="text-red-700">{error}</p> : null}
        <label htmlFor="email" className="input-label">
          Название
        </label>
        <input id="name" {...register("name")} className="input" />
        <p className="input-error">{errors.name?.message}</p>


        <button className="button rounded-xl w-full">Добавить</button>
      </form>
    </AdminPanelLayout>
  );
};

export default AdminNewCategoryPage;
