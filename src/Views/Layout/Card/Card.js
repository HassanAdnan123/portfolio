import './Card.css'

export default function Card(props) {
    return(
        <div className='card' style={{
            backgroundColor: props.backgroundColor ? props.backgroundColor : null,
          }}>
            { props.cardHeaderImageWide? <img src={props.cardHeaderImageWide} alt="cardHeaderImage" /> : null }
            { props.cardHeaderImageSquare? <img className='squared-card-image' src={props.cardHeaderImageSquare} alt="cardHeaderImage" /> : null }
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