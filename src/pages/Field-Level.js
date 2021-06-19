import { Field, reduxForm } from 'redux-form';
import DropdownList from 'react-widgets/DropdownList';
import Multiselect from 'react-widgets/Multiselect';

const required = (value) => (value || typeof value === 'number' ? undefined : 'Required');
const maxLength = max => value => { return (value && value.length > max ? `Maximum characters count ${max} exceeded` : undefined); }
const minLength = min => value => (value && value.length < min ? `Minimum ${min} characters required` : undefined);
const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;
const alphaNumeric = value => value && /[^a-zA-Z0-9 ]/i.test(value) ? 'Only alphanumeric characters' : undefined
const phoneNumber = value => value && !/^(0|[1-9][0-9]{9})$/i.test(value) ? 'Invalid phone number, must be 10 digits' : undefined
const validDate = value => value && !/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.test(value) ? 'Enter date in DD/mm/yyyy format' : undefined;
const isChecked = value => value ? undefined : 'Kindly Accept the Terms & Conditions';

const maxLengthCount = maxLength(15);
const minLengthCount = minLength(4);
const minTextCount = minLength(10);


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

const listData = [
    { 'value': 'Under Graduate' }, { 'value': 'Post Graduate' }
]

const skillsData = ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Angular', 'React'];

let FieldLevel = (props) => {
    const { pristine, reset, submitting, handleSubmit } = props;
    return (
        <div className='form-layout'>
            <div className='header'>Field Level From Validation</div>
            <form onSubmit={handleSubmit}>
                <Field type='input' component={renderInput} name='firstname' label='First Name'
                    validate={[required, maxLengthCount, minLengthCount]}
                    warn={alphaNumeric}
                ></Field>
                <Field type='input' component={renderInput} name='lastname' label='Last Name'
                    validate={[required, maxLengthCount, minLengthCount]}
                    warn={alphaNumeric}
                ></Field>
                <Field type='input' component={renderInput} name='email' label='E-mail'
                    validate={[required, email]}
                ></Field>
                <Field component={renderDropDown} name='qualification' label='Qualification' valuefield='value' textfield='value' data={listData}
                    validate={[required]}
                ></Field>
                <Field component={renderDropDown} name='gender' label='Gender' valuefield='value' textfield='value' data={[{ value: 'Male' }, { value: 'Female' }]}
                    validate={[required]}
                ></Field>
                <Field type='input' component={renderInput} name='dob' label='DOB' title='dd/mm/yyyy'
                    validate={[required, validDate]}
                ></Field>
                <Field component={renderMultiSelect} name='skills' label='Skills' textfield='value' data={skillsData}
                    validate={[required]}
                ></Field>
                <Field type='input' component={renderInput} name='contact' label='Contact Number'
                    validate={[required, phoneNumber]}
                ></Field>
                <Field type='input' component={renderTextArea} name='about' label='About Me'
                    validate={[required, minTextCount]}
                ></Field>
                <div className='footer'>
                    <label className='col-sm-4'></label>
                    <Field component={renderCheckbox} type='checkbox' name='terms' labelClass='license-text' label='Accept the Terms and Conditions'
                        validate={[isChecked]}
                    ></Field>
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
    form: 'field-level'
})(FieldLevel);