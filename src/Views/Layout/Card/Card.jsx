import './Card.css'
import linkedInYellow from '../../../Assets/Icons/linkedinyellow.png'

export default function Card(props) {
    return (
        <div className={`${props.isBlogPost ? 'blogCard' : 'card'} card-${props.mode}`}>

            {props.cardHeaderImageWide &&
                <img src={props.cardHeaderImageWide} alt="cardHeaderImage" />
            }
            {props.cardHeaderImageSquare &&
                <img className='squared-card-image' src={props.cardHeaderImageSquare} alt="cardHeaderImage" />
            }

            {props.heading &&
                <h2 className={props.isBlogPost ? 'cardHeading blogHeading' : 'cardHeading'}>
                    {props.heading}
                </h2>
            }

            {props.description &&
                <p className="cardDescription">{props.description}</p>
            }

            <div className='technologyTagsContainer'>
                {props.technologies
                    ? props.technologies.map((item) => <p key={item} className='technologyTags'>{item}</p>)
                    : props.technologyIcons
                        ? props.technologyIcons.map((item) => <p className='technologyIcons'>{item}</p>)
                        : null
                }
                {props.isBlogPost &&
                    <div className='viewPost'>
                        <p className='viewPostText'>
                            View Post <img className='linkedInIcon' src={linkedInYellow} alt="linkedin" />
                        </p>
                    </div>
                }
            </div>

            {props.image}

            {props.fullWidthImage &&
                <img
                    className={props.dropShadow ? 'fullWidth dropShadow' : 'fullWidth'}
                    src={props.fullWidthImage}
                    alt="fullWidthImage"
                />
            }

            <div className='vertical-aligned'>
                {props.verticalAlignedFullHeightHeading &&
                    <h1 className='fullHeightText'>{props.verticalAlignedFullHeightHeading}</h1>
                }
                {props.verticalAlignedSubHeading  && <h2>{props.verticalAlignedSubHeading}</h2>}
                {props.verticalAlignedMainHeading  && <h1>{props.verticalAlignedMainHeading}</h1>}
                {props.verticalAlignedContent}
            </div>

            {props.bottomAlignedDescription &&
                <div className='bottom-aligned'>
                    <p className='bottomAlignedText'>{props.bottomAlignedDescription}</p>
                </div>
            }
        </div>
    )
}
