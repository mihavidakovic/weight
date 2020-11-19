import React from 'react'
import { csrfToken } from 'next-auth/client'
import Head from 'next/head'

export default function SignIn({ csrfToken }) {
  return (
    <>
      <Head>
        <title>Edit - WeightApp</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="apple-mobile-web-app-title" content="Weight" />
        <meta name="application-name" content="Weight" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#222222" />
      </Head>

      <main className="edit">
        <div className="container">
          <h2>Edit records</h2>
          <form className="form" method='post' action='/api/auth/callback/credentials'>
            <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
            <label>
              Username
            <input name='username' type='text' className="input" />
            </label>
            <label>
              Password
            <input name='password' type='text' className="input" />
            </label>
            <button className="btn btn-primary" type='submit'>Sign in</button>
          </form>
        </div>
      </main>
    </>
  )
}

SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context)
  }
}
