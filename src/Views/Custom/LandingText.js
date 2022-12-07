import './../Portfolio.css'
import './LandingText.css'
import TypeWriterEffect from 'react-typewriter-effect'

export default function LandingText(){
    return (
        <div>
            <h1 className='landingText'>
                <code> &lt;code&gt; </code>
                    <br/> Hi! 👋 I am Hassan, <TypeWriterEffect
                    textStyle={{ fontFamily: 'IBM Plex Sans', fontSize: '42px' }}
                    startDelay={100}
                    cursorColor="grey"
                    multiText={[
                        'I am a Full Stack Developer.',
                        'I explore wonders of physics casually 🧑‍🔬',
                        'I love Javascript 🤩',
                        'I read History in my leisure 🌍',
                      ]}
                    multiTextDelay={5000}
                    typeSpeed={50}
                    eraseSpeed={50} />
                {/* </span> */}
                <code> &lt;code/&gt; </code>
            </h1>
        </div>
    )
}