import './../Portfolio.css'
import './LandingText.css'
import TypeWriterEffect from 'react-typewriter-effect'

export default function LandingText(){
    return (
        <div>
            <h1 className='landingText'>
                <code> &lt;code&gt; </code>
                    <br/>
                    <div className='indentedText'> 
                        Hi! 👋 I am Hassan, 
                        <TypeWriterEffect
                            className='landingText'
                            textStyle={{ fontFamily: 'IBM Plex Sans', fontSize: '42px' }}
                            startDelay={100}
                            cursorColor="grey"
                            multiText={[
                                '\u00A0I\'m a Full-Stack Developer.👨‍💻',
                                'I hate bugs 🪲 both real and in software 🥲',
                                'My dream is to write 100% clean code. 🥰',
                                'Java & Javascript are my forte ❤️'
                            ]}
                            multiTextDelay={5000}
                            typeSpeed={50}
                            eraseSpeed={50}
                        />
                    </div>
                <code> &lt;code/&gt; </code>
            </h1>
        </div>
    )
}