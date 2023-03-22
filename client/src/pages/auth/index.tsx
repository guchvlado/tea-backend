import { GetServerSideProps, NextPage } from "next";
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