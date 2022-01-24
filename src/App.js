import "./App.css";
import data from "./data.json";
import React, { Component } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";

const quotes = data.quotes;

const colorGenerator = () => {
  let randomColor = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
  console.log(randomColor);
  return randomColor;
};

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteList: [quotes],
      selectedEl: 0,
      color: colorGenerator(),
    };
  }

  onClick = (event) => {
    event.preventDefault();
    this.setState({ color: colorGenerator() });
    this.setState((prevState) => ({
      selectedEl: prevState.selectedEl + 1,
    }));
  };

  stringToTwitterHandle = (str) => {
    let twitterString = str.replace(/ /g, "%20");
    return twitterString;
  };

  render() {
    document.documentElement.style.setProperty("--primary", this.state.color);
    let quote = quotes[this.state.selectedEl].quote;
    let author = quotes[this.state.selectedEl].author;
    return (
      <div id="page">
        <div id="quote-box">
          <div className="quote">
            <h3 id="text">{quote}</h3>
            <p id="author">{author}</p>
          </div>
          <div id="buttons">
            <a
              className="twitter-share-button"
              id="tweet-quote"
              href={
                `https://twitter.com/intent/tweet?text="` +
                this.stringToTwitterHandle(quote.slice(0, -1)) +
                `".  ` +
                this.stringToTwitterHandle(author)
              }
            >
              <TwitterIcon />
            </a>
            <button onClick={this.onClick} id="new-quote">
              new quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
