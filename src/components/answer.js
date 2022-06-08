export default function Answer (props){

    const stylesChecked = {
        backgroundColor: props.isRight && props.isSelected ? "#94D7A2" : 
                         props.isSelected && !props.isRight ? "#F8BCBC" : 
                         !props.isSelected && props.isRight ? "#94D7A2" : "#eff0f7",
        opacity: !props.isSelected && !props.isRight ? "50%" : ""
    } 

    const stylesUnchecked = {
        backgroundColor: props.isSelected ? "#D6DBF5" : "#eff0f7"}
    
    return (
        <button style={props.isCheck ? stylesChecked : stylesUnchecked} className='Answer' onClick={props.toggleSelect}>{props.text}</button>
    )
}