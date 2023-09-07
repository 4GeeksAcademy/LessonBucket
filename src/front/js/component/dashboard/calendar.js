import React, { useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './calendar.css'

export const Calendar = () => {
    const [selected, setSelected] = useState(new Date())

    let footer = <p style={{color:'white'}}>Please pick a day.</p>;
    if (selected) {
        footer = <p className='text-white'>You picked {format(selected, 'PP')}.</p>;
    }

    const handleDateChange = (date) => {
        setSelected(date);
    };


    const css = `
    .my-selected:not([disabled]) { 
        font-weight: bold; 
        border: 2px solid white;
    }
    .my-today { 
        font-weight: bold;
        font-size: 110%; 
        color: "white" !important;
    }
    `;

    return (
        <div>
            <style>{css}</style>
            <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
                footer={footer}
                onDayClick={handleDateChange}
                showOutsideDays
                // styles={customStyles}
                modifiersClassNames={{
                    selected: 'my-selected',
                    today: 'my-today'
                }}

            />
        </div>
    )
}