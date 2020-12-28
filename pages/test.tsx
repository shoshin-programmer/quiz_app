// import Link from "next/link";
// import { GetServerSideProps, NextPage } from "next";
// import { useState } from "react";

// interface Questions {
//   category: string;
//   type: string;
//   difficulty: string;
//   questions: string[];
//   correct_answers: string;
//   incorrect_answers: string[];
// }

// const TOTAL_QUESTIONS = 10;

// const Test = ({ data }) => {
//   console.log('data', data.results)

//   return (
//     <div>
//       <div className="hero fullscreen main-bg">
//         <div className="hero-body">
//           <div className="mx-auto">
//             {/* <QuestionCard
//               questionNumber={number + 1}
//               totalQuestions={TOTAL_QUESTIONS}
//               question={''}
//               answers={[]}
//               userAnswer={userAnswers ? userAnswers[number] : undefined}
//               callback={checkAnswer}
//             /> */}

//             <Link href="#">
//               <button className="btn btn-xsmall btn-info w-100">Next</button>
//             </Link>
//             <Link href="/">
//               <button className="btn btn-xsmall btn-danger">Restart</button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// Test.getInitialProps = async ({ query }) => {
//   const res = await fetch(`https://opentdb.com/api.php?amount=10`);
//   const data = await res.json();

//   // Pass data to the page via props
//   return { props: { data } };
// };

// export default Test;
import QuestionCard from "../components/QuestionCard";
import useSWR from "swr";
import { SettingsContext } from "../context/settings-context";

export default function Profile() {
  return (
    <SettingsContext.Consumer>
      {({ difficulty, totalQuestions, changeSettings }) => {
        return (
          <>
            <Questions
              difficulty={difficulty}
              totalQuestions={totalQuestions}
            />
          </>
        );
      }}
    </SettingsContext.Consumer>
  );
}

function Questions(props) {
  const difficulty = props.difficulty;
  const totalQuestions = props.totalQuestions;
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    `https://opentdb.com/api.php?amount=${totalQuestions}&difficulty=${difficulty}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  console.log(data.results);
  return (
    <div>
      <div className="hero fullscreen main-bg">
        <div className="hero-body">
          <div className="mx-auto">
            {data.results.map((data) => (
              <QuestionCard
                question={data.question}
                answers={data.incorrect_answers}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
