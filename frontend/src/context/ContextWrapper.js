import React, { useReducer, useState, useEffect, useMemo } from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs'
import axios from 'axios'
function savedEventsReducer(state, { type, payload }) {
    switch (type) {
        case 'push':
            return [...state, payload];
        case 'update':
            return state.map(evt => evt.id === payload.id ? payload : evt)
        case 'delete':
            return state.filter(evt => evt.id !== payload.id)
        default:
            throw new Error();
    }
}

function initEvents() {
    const storageEvents = localStorage.getItem('savedEvents')
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : []
    return parsedEvents;
}

export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [showEventModal, setShowEventModal] = useState(false);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [newSelectedEvent, setNewSelectedEvent] = useState(null);

    const [labels, setLabels] = useState([]);

    const filteredEvents = useMemo(() => {
        return savedEvents.filter(evt =>
            labels
                .filter((lbl) => lbl.checked)
                .map((lbl) => lbl.label)
                .includes(evt.label)
        );
    }, [savedEvents, labels]);

    const [advice, setAdvice] = useState([]);
    useEffect(() => {
        axios.get("liturgical/17489/upcoming")
            .then(res => setAdvice(res && res.data.data))
            .catch(error => {
            })
    }, []);
    //console.log(advice);
    useEffect(() => {
        localStorage.setItem('savedEvents', JSON.stringify(savedEvents))
    }, [savedEvents]);

    useEffect(() => {
        setLabels((prevLabels) => {
            return [...new Set(savedEvents.map(evt => evt.label))].map(label => {
                const currentLabel = prevLabels.find(lbl => lbl.label === label)
                return {
                    label,
                    checked: currentLabel ? currentLabel.checked : true
                }
            })
        })
    }, [savedEvents]);

    useEffect(() => {
        if (!showEventModal) {
            setSelectedEvent(null);
        }
    }, [showEventModal]);

    useEffect(() => {
        setNewSelectedEvent(showEventModal);
    }, [showEventModal]);

    function updateLabel(label) {
        setLabels(labels.map((lbl) => lbl.label === label.label ? label : lbl))
    }
    return (
        <GlobalContext.Provider value={{
            monthIndex,
            setMonthIndex,
            showEventModal,
            setShowEventModal,
            daySelected,
            setDaySelected,
            dispatchCalEvent,
            savedEvents,
            setSelectedEvent,
            selectedEvent,
            setLabels,
            labels,
            updateLabel,
            filteredEvents,
            advice,
            setAdvice,
            setNewSelectedEvent,
            newSelectedEvent
        }}>
            {props.children}
        </GlobalContext.Provider>
    )
}