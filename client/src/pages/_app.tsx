import '../scss/app.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import MainLayOut from '../layouts/MainLayOut'
import { Provider } from 'react-redux'

import {store} from '../redux/store'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <Head>
        <meta charSet='utf-8' />
        <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name='theme-color' content='#000000' />
				<meta name='author' content='App' />
        <meta
					name='description'
					content='Some description'
				/>
        <title>Title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayOut>
        <Component {...pageProps} />
      </MainLayOut>
    </Provider>
  )
}

export default MyApp
