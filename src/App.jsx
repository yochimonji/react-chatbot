import './assets/styles/style.css';
import React from 'react';
import defaultDataset from './dataset';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false,
    }
  }

  render() {
    return (
      <section className="c-select">
        <div className="c-box">
          {this.state.currentId}
        </div>
      </section>
    );
  }
}