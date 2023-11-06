import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

function Create({ isLoggedIn }) {
    const navigate = useNavigate();
    if (!isLoggedIn) {
        return (
            <div>
                <h1>Please Login </h1>
                <button onClick={() => navigate('/login')}>Login</button>
            </div>
        )
    }
    const [formData, setFormData] = useState({
        itemName: '',
        availability: false,
        price: 0,
        location: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const token = Cookies.get('jwtToken');
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            axios.post('http://localhost:8000/resource/create', formData)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.error('Error submitting form:', error);
                });
            navigate('/');
        } catch (error) {
            console.error('Error while Submitting:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name='itemName'
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div>
                    <label >Availiability</label>
                    <input
                        type="checkbox"
                        name='availability'
                        value={formData.availability}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        name='location'
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name='price'
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Create;
