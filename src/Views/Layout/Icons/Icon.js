import { useState, useEffect } from 'react'
import './Icons.css'

export default function Icon(props) {
  const [image, setImage] = useState(null)

  useEffect(() => {
    const fetchImage = async () => {
        try {
            const response = await import(`../../../Assets/Icons/${props.name}.png`) 
            setImage(response.default)
        } catch (err) {
            console.log("Unable to load icon")
        }
    }
    fetchImage()
  }, [props.name])


  return (
    <div className='iconContainer'>
        <img className='small' 
            src={image} alt="icon"/>
        <p>{props.title}</p>
    </div>
  )
}
