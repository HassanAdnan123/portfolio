import './Card.css'

export default function Card(props) {
    return (
        <div className='card' style={{
            backgroundColor: props.backgroundColor ? props.backgroundColor : null,}}>

            {/* Card Headers */}
            
            {props.cardHeaderImageWide ? 
                <img src={props.cardHeaderImageWide} alt="cardHeaderImage" /> : null
            }
            {props.cardHeaderImageSquare ? 
                <img className='squared-card-image' src={props.cardHeaderImageSquare} alt="cardHeaderImage" /> : null
            }

            {/* Card Inner Content */}
            <h2>{props.heading}</h2>
            
            {props.content}

            {props.image}

            {props.fullWidthImage ? 
                <img className='fullWidth' src={props.fullWidthImage} /> : null
            }
            
            {/* Card Vertically Aligned Content */}
            <div className='vertical-aligned'>
                <h1 className='fullHeightText'>    {props.verticalAlignedFullHeightHeading} </h1>
                <h2>    {props.verticalAlignedSubHeading} </h2>
                <h1>    {props.verticalAlignedMainHeading} </h1>
                
                {props.verticalAlignedContent}
            
            </div>
        </div>
    )
}