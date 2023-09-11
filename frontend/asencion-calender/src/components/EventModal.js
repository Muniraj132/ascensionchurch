import axios from "axios";
//import dayjs from "dayjs";
import React, { useContext, useState, useEffect, useRef } from "react"
import GlobalContext from "../context/GlobalContext"
//import swal from 'sweetalert';
//import Siderbar from "./Siderbar";
import SimpleReactValidator from "simple-react-validator";


//const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];
export default function EventModal() {

    const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent, newSelectedEvent } = useContext(GlobalContext);
    const simpleValidator = useRef(new SimpleReactValidator());

    const [name, setName] = useState(selectedEvent ? selectedEvent.name : "");
    const [intentionfor, setIntentionfor] = useState(selectedEvent ? selectedEvent.intentionfor : "");
    const [email, setEmail] = useState(selectedEvent ? selectedEvent.email : "");
    const [number, setNumber] = useState(selectedEvent ? selectedEvent.number : "");
    const [intention, setIntention] = useState(selectedEvent ? selectedEvent.intention : "");
    const [massTiming, setMassTiming] = useState(selectedEvent ? selectedEvent.massTiming : newSelectedEvent.liturgy_on);
    const [language, setLanguage] = useState(selectedEvent ? selectedEvent.language : newSelectedEvent.language_id);
    const [massId, setMassId] = useState(selectedEvent ? selectedEvent.mass_id : newSelectedEvent.id);
    const [category, setCategory] = useState([]);
    const [, forceUpdate] = useState();


    var spit = massTiming.split(" ");

    useEffect(() => {
        axios.get('prayer/category')
            .then(res => setCategory(res && res.data.data)
            )
    }, []);

    function hadleSubmit(e) {
        e.preventDefault();
        if (!(simpleValidator.current.allValid())) {
            simpleValidator.current.showMessages();
            forceUpdate(1);
        } else {
            const masslist = {
                "name": name,
                "DateTime": massTiming,
                "intention": intention,
                "intentionfor": intentionfor,
                "email": email,
                "mobile": number,
                "mass_id": massId,
                "language": language[1],
                "amount": 200,
                "payment_status": "YES",
                "payment_reference": "XXXXX"
            };
            console.log(masslist);

            // axios.post('/massbook/create-mass-booking', masslist)
            //     .then(res => {
            //         if (res.data.status == 200) {
            //             swal({
            //                 title: "Your record is Saved Successfully!",
            //                 text: "St.Antony's Firary Church, Madiwala",
            //                 icon: "success",
            //                 confirmButtonColor: 'rgb(24, 57, 60)',
            //                 button: "OK",
            //             });
            //         }
            //     })
            //     .catch(res => {
            //         swal({
            //             res: "res",
            //             title: "Try again! Somthing went worng!",
            //             text: "St.Antony's Firary Church, Madiwala",
            //             icon: "error",
            //             buttonColor: "#DD6B55",
            //             button: "OK",
            //         })
            //     });

            console.log(selectedEvent);
            const calendarEvent = {
                name,
                intentionfor,
                email,
                number,
                day: daySelected.valueOf(),
                massTiming,
                intention,
                language: language,
                id: selectedEvent ? selectedEvent.id : Date.now(),
                mass_id: massId,
                //prayerCategory:selectedPrayerCategory
            };

            if (selectedEvent) {
                dispatchCalEvent({ type: "update", payload: calendarEvent });
            } else {
                dispatchCalEvent({ type: "push", payload: calendarEvent });
            }
            setShowEventModal(false);
        }
    }
    return (
        <>
            {setShowEventModal ? (
                <>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-4 border-b border-solid border-gray-300 rounded-t ">
                                    <h2 className="text-medium text-white text-center font=bold">ADD MASS INTENTION</h2>
                                    <div>
                                        {selectedEvent && (
                                            <span
                                                onClick={() => {
                                                    dispatchCalEvent({ type: "delete", payload: selectedEvent });
                                                    setShowEventModal(false);
                                                }}
                                                className="material-icons-outlined text-red-500 delete"
                                                title="Delete">
                                                delete
                                            </span>
                                        )}
                                        <button onClick={() => setShowEventModal(false)}>
                                            <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full"
                                                title="Close">
                                                X
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    {/* <span className="material-icons-outlined">
                                    schedule
                                    </span> */}
                                    {<p style={{ color: "green" }}>{language['1']}: {daySelected.format("ddd, DD MMM ")} {spit[1]}  {spit[2]}</p>}
                                    <input
                                        type="text"
                                        name="massTiming"
                                        placeholder="Intention"
                                        // value={dayjs(massTiming).format(" hh:mm A") }
                                        className="text-md block px-3 py-2 rounded-lg w-full
                                         bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                                        value={massTiming}
                                        required
                                        style={{ borderColor: "#cccccc", display: "none" }}
                                        onChange={(e) => setMassTiming(e.target.value)}
                                        disabled="disabled"
                                    ></input>
                                    <input
                                        type="text"
                                        name="language"
                                        placeholder="language"
                                        value={language[1]}
                                        required
                                        style={{ borderColor: "#cccccc", display: "none" }}
                                        onChange={(e) => setLanguage(e.target.value)}
                                        disabled="disabled"
                                    ></input>
                                    <input
                                        type="text"
                                        name="massId"
                                        placeholder="massId"
                                        value={massId}
                                        required
                                        style={{ borderColor: "#cccccc", display: "none" }}
                                        onChange={(e) => setMassId(e.target.value)}
                                        disabled="disabled"
                                    ></input>
                                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full" >
                                        <div class="flex -mx-3">
                                            <div class="w-1/2 px-3 mb-5">
                                                <label for="icon-users" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name<span style={{ color: "red" }}>*</span></label>
                                                <div class="relative">
                                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" > <path class="path1" d="M12 12.041v-0.825c1.102-0.621 2-2.168 2-3.716 0-2.485 0-4.5-3-4.5s-3 2.015-3 4.5c0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h14c0-2.015-2.608-3.682-6-3.959z"></path>
                                                            <path class="path2" d="M5.112 12.427c0.864-0.565 1.939-0.994 3.122-1.256-0.235-0.278-0.449-0.588-0.633-0.922-0.475-0.863-0.726-1.813-0.726-2.748 0-1.344 0-2.614 0.478-3.653 0.464-1.008 1.299-1.633 2.488-1.867-0.264-1.195-0.968-1.98-2.841-1.98-3 0-3 2.015-3 4.5 0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h4.359c0.227-0.202 0.478-0.393 0.753-0.573z"></path></svg>
                                                    </div>
                                                    <input type="text" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your Name"
                                                        value={name}
                                                        required
                                                        onChange={(e) => setName(e.target.value)} />
                                                </div>
                                                <span style={{ color: "red" }}>
                                                    {simpleValidator.current.message('name', name, 'required')}
                                                </span>
                                            </div>
                                            <div class="w-1/2 px-3 mb-5">
                                                <label for="icon-users" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Offered For<span style={{ color: "red" }}>*</span></label>
                                                <div class="relative">
                                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" > <path class="path1" d="M12 12.041v-0.825c1.102-0.621 2-2.168 2-3.716 0-2.485 0-4.5-3-4.5s-3 2.015-3 4.5c0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h14c0-2.015-2.608-3.682-6-3.959z"></path>
                                                            <path class="path2" d="M5.112 12.427c0.864-0.565 1.939-0.994 3.122-1.256-0.235-0.278-0.449-0.588-0.633-0.922-0.475-0.863-0.726-1.813-0.726-2.748 0-1.344 0-2.614 0.478-3.653 0.464-1.008 1.299-1.633 2.488-1.867-0.264-1.195-0.968-1.98-2.841-1.98-3 0-3 2.015-3 4.5 0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h4.359c0.227-0.202 0.478-0.393 0.753-0.573z"></path></svg>
                                                    </div>
                                                    <input type="text" name="intentionfor" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Offered for (Ex:Name)"
                                                        value={intentionfor}
                                                        required
                                                        onChange={(e) => setIntentionfor(e.target.value)} />
                                                </div>
                                                <span style={{ color: "red" }}>
                                                    {simpleValidator.current.message('intentionfor', intentionfor, 'required')}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="mb-5">
                                            <label for="email-address-icon" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Intention<span style={{ color: "red" }}>*</span></label>
                                            <div class="relative">
                                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M 4 4 h 16 a 2 2 0 0 1 2 2 v 14" /></svg>
                                                </div>
                                                <select onChange={(e) => setIntention(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >
                                                    <option >Select Intention</option>
                                                    {category.map((option) => (
                                                        <option key={option.id} value={option.name} selected={intention === option.name}>
                                                            {option.name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span style={{ color: "red" }}>
                                                    {simpleValidator.current.message('intention', intention, 'required')}
                                                </span>
                                            </div>
                                        </div>
                                        <div class="flex -mx-3">
                                            <div class="w-1/2 px-3 mb-5">
                                                <label for="email-address-icon" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Email<span style={{ color: "red" }}>*</span></label>
                                                <div class="relative">
                                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                                    </div>
                                                    <input type="text" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email@gmail.com"
                                                        value={email}
                                                        required
                                                        onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                                <span style={{ color: "red" }}>
                                                    {simpleValidator.current.message('email', email, 'required')}
                                                </span>
                                            </div>
                                            <div class="w-1/2 px-3 mb-5">
                                                <label for="email-address-icon" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone Number<span style={{ color: "red" }}>*</span></label>
                                                <div class="relative">
                                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"> <path class="path1" d="M11.5 0h-7c-0.825 0-1.5 0.675-1.5 1.5v13c0 0.825 0.675 1.5 1.5 1.5h7c0.825 0 1.5-0.675 1.5-1.5v-13c0-0.825-0.675-1.5-1.5-1.5zM6 0.75h4v0.5h-4v-0.5zM8 15c-0.552 0-1-0.448-1-1s0.448-1 1-1 1 0.448 1 1-0.448 1-1 1zM12 12h-8v-10h8v10z"></path></svg>
                                                    </div>
                                                    <input type="text" name="intentionfor" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        placeholder="Phone Number"
                                                        maxLength={10}
                                                        onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;"
                                                        value={number}
                                                        required
                                                        onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))} />
                                                </div>
                                                <span style={{ color: "red" }}>
                                                    {simpleValidator.current.message('number', number, 'required')}
                                                </span>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                                <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                                    <button data-modal-toggle="defaultModal"
                                        type="button"
                                        class="text-white bg-green-300 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-600 dark:focus:ring-green-600" onClick={hadleSubmit}>Submit</button>
                                    <button data-modal-toggle="defaultModal"
                                        type="button"
                                        class="text-white bg-red-300 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={() => setShowEventModal(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );


}