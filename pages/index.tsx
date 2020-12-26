import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answers: string;
  incorrect_answers: Array<string>;
}

const Index: NextPage<{ question: Question }> = (props) => {
  const data = props["data"]["results"][0];

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event);
    // if answer is correct then continue and show correct answer or highlight it with green
    // if answer is wrong, do the same.
  };

  const nextQuestion = () => {
    console.log("Next Question");
    // button is next question after checking, move the page to next question
  };

  return (
    <div>
      <Head>
        <title>Sample Quiz App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero fullscreen main-bg">
        <div className="hero-body">
          <div className="mx-auto text-gray-100">
            <h2>Ready to start the Quiz?</h2>
            <div className="u-center">
              <Link href="/test">
                <button>Start Quiz</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`https://opentdb.com/api.php?amount=10`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
};

export default Index;
