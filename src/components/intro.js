export default function Intro (props){
    return (
        <div className="Intro">
            <h1 className="Title">
                Quizzical
            </h1>
            <p className="Description">
                The best quiz game out there
            </p>
            <button className="Normal-btn" onClick={props.start}>
                Start quiz
            </button>
        </div>

    )
}