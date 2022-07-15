import Answer from './answer'

export default function Quiz (props){

    const allAnswers = props.answers.map((answer) => 
        <Answer
            isSelected = {answer.isSelected}
            text = {answer.text}
            id = {answer.id}
            key = {answer.id}
            isCheck = {props.checked} 
            rightA = {props.rightA}
            isRight = {answer.isRight}
            toggleSelect = {() => props.toggleSelect(props.id, answer.id)}
        />)
        
    return (
        <div>
            <div className='Title-container'>
                <h1 className="Question">{props.question}</h1>
                <div className='Info-container'>
                    <p className='Info'>{props.category}</p>
                    <p className='Info'>{props.difficulty}</p>
                </div>
            </div>
            <div>
                <div className='Answers-container'>
                    {allAnswers}
                </div>
                <hr/>
            </div>
        </div>
    )
}