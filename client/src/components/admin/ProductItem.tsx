import Image from "next/image"
import Link from "next/link"
import { ITeaItem } from "../../types/ITeaItem"


interface ProductItemProps extends ITeaItem {
    handleDelete: (id: string) => void
}

const ProductItem: React.FC<ProductItemProps> = ({ categoryId, id, image, price, rating, title, handleDelete }) => {


    return (
            <div className="py-2 mt-5 flex items-center border child:text-center">
                <div className="flex-1">{id}</div>
                <div className="flex-1">{categoryId}</div>
                <div className="flex-[2]">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_API_HOST}/${image}`}
                        alt="Tea"
                        width={80}
                        height={80}
                        className="rounded-full "
                    />
                </div>
                <div className="flex-[2]">
                    {title}
                </div>
                <div className="flex-1">
                    {price}
                </div>
                <div className="flex-[4] flex gap-5 px-5">
                    <Link href={`/item/${id}`}>
                        <a className="button-admin yellow">Открыть</a>
                    </Link>
                    <div onClick={() => handleDelete(id)} className="button-admin red">
                        Удалить
                    </div>
                    <Link href={`/admin/tea/${id}`}>
                        <a className="button-admin indigo">Изменить</a>
                    </Link>
                </div>
            </div>
    )
}

export default ProductItem