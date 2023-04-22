import './Card.css'
import linkedInYellow from '../../../Assets/Icons/linkedinyellow.png'

export default function Card(props) {
    return (
        <div className={props.isBlogPost ? 'blogCard' : 'card'}>

            {/* Card Headers */}
            
            {props.cardHeaderImageWide ? 
                <img src={props.cardHeaderImageWide} alt="cardHeaderImage" /> : null
            }
            {props.cardHeaderImageSquare ? 
                <img className='squared-card-image' src={props.cardHeaderImageSquare} alt="cardHeaderImage" /> : null
            }

            {/* Card Inner Content */}
            <h2 className={props.isBlogPost ? 'cardHeading blogHeading': 'cardHeading'}>{props.heading}</h2>
            
            <p className='cardDescription'>{props.description}</p>
            
            <div className='technologyTagsContainer'>
                {props.technologies ? 
                    props.technologies.map((item) => {return <p className='technologyTags'>{item}</p>}) :
                 props.technologyIcons ?
                    props.technologyIcons.map((item) => {return <p className='technologyIcons'>{item}</p>}) : null
                }
                {props.isBlogPost ? 
                <div className='viewPost'> 
                    <p className='viewPostText'>
                        View Post <img className='linkedInIcon' src={linkedInYellow} alt="linkedin"/> 
                    </p> 
                </div> : null}
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
            {props.bottomAlignedDescription ? 
                <div className='bottom-aligned'>
                    <p className='bottomAlignedText'>{props.bottomAlignedDescription}</p>
                </div> : null}
        </div>
    )
}