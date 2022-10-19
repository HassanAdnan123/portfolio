import './Landing.css'
import developer from './../../Assets/developer.svg'
import Card from '../Layout/Card/Card'

export default function Landing() {

    return (
        <div>
            <Card content={<img className='landingImage slide-in-left' src={developer} alt='a developer coding'></img>} />
            <Card content={
                    <h1>
                        <code> &lt;code&gt; </code>
                            Hi! I am Hassan, a Full Stack Javascript Developer..
                        <code> &lt;code/&gt; </code>
                    </h1>
            }/>
        </div>
    )
}
