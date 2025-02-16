import React, { useState, useEffect } from 'react';
import './Form.css';
import { API_URL } from '../../utils/constants';
import { toast } from 'react-toastify';
import { fetchUserData } from '../../Redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Form = ({ setUploadSuccess ,data}) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((store) => store.userInfo);
  const user = userInfo?.user || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    age: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
      age: user?.age ? String(user.age) : '',
      gender: user?.gender || '',
    });
  }, [user]);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!formData.age.trim()) newErrors.age = 'Age is required';
    if (!formData.gender.trim()) newErrors.gender = 'Select your gender';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (validate()) {
      try {
        const response = await fetch(`${API_URL}/updateProfile`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        if (response.ok) {
          setUploadSuccess(true);
          dispatch(fetchUserData());
          toast.success('Profile updated successfully!');
        } else {
          toast.error(data.message || 'Failed to update profile');
        }
      } catch (error) {
        toast.error('Something went wrong! Please try again.');
      }
    }
  };

  return (
    <div className='formContainer'>
      <form onSubmit={handleSubmit}>
        <label className='form-label'>Name</label>
        <input type='text' className='form-control' value={formData.name} name='name' placeholder='Full Name' onChange={handleChange} />
        {submitted && errors.name && <div className='error'>{errors.name}</div>}

        <label className='form-label mt-2'>Email</label>
        <input type='email' className='form-control' name='email' placeholder='name@example.com' onChange={handleChange} value={formData.email} />
        {submitted && errors.email && <div className='error'>{errors.email}</div>}

        <label className='form-label mt-2'>Mobile number</label>
        <input type='text' className='form-control' name='mobile' placeholder='Mobile Number' onChange={handleChange} value={formData.mobile} />
        {submitted && errors.mobile && <div className='error'>{errors.mobile}</div>}

        <label className='form-label mt-2'>Age</label>
        <input type='number' className='form-control' name='age' placeholder='Your Age' onChange={handleChange} value={formData.age} />
        {submitted && errors.age && <div className='error'>{errors.age}</div>}

        <label className='form-label mt-2'>Gender</label>
        <select className='form-select' name='gender' onChange={handleChange} value={formData.gender}>
          <option value=''>Select Gender</option>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
        {submitted && errors.gender && <div className='error'>{errors.gender}</div>}

        <button type='submit' className='btn btn-primary mt-3 w-100'>Submit</button>
      </form>
    </div>
  );
};

export default Form;
