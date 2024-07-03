import React, { useState ,useCallback} from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';
import '../Auth/Register.scss';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBIcon,MDBSpinner } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,11}$/;
    //const allowedEmailDomains = [];
    // Caching responses
    const responseCache = {};
    const validateForm = () => {
        const newErrors = {};
        if (!username) newErrors.username = 'Hãy nhập username';
        if (!password) {
            newErrors.password = 'Hãy nhập mật khẩu';
        } else if (password.length < 8) {
            newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = 'Mật khẩu phải chứa ít nhất một chữ hoa';
        } else if (!/[a-z]/.test(password)) {
            newErrors.password = 'Mật khẩu phải chứa ít nhất một chữ thường';
        } else if (!/[0-9]/.test(password)) {
            newErrors.password = 'Mật khẩu phải chứa ít nhất một chữ số';
        } else if (!/[!@#$%^&*]/.test(password)) {
            newErrors.password = 'Mật khẩu phải chứa ít nhất một ký tự đặc biệt';
        }
        if (!email) {
            newErrors.email = 'Hãy nhập Email';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Email không hợp lệ';
        } 
        // else if (!allowedEmailDomains.includes(email.split('@')[1])) {
        //     newErrors.email = 'Chỉ cho phép các miền email cụ thể';
        // }
        if (!firstname) newErrors.firstname = 'Hãy nhập tên';
        if (!lastname) newErrors.lastname = 'Hãy nhập họ';
        if (!phonenumber) {
            newErrors.phonenumber = 'Hãy nhập số điện thoại';
        } else if (!phoneRegex.test(phonenumber)) {
            newErrors.phonenumber = 'Số điện thoại không hợp lệ';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});  
        setApiError('');  

        if (!validateForm()) {
            toast.error('Please fill in all required fields.');
            return;
        }
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('Username', username);
        formData.append('Password', password);
        formData.append('Email', email);
        formData.append('Firstname', firstname);
        formData.append('Lastname', lastname);
        formData.append('Phonenumber', phonenumber);

        const cacheKey = JSON.stringify({ username, email, firstname, lastname, phonenumber });
        if (responseCache[cacheKey]) {
            toast.success('Registration successful!');
            navigate('/Login'); // Redirect to login page
            setIsSubmitting(false);
            return;
        }   
        try {
            const response = await axios.post('https://localhost:7061/api/Users/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            toast.success('Registration successful!');
            responseCache[cacheKey] = response.data;  
            navigate('/login');  
        }catch (error) {
            if (error.response && error.response.status === 400) {
                const responseErrors = error.response.data.errors;
                if (responseErrors) {
                    const formattedErrors = Object.keys(responseErrors).reduce((acc, key) => {
                        acc[key.toLowerCase()] = responseErrors[key][0];
                        return acc;
                    }, {});
                    setErrors(formattedErrors);
                    Object.values(formattedErrors).forEach(err => toast.error(err));
                } else {
                    const message = error.response.data.message || 'Something went wrong. Please try again.';
                    setApiError(message);
                    toast.error(message);
                }
            } else if (error.response && error.response.status === 401) {
                const message = 'Unauthorized access. Please check your credentials.';
                setApiError(message);
                toast.error(message);
            } else if (error.request) {
                console.error('Network error', error.request);
                const message = 'Network error. Please check your connection and try again.';
                setApiError(message);
                toast.error(message);
            } else {
                console.error('Error', error.message);
                const message = 'An error occurred. Please try again.';
                setApiError(message);
                toast.error(message);
            }
        } finally {
            setIsSubmitting(false);
        }
    };
// Debounce the input handlers to reduce the number of state updates
const debouncedSetUsername = useCallback(debounce((value) => setUsername(value), 300), []);
const debouncedSetPassword = useCallback(debounce((value) => setPassword(value), 300), []);
const debouncedSetEmail = useCallback(debounce((value) => setEmail(value), 300), []);
const debouncedSetFirstname = useCallback(debounce((value) => setFirstname(value), 300), []);
const debouncedSetLastname = useCallback(debounce((value) => setLastname(value), 300), []);
const debouncedSetPhonenumber = useCallback(debounce((value) => setPhonenumber(value), 300), []);
return (
    <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
                <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }}>
                    <MDBCardBody className='p-5 w-100 d-flex flex-column'>
                        <h2 className="fw-bold mb-2 text-center">Đăng ký</h2>
                        <p className="text-white-50 mb-3">Please enter your details to register!</p>

                        <MDBInput
                            wrapperClass='mb-4 w-100'
                            label='Username'
                            type='text'
                            size="lg"
                            onChange={(event) => debouncedSetUsername(event.target.value)}
                        />
                        {errors.username && <span className="error">{errors.username}</span>}

                        <MDBInput
                            wrapperClass='mb-4 w-100'
                            label='Password'
                            type='password'
                            size="lg"
                            onChange={(event) => debouncedSetPassword(event.target.value)}
                        />
                        {errors.password && <span className="error">{errors.password}</span>}

                        <MDBInput
                            wrapperClass='mb-4 w-100'
                            label='Email'
                            type='email'
                            size="lg"
                            onChange={(event) => debouncedSetEmail(event.target.value)}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}

                        <MDBInput
                            wrapperClass='mb-4 w-100'
                            label='First Name'
                            type='text'
                            size="lg"
                            onChange={(event) => debouncedSetFirstname(event.target.value)}
                        />
                        {errors.firstname && <span className="error">{errors.firstname}</span>}

                        <MDBInput
                            wrapperClass='mb-4 w-100'
                            label='Last Name'
                            type='text'
                            size="lg"
                            onChange={(event) => debouncedSetLastname(event.target.value)}
                        />
                        {errors.lastname && <span className="error">{errors.lastname}</span>}

                        <MDBInput
                            wrapperClass='mb-4 w-100'
                            label='Phone Number'
                            type='text'
                            size="lg"
                            onChange={(event) => debouncedSetPhonenumber(event.target.value)}
                        />
                        {errors.phonenumber && <span className="error">{errors.phonenumber}</span>}

                        <MDBBtn size='lg' onClick={handleSubmit} disabled={isSubmitting}>
                            {isSubmitting ? <MDBSpinner size="sm" /> : 'Register'}
                        </MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
);
};

export default Register;
