import React from 'react'
import './Body.css'
import developer from './../../Assets/developer.svg'

export default function Body() {
    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-sm d-flex justify-content-center'>
                        <img className='landingImage' src={developer} alt='a developer coding'></img>
                    </div>
                    <div className='col-sm d-flex align-items-center'>
                        <h1 className='landingMessage'>
                            <code>
                                &lt;about&gt;
                            </code>
                            <br></br>
                            &nbsp; &nbsp; Hi! I am Hassan,
                            <br></br>
                            &nbsp; &nbsp; A Full Stack Developer..
                            <code>
                                &lt;about/&gt;
                            </code>
                        </h1>
                    </div>
                </div>
            </div>
            <div className='row d-flex justify-content-center'>
                    <i class="bi bi-arrow-down"></i>
            </div>
            <div className='row'>
                <div className='col-sm'>
                    <p className='subtext'>
                        Hi! I am hassan and I am a full stack ninja
                        with expertise in Web-Apps (MEAN / MERN) and Backend development
                    </p>
                </div>
                <div className='col-sm'>

                </div>
            </div>
        </div>
    )
}
