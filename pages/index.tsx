import Head from "next/head";
import { useState, useContext } from "react";
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
  /* TODO
  Page should contain the settings for the Quiz and Last Score.
  */

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
                    <div className="label">Number of Questions</div>
                    <select
                      className="select input-small"
                      placeholder="Dropdown Small"
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                    </select>
                  </div>
                  <div className="input-control">
                    <div className="label">Difficulty</div>
                    <select
                      className="select input-small"
                      placeholder="Dropdown Small"
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
// const res = await fetch(`https://opentdb.com/api.php?amount=10`);
// const data = await res.json();

// // Pass data to the page via props
// return { props: { data } };
// };

export default Index;
