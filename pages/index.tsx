import Head from "next/head";
import { useState, useContext } from "react";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

import { SettingsContext } from "../context/settings-context";

const Index = () => {
  /* TODO
  When options are changed, update the settings context.
  When user starts quiz.
  Open the test page and then fetch data from api using settings context.

  ADD LATER
  if API does not respond, redirect to HomePage and show error
  Page should contain the settings for the Quiz and Last Score.

  If option is changed, update the link to handle the setting-change.
  */
  return (
    <SettingsContext.Consumer>
      {({ difficulty, totalQuestions, changeSettings }) => (
        <>
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
                          onChange={(e) =>
                            changeSettings({
                              difficulty: difficulty,
                              totalQuestions: e.target.value,
                              changeSettings: () => {},
                            })
                          }
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
                          onChange={(e) =>
                            changeSettings({
                              difficulty: e.target.value,
                              totalQuestions: totalQuestions,
                              changeSettings: () => {},
                            })
                          }
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
                      <Link href="/test">
                        <button className="btn-info outline">Start Quiz</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </SettingsContext.Consumer>
  );
};

export default Index;
