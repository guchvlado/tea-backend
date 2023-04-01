import Link from "next/link";
import { useEffect, useState } from "react";
import $api from "../../../../http";
import AdminPanelLayout from "layouts/AdminPanelLayout";
import { IOrder } from "types/IOrder";
import { ICategory } from "types/ICategory";

const AdminCategoriesPage = () => {
  const [items, setItems] = useState<ICategory[]>([]);

  useEffect(() => {
    $api
      .get<ICategory[]>("/categories")
      .then((res) => res.data)
      .then((data) => setItems(data));
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Удалить категорию?")) {
      setItems((items) => items.filter((item) => item.id !== id));
      $api
        .delete(`categories/delete/${id}`)
        .then((res) => console.log(res))
        .catch((e) => console.log(e));
    }
  };

  return (
    <AdminPanelLayout>
      <div className="p-8">
        <div className="flex justify-between">
          <h2>Категории</h2>
          <Link href={`/admin/categories/new`}>
            <a className="button-admin green">Добавить новую категорию</a>
          </Link>
        </div>
        <div className="py-2 mt-5 flex items-center border child:text-center font-bold child:w-1/3 pr-5">
          <div>Id</div>
          <div>Name</div>
        </div>
        {items.map((item) => (
          <div
            key={item.id}
            className="py-4 mt-5 flex items-center border child:text-center child:w-1/3"
          >
            <div>{item.id}</div>
            <div>{item.name}</div>
            <div
              onClick={() => handleDelete(item.id)}
              className="button-admin red mr-5"
            >
              Удалить
            </div>
          </div>
        ))}
      </div>
    </AdminPanelLayout>
  );
};

export default AdminCategoriesPage;
