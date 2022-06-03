import { useState } from 'react'
import { nanoid } from 'nanoid'
import Answer from './answer'
import { useEffect } from 'react'

export default function Quiz (props){

    const rightAnswers = props.rightA
    const wrongAnswers = props.wrongA
    const answers = JSON.parse(JSON.stringify(wrongAnswers))
    answers.push(rightAnswers)
    answers.sort()

      const objectAnswers = 
        answers.map(function(value){
            return {
                isSelected : false,
                text : value,
                right : value === rightAnswers ? true : false,
                id : nanoid()
            }
    })

    const [ans, setAns] = useState(objectAnswers)
    const [userRight, setUserRight] = useState(0)

    const allAnswers = ans.map((item) => 
    <Answer
        selected = {item.isSelected}
        text = {item.text}
        right = {item.right}
        id = {item.id}
        key = {item.id}
        toggleSelect = {() => toggleSelect(item.id)}
    />)

    function toggleSelect (id){
        setAns(prev => prev.map(item => {
            return item.id === id ? 
                    {...item, isSelected: !item.isSelected} : item
        }))
    }

    useEffect(function (){
            if (ans.isSelected && ans.right) {
                setUserRight(prev => prev + 1 )
             }
             console.log(userRight)
    },[ans.isSelected, ans.right, props.check, userRight])
        
    return (
        <div>
            <h1 className="Question">{props.question}</h1>
            <div>
                {allAnswers}
                <hr/>
            </div>
        </div>
    )
}