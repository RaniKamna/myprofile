import React, { useState, useEffect } from 'react';
import { MdEdit, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';

export const Mybioscreen = () => {
    const [bioData, setBioData] = useState({
        aboutme: '',
        bloodgroup: '',
        resume: null,
    });

    useEffect(() => {
         const data = localStorage.getItem('formData');
         console.log(JSON.parse(data));
         setBioData(JSON.parse(data));
    }, []);

    return (
        <div className='bioscreencontainer'>
            <div className='container'>
                <h4> <MdKeyboardArrowLeft style={{ fontSize: "40px" }} /> <span>My Bio</span></h4>
                <div className='aboutmecontainer'>
                    <div className='d-flex justify-content-between'>
                        <h5>About me</h5>
                        <Link to='/edit'> <MdEdit /> </Link>
                    </div>
                    {bioData.about !== '' ? <p>{bioData.aboutme}</p> : <p>No about me added yet</p>}
                </div>
                <hr />
                <div className='bloodgroupcontainer d-flex justify-content-between'>
                    <h5>Blood group</h5>
                    <span>{bioData.bloodgroup}</span>
                </div>
                <div className='resumeconntainer card'>
                    <button className='d-flex justify-content-between'>Resume   <MdKeyboardArrowRight style={{ fontSize: "30px" }} /></button>
                </div>
                <hr />
            </div>
        </div>
    )
}
