import './App.css'
import Intro from './components/intro'
import Quiz from './components/quiz'
import {useState, useEffect} from 'react'
import { nanoid } from 'nanoid'
import he from 'he'


function App() {

  const [isStarted, setIsStarted] = useState(false)
  const [checkAnswers, setCheckAnswers] = useState(false)
  const [questions, setQuestions] = useState([])
  const [count, setCount] = useState(0)
  
  function start (){
    setIsStarted(prev => !prev)
    setCheckAnswers(false)
    setCount(0)
  }
  
  // get questions from API & format it to be usable in code (decode / add unique id for each question / group correct & incorrect answers to render)
  useEffect(function (){
    fetch('https://opentdb.com/api.php?amount=5&type=multiple&category=11&difficulty=easy')
      .then(res => res.json())
      .then(data => setQuestions(data.results.map((item) => {
        return {
          id: nanoid(),
          question: he.decode(item.question),
          answers: createAnswersObject(JSON.parse(he.decode(JSON.stringify([...item.incorrect_answers, item.correct_answer]))), he.decode(item.correct_answer)),
          correctAnswer: he.decode(item.correct_answer),
          isSelected: false,
          category: item.category,
          difficulty: item.difficulty
        }
      })))
  }, [isStarted])

  const allQuiz = questions.map((item) =>
    <Quiz
      question = {item.question}
      answers = {item.answers}
      rightA = {item.correctAnswer}
      id = {item.id}
      key = {item.id}
      isSelected = {item.isSelected}
      checked = {checkAnswers}
      toggleSelect = {toggleSelect}
      category = {item.category}
      difficulty = {item.difficulty}
    />
  )

  function createAnswersObject (arr, correctAns){
    arr.sort()
    let array = arr.map((answer) => {
      return {
        isSelected: false,
        text: answer,
        id: nanoid(),
        isRight: (answer === correctAns)
      }
    })
    return array
  }

  function toggleCheck (){
    setCheckAnswers(prev => !prev)
    setCount(prev => {
      questions.forEach(question => {
        question.answers.forEach(ans => {
          if (ans.isSelected && ans.isRight) { prev++ } })
      })
      return prev
    })
    }
  
  function toggleSelect (questId, answerId){
    setQuestions(prev => prev.map(question => {
        return question.id === questId ? 
                {...question, 
                  answers: question.answers.map((answer) => {
                    return answer.id === answerId ? 
                          {...answer, 
                            isSelected: !answer.isSelected } : 
                            {...answer,
                            isSelected: false}})} : 
                question}
    ))
  }

  return (
    <main>
      {isStarted ? <div className='container'>
                      {allQuiz}
                      <div className='Footer-container'>{checkAnswers ?
                        <button className='Normal-btn' onClick={start}>Try again !</button> : 
                        <button className='Normal-btn' onClick={toggleCheck}>Check answers</button> }
                        {checkAnswers ? <h2>You scored {count}/5</h2> : ""}
                      </div>
                  </div> : 
                  <Intro start={start}/>}
      
    </main>
  );
}

export default App;
