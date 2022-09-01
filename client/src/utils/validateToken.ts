import axios from "axios"

const validateToken = async (token: string) => {
    try {
        await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}/auth/validate/${token}`)
        return true
    } catch(e) {
        return false
    } 
    
}

export default validateToken