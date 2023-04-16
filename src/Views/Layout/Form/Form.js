import './Form.css'

export default function Form(props) {
    return (
        <div className={'card'}>
            <h4 className='formInputLabel'>Name </h4>
            <input autoComplete='off' className='formInput' type='text' placeholder='Cooper from Interstellar...'></input>
            <h4 className='formInputLabel'>Subject </h4>
            <input autoComplete='off' className='formInput' type='text' placeholder='Feedback / Opportunity...'></input>
            <h4 className='formInputLabel'>Message </h4>
            <textarea autoComplete='off' className='formInput' type='text' placeholder='Your message...'></textarea>
            <button className='submitBtn'>Submit</button>
        </div>
    )
}