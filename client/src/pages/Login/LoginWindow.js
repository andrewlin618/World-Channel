import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useAuth } from '../../utils/use-auth';
import './login.css'

const avatars = ["boy_1", "boy_2", "boy_3", "girl_1", "girl_2", "girl_3"];

const LoginWindow = () => {
    const auth = useAuth();
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [errors, setErrors] = useState({});

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    }

    function handleSubmit() {
        if (name === '') {
            setErrors({ name: '· Please Enter your nick name', avatar: errors.avatar })
        }
        if (avatar === '') {
            setErrors({ name: errors.avatar, avatar: '· Please choose your avatar' })
        }
        if (name && avatar) {
            auth.login(name, avatar);
            history.push('/room');
        }
    }

    function handleOnClick(e) {
        setAvatar(e.target.alt);
        setErrors({ name: errors.name, avatar: '' })
    }

    function handleChange(e) {
        let input = e.target.value.toUpperCase();
        if (input !== '') {
            setErrors({ name: '', avatar: errors.avatar })
        }
        setName(input.length > 15 ? input.slice(0, 15) : input);
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    });

    return (
        <div className="myLoginWindow">
            <label htmlFor="username" className='myLabel'>Enter your nick name:</label>
            <br />
            <input id="name" name='username' className='myInput' type='text' onChange={handleChange} value={name} autoComplete="off" />
            <br /><br /><br /><br />

            <label htmlFor="avatar" className='myLabel'>Choose your avatar:</label>
            <br />
            <div className="myAvatars" >
                {avatars.map((avatarName, index) => (
                    <a href={`#${avatarName}`} key={index}>
                        <img src={require(`../../data/avatars/${avatarName}.png`)} alt={avatarName} className="myAvatar" id={avatarName} value={avatarName} onClick={handleOnClick} />
                    </a>
                ))}
            </div>
            <div style={{ textAlign: "center" }}>
                <br /><br /><br />
                {errors.name &&
                    <span style={{ color: "red" }}>{errors.name}</span>
                }
                {errors.avatar &&
                    <span style={{ color: "red" }}>{errors.avatar}</span>
                }
                <br /><br /><br />
                {name && avatar && <p className="myArrow" onClick={handleSubmit}>Press Enter</p>}
            </div>
        </div>
    );
}

export default LoginWindow;