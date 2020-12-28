import Head from "next/head";
import { useState, useContext } from "react";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { quizSettings } from "../context/settingsContext";
import { settings } from "cluster";

const Index = () => {
  /* TODO
  When options are changed, update the settings context.
  When user starts quiz.
  Open the test page and then fetch data from api using settings context.

  ADD LATER
  if API does not respond, redirect to HomePage and show error
  Page should contain the settings for the Quiz and Last Score.
  */
  // const { settings, changeSettings } = useContext(settingsContext);
  // const [total, setTotal] = useState(settings.number_of_questions);
  // const [difficulty, setDifficulty] = useState(settings.difficulty);

  // const changeNumberOfQuestions = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   console.log(event.target.value);
  //   const number = Number(event.target.value);
  //   console.log(typeof event.target.value);
  //   changeSettings({
  //     difficulty: "easy",
  //     number_of_questions: Number(number),
  //   });
  //   console.log('settings', settings)
  // };
  const {
    difficulty,
    totalQuestions,
    setDifficulty,
    setTotalQuestions,
  } = quizSettings();

  return (
    <div>
      <Head>
        <title>Test Your Knowledge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero fullscreen main-bg">
        <div className="hero-body">
          <div className="row">
            <div className="col-6 offset-3">
              <div className="card transparent">
                <div className="card-head">
                  <p className="font-bold px-3">Test Your Knowledge</p>
                </div>
                <div className="content p-2">
                  <div className="input-control">
                    <div className="label">
                      Number of Questions {totalQuestions}
                    </div>
                    <select
                      className="select input-small"
                      placeholder="Dropdown Small"
                      onChange={(e) => setTotalQuestions(e.target.value)}
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={30}>30</option>
                    </select>
                  </div>
                  <div className="input-control">
                    <div className="label">Difficulty: {difficulty}</div>
                    <select
                      className="select input-small"
                      placeholder="Dropdown Small"
                      onChange={(e) => setDifficulty(e.target.value)}
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
                <div className="card-footer level content">
                  Last Score: 10/10
                </div>
                <div className="action-bar u-center">
                  <button className="btn-info outline">Start Quiz</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
