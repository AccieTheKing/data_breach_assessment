import React from 'react';
import Navbar from '../Navbar/Nav';
import './style.css';

const historyData = [
   { assessmentNumber: '', date: '', result: 1, assessor: 'Chris' },
   { assessmentNumber: '', date: '', result: 2, assessor: '' },
   { assessmentNumber: '', date: '', result: 3, assessor: '' },
];


const Trainpage = () => {
    const huhuh = document.getElementById("lul")
    console.log(huhuh)

    huhuh?.addEventListener("click", () => console.log("hallo"))
    return <div>
        <Navbar></Navbar>
        <div>hallo
            <button id="ll">dd</button>
        <div id="lul">dasdas</div>
        </div>
        </div>
};

export default Trainpage