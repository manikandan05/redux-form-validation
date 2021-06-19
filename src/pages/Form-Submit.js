import { Field, reduxForm, SubmissionError } from 'redux-form';
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

function submit(values) {
    if (!values.firstname || (values.firstname).trim().length === 0) {
        throw new SubmissionError({ firstname: 'First name must be required!' });
    } else if (/[^a-zA-Z0-9 ]/i.test((values.firstname).trim())) {
        throw new SubmissionError({ firstname: 'Only Alpha Numeric characters allowed!' });
    }
    else if ((values.firstname).trim().length < 4) {
        throw new SubmissionError({ firstname: 'First name must have minimum 4 characters!' });
    }
    else if ((values.firstname).trim().length > 15) {
        throw new SubmissionError({ firstname: 'First name not having more than 15 characters!' });
    }
    if (!values.lastname || (values.lastname).trim().length === 0) {
        throw new SubmissionError({ lastname: 'Last name must be required!' });
    } else if (values.lastname && /[^a-zA-Z0-9 ]/i.test((values.lastname).trim())) {
        throw new SubmissionError({ lastname: 'Only Alpha Numeric characters allowed!' });
    }
    else if ((values.lastname).trim().length <= 1) {
        throw new SubmissionError({ lastname: 'Last name must have minimum 1 characters!' });
    }
    else if ((values.lastname).trim().length > 15) {
        throw new SubmissionError({ lastname: 'Last name not having more than 15 characters!' });
    }
    if (!values.email || (values.email).trim().length === 0) {
        throw new SubmissionError({ email: 'Email must be required!' });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test((values.email).trim())) {
        throw new SubmissionError({ email: 'Invalid Email address!' });
    }
    if (!values.qualification || (values.qualification && (values.qualification.value).trim().length === 0)) {
        throw new SubmissionError({ qualification: 'Qualification must be required!' });
    }
    if (!values.gender || (values.gender && (values.gender.value).trim().length === 0)) {
        throw new SubmissionError({ gender: 'Gender must be required!' });
    }
    if (!values.dob || ((values.dob).trim().length === 0)) {
        throw new SubmissionError({ dob: 'DOB must be required!' });
    } else if (!/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.test((values.dob).trim())) {
        throw new SubmissionError({ dob: 'Enter Date in DD/mm/yyyy format!' });
    }
    if (!values.skills || (values.skills && values.skills.length === 0)) {
        throw new SubmissionError({ skills: 'Skills must be required!' });
    }
    if (!values.contact || (values.contact).trim().length === 0) {
        throw new SubmissionError({ contact: 'Contact Number must be required!' });
    } else if (!/^(0|[1-9][0-9]{9})$/i.test((values.contact).trim())) {
        throw new SubmissionError({ contact: 'Contact Number must have 10 digits!' });
    }
    if (!values.about || (values.about).trim().length < 100) {
        throw new SubmissionError({ about: 'Mimumum 100 characters required!' });
    }
    if (!values.terms) {
        throw new SubmissionError({ terms: 'Kindly Accept the Terms & Conditions!' });
    }
};

let FormSubmit = (props) => {
    const { pristine, reset, submitting, handleSubmit } = props;
    return (
        <div className='form-layout'>
            <div className='header'>From Submit Validation</div>
            <form onSubmit={handleSubmit(submit)}>
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
    form: 'form-sbumit'
})(FormSubmit);