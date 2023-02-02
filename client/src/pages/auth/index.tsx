import { GetServerSideProps, NextPage } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { login, registration } from "../../http/userAPI";
import { useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import LogOutButton from "../../components/LogOutButton";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setIsAuth, setUser } from "../../redux/reducers/userSlice";
import { useRouter } from "next/router";
import validateToken from "../../utils/validateToken";
import axios, { AxiosError } from "axios";
import AuthPage from "@components/screens/AuthPage";


const Auth: NextPage = () => {


    return <AuthPage/>
}

// export const getServerSideProps: GetServerSideProps = async (context) => {

//     const cookies = context.req.cookies
//     const token = cookies.accessToken || ''

//     const isAuth = await validateToken(token)
//     // console.log(isAuth);


// //    const isValidToken = await validateToken()
// //    console.log(isValidToken)

//   if (isAuth) {
//     return {
//         redirect: {
//             destination: '/profile',
//             permanent: false
//         }
//     }
//   }

//   return {
//     props: {}
//   }
// }

export default Auth