import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { Calendar, Clock } from "lucide-react";
import { DateCalendar, LocalizationProvider, MobileTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Checkbox, TextField } from "@mui/material";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateTodo() {
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user);
    const [eventName, setEventName] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState(null);
    const [endTime, setEndTime] = useState('');
    const [allDay, setAllDay] = useState(false);
    const [disabledTime, setDisabledTime] = useState(false);
    const [formData, setFormData] = useState({
        eventName:'',
        description:'',
        address:'',
        startDate:'',
        startTime:'',
        endDate:'',
        endTime:'',
        allDay:false,
        imageUrls:[],
    });
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("setChecked:", allDay);
    }, [allDay]);
    useEffect(() => {
        console.log("endTime:", endTime);
    }, [endTime]);
    useEffect(() => {
        console.log("startTime:", startTime);
    }, [startTime]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            setLoading(true);
            setError(false);
            const res = await fetch('/api/events/create',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    eventName:eventName,
                    description:description,
                    address:address,
                    startDate:startDate,
                    startTime:startTime,
                    endDate:endDate,
                    endTime:endTime,
                    allDay:allDay,
                    imageUrls:[],
                    userRef: currentUser._id,
                }),
            });

            const data = await res.json();
            setLoading(false);
            if(data.success === false){
                setError(data.message)
            }
            alert('Event Created Successfully! You will now be redirected to the home page.');
            navigate('/');

        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    return (
        <main>
            <div className='py-4 px-4 max-w-6xl mx-auto'>
                <h1 className='text-3xl font-semibold text-center my-7'>Create New Todo</h1>

                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <div className='flex flex-col md:flex-row gap-6 pb-10'>
                        <div className='flex flex-col gap-4 flex-1'>
                            <div className='flex flex-col gap-4'>
                                <input type='text' id='eventName' placeholder='Title' onChange={(e) => setEventName(e.target.value)} value={eventName} className='border p-3 rounded-lg' minLength={3} required />
                                
                                <textarea type='text' id='description' onChange={(e) => setDescription(e.target.value)} value={description} placeholder='Description' className='border p-3 rounded-lg' />

                                <input type='address' id='address' placeholder='Address' onChange={(e) => setAddress(e.target.value)} value={address} className='border p-3 rounded-lg' minLength={3} required />

                                {/* start date & time*/}
                                <div className='flex flex-row justify-between gap-4'>
                                    {/* start date */}
                                    <div className='flex flex-row items-center gap-2'>
                                        <div className='flex flex-col justify-center gap-4'>
                                            <label>Start Date:</label>
                                        </div>
                                        <div className="relative">
                                            <DatePicker type='date' dateFormat="d MMMM, yyyy" selected={startDate} className="border border-black text-black rounded-md shadow-md w-50 p-2 pl-10" id="startDate" onChange={(e) => {
                                                const formattedStartDate = dayjs(e).format("D MMMM, YYYY");
                                                setStartDate(formattedStartDate)
                                            }}  />
                                            <Calendar className="absolute left-3 top-3 text-black" size={21} />
                                        </div>
                                    </div>
                                    
                                    {/* end date */}
                                    <div className='flex flex-row items-center gap-4'>
                                        <div className='flex flex-col justify-center'>
                                            <label>End Date:</label>
                                        </div>
                                        <div className="relative">
                                            <DatePicker id="endDate" type='date' selected={endDate} minDate={startDate} className="border border-black text-black rounded-md shadow-md w-50 p-2 pl-10" dateFormat="dd MMMM, yyyy"  onChange={(e) => {
                                                const formattedEndDate = dayjs(e).format("D MMMM, YYYY");
                                                setEndDate(formattedEndDate)
                                            }} />
                                            <Calendar className="absolute left-3 top-3 text-black" size={21} />
                                        </div>
                                    </div>
                                </div>
                                    
                                {/* end date & time*/}
                                <div className='flex justify-between flex-row gap-4'>
                                    {/* start time */}
                                    <div className='flex flex-col justify-center gap-4'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <div className="flex flex-row items-center gap-2">
                                                <label>Start Time:</label>
                                                <div className="relative border border-black">
                                                    <MobileTimePicker id="startTime" disabled={disabledTime} ampm={true} value={startTime ? dayjs(startTime, "h:mm A") : null}  className="text-black rounded-md shadow-md w-50 p-2 pl-10"
                                                        onChange={(e) => setStartTime(dayjs(e).format("h:mm A"))}
                                                        TextField={(params) => (
                                                            <TextField {...params} /> 
                                                        )}
                                                    />
                                                    <Clock className="absolute right-4 top-4 text-black" size={21} />
                                                </div>
                                            </div>
                                        </LocalizationProvider>
                                    </div>

                                    {/* All Day Event checkbox */}
                                    <div className='flex flex-row gap-5 items-center'>
                                        <div className='flex gap-2'>
                                            <input type="checkbox" name="allDayCheckbox" id="allDayCheckbox" checked={allDay} onChange={(e) => {
                                                console.log('e:', e.target.checked);
                                                setAllDay(e.target.checked);
                                                if(e.target.checked == true) {
                                                    setStartTime('12:00 AM');
                                                    setEndTime('11:59 PM');
                                                    setDisabledTime(true);
                                                } else {
                                                    setStartTime("");
                                                    setEndTime("");
                                                    setDisabledTime(false);
                                                }
                                            }} />
                                        </div>
                                        <label>All Day Event</label>
                                    </div>
                                    
                                    {/* end time */}
                                    <div className='flex flex-col justify-center gap-4'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <div className="flex flex-row items-center gap-2">
                                                <label>End Time:</label>
                                                <div className="relative border border-black">
                                                    <MobileTimePicker id="endTime" disabled={disabledTime} value={endTime ? dayjs(endTime, "h:mm A") : null} ampm={true} className="text-black rounded-md shadow-md w-50 p-2 pl-10"
                                                        TextField={(params) => (
                                                            <TextField {...params} /> 
                                                        )} onChange={(e) => setEndTime(dayjs(e).format("h:mm A"))}
                                                    />
                                                    <Clock className="absolute right-4 top-4 text-black" size={21} />
                                                </div>
                                            </div>
                                        </LocalizationProvider>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        { error && <p className='text-red-700 text-sm'>{error}</p> }
                    </div>
                    
                    <div className='flex flex-col md:flex-row justify-center pb-2 pt-2 w-full'>
                        {/* uploading stands for image uploading */}
                        <button disabled={loading} className='p-3 bg-[rgb(7,57,106)] text-white rounded-lg uppercase w-full hover:opacity-95 disabled:opacity-80'>
                            {loading ? 'Creating Event...':'Create Event'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
