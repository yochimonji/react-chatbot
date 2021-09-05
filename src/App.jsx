import './assets/styles/style.css';
import React from 'react';
import { AnswersList, Chats } from './componets'
import FromDialog from './componets/forms/FormDialog';
import { db } from './firebase/index';
import { collection, getDocs } from "firebase/firestore";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: {},
      open: false,
    };
    this.selectAnswer = this.selectAnswer.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
        setTimeout(() => this.displayNextQuestion(nextQuestionId), 500);
        break;
      case (/^https:*/.test(nextQuestionId)):
        const a = document.createElement('a');
        a.href = nextQuestionId;
        a.target = '_blank';
        a.click();
        break;
      case (nextQuestionId === 'contact'):
        this.handleClickOpen();
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

        setTimeout(() => this.displayNextQuestion(nextQuestionId), 1000);
        break;
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  initDataset = (dataset) => {
    this.setState({ dataset: dataset });
  }

  componentDidMount() {
    (async () => {
      const dataset = this.state.dataset;
      const querySnapshot = await getDocs(collection(db, "questions"));
      querySnapshot.forEach(doc => {
        dataset[doc.id] = doc.data();
      });

      this.initDataset(dataset);
      const initAnswer = '';
      this.selectAnswer(initAnswer, this.state.currentId);
    })()
  }

  componentDidUpdate() {
    const scrollArea = document.getElementById('scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }

  render() {
    return (
      <section className="c-select">
        <div className="c-box">
          <Chats chats={this.state.chats} />
          <AnswersList answers={this.state.answers} select={this.selectAnswer} />
          <FromDialog open={this.state.open} handleClose={this.handleClose} />
        </div>
      </section>
    );
  }
}