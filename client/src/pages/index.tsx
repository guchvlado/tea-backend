import type { NextPage } from 'next'
import HomePage from '../components/screens/HomePage'
import { ICategory } from '../types/ICategory'

interface HomePageProps {
  categories: ICategory[]
}

const Home: NextPage<HomePageProps> = (props) => {
  return <HomePage {...props} />
}

// export const getServerSideProps = async () => {

//   const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/tea`)
//   const data = await response.json()

//   if (!data) {
//     return {
//       notFound: true
//     }
//   }

//   return {
//     props: {
//       itemsCount: data.count,
//       items: data.rows
//     }
//   }
// }

export const getStaticProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/categories`)
  const data = await response.json()

  if (!data) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      categories: data
    }
  }
}

export default Home
