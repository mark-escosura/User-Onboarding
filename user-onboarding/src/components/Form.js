import React from 'react'

function Form(props) {
    const {
        values,
        submit,
        change,
        disabled,
        errors
    } = props
    
    const onSubmit = evt => {
        evt.preventDefault() // prevents the form from refreshing
        submit()
    }
    
    const onChange = evt => {
        const { name, value, checked, type } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value;
        change(name, valueToUse);
    }

    return (
        <form className="container" onSubmit={onSubmit}>
        <div className="user-onboard submit">
            <h2>Welcome aboard, {values.name}</h2>
        </div>

                {/* NAME */}
                {/* NAME */}
                {/* NAME */}

            <label> Name&nbsp;
                <input 
                    value={values.name}
                    onChange={onChange}
                    name="name"
                    type="text"
                    placeholder="Username here"
                />
            </label>

                {/* EMAIL */}
                {/* EMAIL */}
                {/* EMAIL */}
            
            <label> Email&nbsp;
                <input 
                    value={values.email}
                    onChange={onChange}
                    name="email"
                    type="text"
                    placeholder="Email goes here"
                />
            </label>

                {/* PASSWORD */}
                {/* PASSWORD */}
                {/* PASSWORD */}

            <label> Password&nbsp;
                <input 
                    value={values.password}
                    onChange={onChange}
                    name="password"
                    type="password"
                    placeholder="Password goes here"
                />
            </label>

                 {/* CHECKBOXES */}
                 {/* CHECKBOXES */}
                 {/* CHECKBOXES */}

            <label> <a href="/">Terms Of Service</a>&nbsp;
                <input 
                    type="checkbox"
                    name="terms"
                    onChange={onChange}
                    checked={values.terms}
                />
            </label>

            {/* 🔥 DISABLE THE BUTTON */}
            <button id="submitBtn" disabled={disabled}>submit</button>

            <div className='errors'>
            {/* 🔥 RENDER THE VALIDATION ERRORS HERE */}
                <div>{errors.name}</div>
                <div>{errors.email}</div>
                <div>{errors.password}</div>
                <div>{errors.terms}</div>
            </div>
        </form>
    )
}
export default Form;