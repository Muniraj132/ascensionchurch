import React from 'react'

const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) =>{},
    daySelected: null,
    showEventModal: false,
    setShowEventModal: () => {},
    dispatchCalEvent : ({type,payload})=> {},
    savedEvents :[],
    setSelectedEvent : null,
    selectedEvent : ()=>{},
    setLabels: ()=>{},
    labels: [],
    updateLabel : ()=>{},
    filteredEvents : [],
    setAdvice:[],
    advice: ()=>{},
    setNewSelectedEvent: null,
    newSelectedEvent:()=>{}
    
})

export default GlobalContext;