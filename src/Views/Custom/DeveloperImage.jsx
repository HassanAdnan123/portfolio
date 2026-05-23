import './DeveloperImage.css'
import developer from './../../Assets/developer.svg'

export default function DeveloperImage(){
    return (
    <img  className='landingImage slide-in-left' 
            src={developer} alt='a developer coding'>
    </img>)
}