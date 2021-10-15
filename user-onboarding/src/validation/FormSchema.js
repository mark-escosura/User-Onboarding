// Here goes the schema for the form
import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
            .string()
            .trim()
            .required('Name is required!'),
                // tell it to be a string and required
                // order matters
    email: yup
            .string()
            .email('Must be a valid email address!')
            .required('Email is required!'),
    password: yup
            .string()
            // .password('Must have contain at least 8 characters -— the more characters, the better.')
            .required('Password is required!')
            .min(6, 'Password must include 6 or more characters.'),
    terms: yup
            .boolean(false)
            .oneOf([true],'You must agree to the application agreement terms before continuing.')
})

export default formSchema;