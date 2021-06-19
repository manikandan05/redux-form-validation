import { Field, reduxForm } from 'redux-form/immutable'; 
import DropdownList from 'react-widgets/DropdownList';
import Multiselect from 'react-widgets/Multiselect';

const renderInput = ({ input, label, type, title, meta: { touched, error, warning } }) => {
    return (
        <div className='form-group'>
            <label className='col-sm-4'>{label}
                {title && <span title={title} className='bi bi-question-circle-fill'></span>}
            </label>
            <div className='control'>
                <input {...input} type={type} placeholder={label} className='text' />
                {touched && ((error && <span className='text-danger bi bi-exclamation-circle-fill'>{error}</span>) || (warning && <span className='text-danger'>{warning}</span>))}
            </div>
        </div>
    )
}
const renderTextArea = ({ input, label, title, meta: { touched, error, warning } }) => {
    return (
        <div className='form-group'>
            <label className='col-sm-4'>{label}
                {title && <span title={title}>C</span>}
            </label>
            <div className='control'>
                <textarea {...input} placeholder={label}></textarea>
                {touched && ((error && <span className='text-danger bi bi-exclamation-circle-fill'>{error}</span>) || (warning && <span className='text-danger'>{warning}</span>))}
            </div>
        </div>
    )
}

const renderDropDown = ({ valuefield, textfield, label, data, input, meta: { touched, error, warning } }) => {
    return (
        <div className='form-group'>
            <label className='col-sm-4'>{label}</label>
            <div className='control'>
                <DropdownList {...input} valueField={valuefield} textField={textfield} data={data} onBlur={() => input.onBlur()} placeholder={label}></DropdownList>
                {touched && ((error && <span className='text-danger bi bi-exclamation-circle-fill'>{error}</span>) || (warning && <span className='text-danger'>{warning}</span>))}
            </div>
        </div>
    );
}

const renderMultiSelect = ({ textfield, label, data, input, meta: { touched, error, warning } }) => {
    return (
        <div className='form-group'>
            <label className='col-sm-4'>{label}</label>
            <div className='control'>
                <Multiselect {...input} textField={textfield} data={data} value={input.value || []} onBlur={() => input.onBlur()} placeholder={label}></Multiselect>
                {touched && ((error && <span className='text-danger bi bi-exclamation-circle-fill'>{error}</span>) || (warning && <span className='text-danger'>{warning}</span>))}
            </div>
        </div>
    )
}

const renderCheckbox = ({ input, label, type, labelClass, meta: { touched, error, warning } }) => {
    return (
        <div className='terms form-group'>
            <input {...input} type={type} placeholder={label} className='text' />
            <span className={labelClass}>{label}</span>
            {touched && ((error && <span className='text-danger bi bi-exclamation-circle-fill'>{error}</span>) || (warning && <span className='text-danger'>{warning}</span>))}
        </div>
    )
}

const listData = [{ 'value': 'Under Graduate' }, { 'value': 'Post Graduate' }];
const skillsData = ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Angular', 'React'];
const genderData = [{ 'value': 'Male' }, { 'value': 'Female' }];

const validateForm = values => {
    let errors = {};
    if (!values.get('firstname') || (values.get('firstname')).trim().length === 0) {
        errors.firstname = 'First name must be required!';
    } else if (/[^a-zA-Z0-9 ]/i.test((values.get('firstname')).trim())) {
        errors.firstname = 'Only Alpha Numeric characters allowed!';
    }
    else if ((values.get('firstname')).trim().length < 4) {
        errors.firstname = 'First name must have minimum 4 characters!';
    }
    else if ((values.get('firstname')).trim().length > 15) {
        errors.firstname = 'First name not having more than 15 characters!';
    }
    if (!values.get('lastname') || (values.get('lastname')).trim().length === 0) {
        errors.lastname = 'Last name must be required!';
    } else if (values.get('lastname') && /[^a-zA-Z0-9 ]/i.test((values.get('lastname')).trim())) {
        errors.lastname = 'Only Alpha Numeric characters allowed!';
    }
    else if ((values.get('lastname')).trim().length <= 1) {
        errors.lastname = 'Last name must have minimum 1 characters!';
    }
    else if ((values.get('lastname')).trim().length > 15) {
        errors.lastname = 'Last name not having more than 15 characters!';
    }
    if (!values.get('email') || (values.get('email')).trim().length === 0) {
        errors.email = 'Email must be required!';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test((values.get('email')).trim())) {
        errors.email = 'Invalid Email address!';
    }
    if (!values.get('qualification') || (values.get('qualification') && (values.get('qualification').value).trim().length === 0)) {
        errors.qualification = 'Qualification must be required!';
    }
    if (!values.get('gender') || (values.get('gender') && (values.get('gender').value).trim().length === 0)) {
        errors.gender = 'Gender must be required!';
    }
    if (!values.get('dob') || ((values.get('dob')).trim().length === 0)) {
        errors.dob = 'DOB must be required!';
    } else if (!/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.test((values.get('dob')).trim())) {
        errors.dob = 'Enter Date in DD/mm/yyyy format!';
    }
    if (!values.get('skills') || (values.get('skills') && values.get('skills').length === 0)) {
        errors.skills = 'Skills must be required!';
    }
    if (!values.get('contact') || (values.get('contact')).trim().length === 0) {
        errors.contact = 'Contact Number must be required!';
    } else if (!/^(0|[1-9][0-9]{9})$/i.test((values.get('contact')).trim())) {
        errors.contact = 'Contact Number must have 10 digits!';
    }
    if (!values.get('about') || (values.get('about')).trim().length < 100) {
        errors.about = 'Mimumum 100 characters required!';
    }
    if (!values.get('terms')) {
        errors.terms = 'Kindly Accept the Terms & Conditions!';
    }
    return errors;
}

let Immutable = (props) => {
    const { pristine, reset, submitting, handleSubmit } = props;
    return (
        <div className='form-layout'>
            <div className='header'>From Validation using Immutable</div>
            <form onSubmit={handleSubmit}>
                <Field type='input' component={renderInput} name='firstname' label='First Name'></Field>
                <Field type='input' component={renderInput} name='lastname' label='Last Name'></Field>
                <Field type='input' component={renderInput} name='email' label='E-mail'></Field>
                <Field component={renderDropDown} name='qualification' label='Qualification' valuefield='value' textfield='value' data={listData}></Field>
                <Field component={renderDropDown} name='gender' label='Gender' valuefield='value' textfield='value' data={genderData}></Field>
                <Field type='input' component={renderInput} name='dob' label='DOB' title='dd/mm/yyyy'></Field>
                <Field component={renderMultiSelect} name='skills' label='Skills' textfield='value' data={skillsData}></Field>
                <Field type='input' component={renderInput} name='contact' label='Contact Number'></Field>
                <Field type='input' component={renderTextArea} name='about' label='About Me'></Field>
                <div className='footer'>
                    <label className='col-sm-4'></label>
                    <Field component={renderCheckbox} type='checkbox' name='terms' labelClass='license-text' label='Accept the Terms and Conditions'></Field>
                    <label className='col-sm-4'></label>
                    <div className='btns form-group'>
                        <Field component='button' className='btn btn-primary' type='submit' disabled={pristine || submitting}>Submit</Field>
                        <Field component='button' className='btn btn-default' type='button' disabled={pristine || submitting} onClick={reset}>Clear</Field>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'Immutable',
    validate: validateForm
})(Immutable);