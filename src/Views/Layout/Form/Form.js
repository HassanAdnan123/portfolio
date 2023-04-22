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
            return  { ...state, message: action.value };
        case 'successMessage':
            return {...state, successMessage: action.value};
        case 'errorMessage':
            return {...state, errorMessage: action.value};
        default:
            return state;
        }
    }

    const [feedbackForm, setFeedbackForm] = useState({})
    const [state, dispatch] = useReducer(reducer, initialState)

    const submitFeedbackOnFirebase = (stateValue) => {
        let localObject = feedbackForm

        // Check if email already exists:
        if(localObject[stateValue.email.split('.')[0].replace('@','_')] !== undefined)
        {
            dispatch({type: 'successMessage', value: ''})
            dispatch({type: 'errorMessage', value: 'You\'ve already submitted a message from this email!'})
        }


        else {
            // Split email into 'username_emailProvier' pattern to avoid object save problems
            localObject[stateValue.email.split('.')[0].replace('@','_')] = stateValue
            setFeedbackForm(localObject)
            set(ref(db, 'feedbackForm'), feedbackForm);
            
            // Set alert messages below input fields
            dispatch({type: 'errorMessage', value: ''})
            dispatch({type: 'successMessage', value: 'Message sent to Hassan!'})
        }
        
    }

    return (
        <div className={'card'}>
            <h4 className='formInputLabel'>Name </h4>
            <input autoComplete='off' onChange={ e => dispatch({type: 'name', value: e.target.value})} className='formInput' type='text' placeholder='Cooper from Interstellar...'></input>
            <h4 className='formInputLabel'>Email </h4>
            <input type='email'onChange={ e => dispatch({type: 'email', value: e.target.value})}  autoComplete='off' className='formInput' placeholder='cooper@nasa.com'></input>
            <h4 className='formInputLabel'>Message </h4>
            <textarea autoComplete='off' onChange={ e => dispatch({type: 'message', value: e.target.value})} className='formInput' type='text' placeholder='Your message...'></textarea>
            <button className='submitBtn' onClick={() => submitFeedbackOnFirebase(state)}>Submit</button>
            <h6 className='responseMessage'> <span className="successText">{state.successMessage}</span> <span className="errorText">{state.errorMessage}</span> </h6>
        </div>
    )
}