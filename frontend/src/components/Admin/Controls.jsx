import React from 'react'
import Sidebar from './Sidebar';

const Controls = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const today = new Date();
    const date = today.getDate();
    const month = monthNames[today.getMonth()]
    // const label = { inputProps: { 'aria-label': 'Switch demo' } };
    return (
        <div>
            <Sidebar/>
            <div>
                <h3>{month} {date}</h3>
            </div>
            <div>
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <label class="form-check-label" for="flexSwitchCheckDefault">Rainy</label>
                </div>
                
                <input type="text" />
            </div>
        </div>
    )
}

export default Controls