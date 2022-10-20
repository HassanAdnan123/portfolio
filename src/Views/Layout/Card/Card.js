import './Card.css'

export default function Card(props) {
    return(
        <div className='card'>
            <h2>    {props.heading}  </h2>
                    {props.content}
                    {props.image}
                    {props.fullwidthimageurl? <img className='fullWidth' src={props.fullwidthimageurl} /> : null }
            <div className='vertical-aligned'>
            <h2>    {props.verticalAlignedSubHeading} </h2>
            <h1>    {props.verticalAlignedMainHeading} </h1>
                    {props.verticalAlignedContent} 
            </div>
        </div>
    )  
}