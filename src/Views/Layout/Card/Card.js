import './Card.css'

export default function Card(props) {
    return(
        <div className='card'>
            <h2>    {props.heading}  </h2>
                    {props.content}
                    {props.image}
            <div className='vertical-aligned'>
                    {props.verticalAlignedContent} 
            </div>
        </div>
    )  
}