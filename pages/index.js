import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sample Quiz App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero fullscreen main-bg">
        <div className="hero-body">
          <div className="mx-auto">
            <h1 className="title uppercase text-gray-100">Look!</h1>
            <h3 className="subtitle text-gray-500">I am tall!</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
