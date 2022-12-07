import './Card.css'

export default function Card(props) {
    return (
        <div className='card'>

            {/* Card Headers */}
            
            {props.cardHeaderImageWide ? 
                <img src={props.cardHeaderImageWide} alt="cardHeaderImage" /> : null
            }
            {props.cardHeaderImageSquare ? 
                <img className='squared-card-image' src={props.cardHeaderImageSquare} alt="cardHeaderImage" /> : null
            }

            {/* Card Inner Content */}
            <h2 className='cardHeading'>{props.heading}</h2>
            
            <p className='cardDescription'>{props.description}</p>
            
            <div className='technologyTagsContainer'>
                {props.technologies ? 
                    props.technologies.map((item) => {return <p className='technologyTags'>{item}</p>}) :
                 props.technologyIcons ?
                    props.technologyIcons.map((item) => {return <p className='technologyIcons'>{item}</p>}) : null
                }

            </div>
        
            {props.image}

            {props.fullWidthImage ? 
                <img className={props.dropShadow ? 'fullWidth dropShadow' : 'fullWidth'} src={props.fullWidthImage} alt="fullWidthImage" /> : null
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