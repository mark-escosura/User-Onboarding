import React, { useState, useEffect } from 'react';
import Form from './components/Form'
import User from './components/User';
import axios from 'axios';
import schema from './validation/FormSchema';
import * as yup from 'yup';
import { validate } from 'uuid';

import logo from './logo.svg';
import './App.css';

const initialFormValues = {
  /** TEXT INPUT **/
  name: '',
  email: '',
  password: '',
  /** CHECKBOXES **/
  terms: false,
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: false,
}

const initialUsers = [] // will eventually hold future users.
const initialDisabled = true // for the button

function App() {

  /******** STATES ********/

  const [users, setUsers] = useState(initialUsers);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  /******** HELPERS ********/

  const getUsers = () => {

    // 👉🏼 IMPLEMENT! ON SUCCESS PUT USERS IN STATE
    // 👉🏼 helper to [GET] all users from `https://reqres.in/api/users` <--- using this API endpoint were going to grab our users

    axios.get('https://reqres.in/api/users')
      .then(res => {
        console.log(res.data);
        setUsers([res.data, ...users]); // we want to add our friends to state
      })
      .catch(err => {
        console.error(err);
      })
  }
  const postNewUser = newUser => {

    //    ON SUCCESS ADD NEWLY CREATED USER TO STATE
    //    helper to [POST] `newUser` to `https://reqres.in/api/users`
    //    and regardless of success or failure, the form should reset

    axios.post('https://reqres.in/api/users', newUser ) // post takes two arguments (apiLink, newUser)
        .then(res => {
          setUsers([res.data, ...users]) // can you explain why they passed in two arguments here.
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          setFormValues(initialFormValues);
        })
  }

  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  const inputChange = (name, value) => {
    // 🔥 STEP 10- RUN VALIDATION WITH YUP
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms
    }
    postNewUser(newUser);
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    schema.isValid(formValues)
    .then(valid => setDisabled(!valid))
  }, [formValues])

  /******** JSX ********/

  return (
    <div className='container'>
      <header><h1>User App</h1></header>

      <Form // Form passing down all of our props

        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}

      />

      {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  );

}
export default App;
