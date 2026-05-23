import './Form.css'
import React, { useReducer, useEffect, useState } from "react";
import { db } from '../../../utils/firebase'
import { ref, set, child, get } from 'firebase/database'

export default function Form(props) {

    useEffect(() => {
        const dbRef = ref(db);
        get(child(dbRef, `feedbackForm`)).then((snapshot) => {
            if (snapshot.exists()) {
                setFeedbackForm(snapshot.val())
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])

    const initialState = {
        name: '',
        email: '',
        message: '',
        successMessage: '',
        errorMessage: ''
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'name':
                return { ...state, name: action.value };
            case 'email':
                return { ...state, email: action.value };
            case 'message':
                return { ...state, message: action.value };
            case 'successMessage':
                return { ...state, successMessage: action.value };
            case 'errorMessage':
                return { ...state, errorMessage: action.value };
            default:
                return state;
        }
    }

    const [feedbackForm, setFeedbackForm] = useState({})
    const [state, dispatch] = useReducer(reducer, initialState)

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const submitFeedbackOnFirebase = (stateValue) => {
        const name = stateValue.name.trim()
        const email = stateValue.email.trim()
        const message = stateValue.message.trim()

        if (!name || name.length > 100) {
            dispatch({ type: 'successMessage', value: '' })
            dispatch({ type: 'errorMessage', value: 'Please enter a valid name (max 100 characters).' })
            return
        }
        if (!EMAIL_REGEX.test(email)) {
            dispatch({ type: 'successMessage', value: '' })
            dispatch({ type: 'errorMessage', value: 'Please enter a valid email address.' })
            return
        }
        if (!message || message.length > 1000) {
            dispatch({ type: 'successMessage', value: '' })
            dispatch({ type: 'errorMessage', value: 'Please enter a message (max 1000 characters).' })
            return
        }

        const emailKey = email.replace(/[.#$[\]]/g, '_')
        let localObject = feedbackForm

        if (localObject[emailKey] !== undefined) {
            dispatch({ type: 'successMessage', value: '' })
            dispatch({ type: 'errorMessage', value: 'You\'ve already submitted a message from this email!' })
            return
        }

        localObject[emailKey] = { name, email, message }
        setFeedbackForm(localObject)
        set(ref(db, 'feedbackForm'), localObject)

        dispatch({ type: 'errorMessage', value: '' })
        dispatch({ type: 'successMessage', value: 'Message sent to Hassan!' })
    }

    return (
        <div className={`card card-${props.mode}`}>
            <h4 className='formInputLabel'>Name </h4>
            <input autoComplete='off' onChange={e => dispatch({ type: 'name', value: e.target.value })} className='formInput' type='text' placeholder='Cooper from Interstellar...'></input>
            <h4 className='formInputLabel'>Email </h4>
            <input type='email' onChange={e => dispatch({ type: 'email', value: e.target.value })} autoComplete='off' className='formInput' placeholder='cooper@nasa.com'></input>
            <h4 className='formInputLabel'>Message </h4>
            <textarea autoComplete='off' onChange={e => dispatch({ type: 'message', value: e.target.value })} className='formInput' type='text' placeholder='Your message...'></textarea>
            <button className='submitBtn' onClick={() => submitFeedbackOnFirebase(state)}>Submit</button>
            <h6 className='responseMessage'> <span className="successText">{state.successMessage}</span> <span className="errorText">{state.errorMessage}</span> </h6>
        </div>
    )
}