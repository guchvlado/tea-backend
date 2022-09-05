import { useRouter } from "next/router"


const BackButton = () => {
    const router = useRouter()

    const handleClick = () => {
        router.back()
    }

    return (
        <div onClick={handleClick} className="button w-64 block">Назад</div>
    )
}

export default BackButton