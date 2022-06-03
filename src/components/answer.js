export default function Answer (props){
    const styles = {
        backgroundColor: props.selected ? "#D6DBF5" : "#eff0f7"
    } 

    return (
        <button style={styles} className='Answer' onClick={props.toggleSelect}>{props.text}</button>
    )
}