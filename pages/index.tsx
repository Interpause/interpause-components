import 'twin.macro';
import Head from 'next/head';
import { CardData, CardFlex } from '../src/layout/Cards';

export default function Home(){
  let cards:CardData[] = [
    {
      href:"https://nextjs.org/docs",
      title:"Documentation →",
      body:"Find in-depth information about Next.js features and API."
    },
    {
      href:"https://nextjs.org/learn",
      title:"Learn →",
      body:"Learn about Next.js in an interactive course with quizzes!"
    },
    {
      href:"https://github.com/vercel/next.js/tree/master/examples",
      title:"Examples →",
      body:"Discover and deploy boilerplate example Next.js projects."
    },
    {
      href:"https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app",
      title:"Deploy →",
      body:"Instantly deploy your Next.js site to a public URL with Vercel."
    }
  ];
  return <div tw="flex flex-col items-center min-h-screen py-0 px-2">
    <Head>
      <title>Create Next App</title>
    </Head>

    <main tw="flex flex-1 flex-col items-center justify-center py-20 px-0">
      <h1 tw="text-6xl text-center m-0">
        Welcome to <a tw="text-blue-400 no-underline hover:underline" href="https://nextjs.org">Next.js!</a>
      </h1>

      <h2 tw="text-2xl text-center m-0">
        Congrats on successfully setting up twin.macro with emotionjs!
      </h2>

      <p tw="text-2xl text-center my-4">
        Get started by editing{' '}
        <code tw="bg-gray-400 rounded text-xl p-1 font-mono">pages/index.tsx</code>
      </p>
      <CardFlex cards={cards}/>
    </main>

    <footer tw="flex justify-center items-center w-full h-8 border-t-2 border-gray-300">
      <a
        tw="flex justify-center items-center"
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <img src="/vercel.svg" alt="Vercel Logo" tw="ml-2 h-4" />
      </a>
    </footer>
  </div>;
}