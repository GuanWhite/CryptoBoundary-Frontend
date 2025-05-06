import "./NotFoundPage.less";
import SVGComponent from "./SVGComponent";
import StartButton from "../../components/StartButton/StartButton";


function NotFoundPage() {

  return (
    <main className="errorpage-outdiv">
      <div className="errorpage-container">
        <div className="row">
          <div className="leftbox">
            <SVGComponent />
          </div>
          <div className="rightbox">
            <h1 className="errorpage-h1">404</h1>
            <h2 className="errorpage-h2">OH! You look like you're lost.</h2>
            <p className="errorpage-p">The page you are looking for does not exist.
              How you got here is a mystery.
              But you can click the button below to go back to the homepage.
            </p>
            <StartButton buttonName="HOME" navProps="/" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotFoundPage;