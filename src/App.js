import './App.css'
import Intro from './components/intro'
import Quiz from './components/quiz'
import {useState, useEffect} from 'react'
import { nanoid } from 'nanoid'


function App() {

  const [isStarted, setIsStarted] = useState(false)
  const [check, setCheck] = useState(false)
  const [questions, setQuestions] = useState([])
  const [count, setCount] = useState(0)
  
  function start (){
    setIsStarted(prev => !prev)
  }
  
  useEffect(function (){
    fetch('https://opentdb.com/api.php?amount=5&category=9&type=multiple')
      .then(res => res.json())
      .then(data => setQuestions(data.results))
  }, [])

  const allQuiz = questions.map((item) =>
    <Quiz
      question = {item.question}
      wrongA = {item.incorrect_answers}
      rightA = {item.correct_answer}
      id = {nanoid()}
      key = {nanoid()}
      check = {check}
      count = {count}
    />
  )

  function toggleCheck (){
    setCheck(prev => !prev)
  }
  console.log(check)

  useEffect(function(selected, right){
    if (selected && right){
      setCount(prev => prev +1)
    }
  }, [check])

  console.log(allQuiz)

  return (
    <main>
      {isStarted ? <div className='container'>
                      <p>There's only one right answer by question</p>
                      {allQuiz}
                      <button className='Normal-btn' onClick={toggleCheck}>Check answers</button>
                  </div> : 
                  <Intro start={start}/>}
      
    </main>
  );
}

export default App;
