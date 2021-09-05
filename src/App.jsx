import './assets/styles/style.css';
import React from 'react';
import defaultDataset from './dataset';
import { AnswersList, Chats } from './componets'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false,
    };
  }

  displayNextQuestion = (nextQuestionId) => {
    const chats = this.state.chats;
    chats.push({
      text: this.state.dataset[nextQuestionId].question,
      type: 'question',
    })
    this.setState({
      answers: this.state.dataset[nextQuestionId].answers,
      chats: chats,
      currentId: nextQuestionId,
    })
  }

  selectAnswer = (selectedAnswer, nextQuestionId) => {
    switch (true) {
      case (nextQuestionId === 'init'):
        this.displayNextQuestion(nextQuestionId)
        break;
      default:
        const chat = {
          text: selectedAnswer,
          type: 'answer',
        }
        const chats = this.state.chats;
        chats.push(chat);

        this.setState({
          chats: chats,
        });

        this.displayNextQuestion(nextQuestionId);
        break;
    }
  }

  componentDidMount() {
    const initAnswer = '';
    this.selectAnswer(initAnswer, this.state.currentId);
  }

  render() {
    return (
      <section className="c-select">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList answers={this.state.answers} select={this.selectAnswer} />
        </div>
      </section>
    );
  }
}