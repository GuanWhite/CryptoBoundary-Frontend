import React from 'react';
import StartButton from "../../components/StartButton/StartButton";
import Footer from "../../components/Footer/Footer";
import './WelcomePage.less';
const WelcomePage = () => {
  return (
    <div className='welcomePage-container'>
      <div className="welcomePage-header">
        <h1>Welcome to our AI agent application!</h1>
      </div>

      <div className="welcomePage-content">
        <p>
          This is a simple AI agent application that allows you to interact with an AI agent. You can ask questions, get answers, and have a conversation with the AI agent. The AI agent is powered by OpenAI's GPT-3 model, which is one of the most advanced language models available today.
        </p>
        <div>
          <h2>use it now!</h2>
          <StartButton buttonName="Start" navProps="/chat"></StartButton>
        </div>
      </div>

      <div className="welcomePage-footer">
        <Footer />
      </div>
    </div>
  );
};

export default WelcomePage;;