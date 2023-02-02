import axios from "axios"
import $api from "../http"

const validateToken = async () => {
    try {
        await $api.get(`/auth/validate/`)
        return true
    } catch(e) {
        return false
    } 
    
}

export default validateToken