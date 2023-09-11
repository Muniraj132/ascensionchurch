import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";
import "../App.css";

export default function Day({ day, rowIdx, evt, time, timeString }) {
  const [dayEvents, setDayEvents] = useState([]);
  const [show, setShow] = useState(false);
  const sDate = new Date(day);
  let syr = sDate.getFullYear();
  let smnt = ("0" + (sDate.getMonth() + 1)).slice(-2);
  let sdd = ("0" + sDate.getDate()).slice(-2);
  let mnp = syr + "-" + smnt + "-" + sdd;
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setNewSelectedEvent,
    advice,
  } = useContext(GlobalContext);

  const [massTime, setMassTime] = useState([]);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD/MM/YY") === day.format("hh:mm A")
    );
    setDayEvents(events);

    const events1 = advice.filter((evt) => {
      var spit = evt.liturgy_on.split(" ");
      spit = spit[0].split("-");
      var sspitv = spit[0] + "-" + spit[1] + "-" + spit[2];
      var m = sspitv == mnp ? evt.liturgy_on : "";
      return m;
    });
    setMassTime(events1);
  }, [filteredEvents, advice, day]);

  function getCurrentDayClass() {
    return dayjs().isSame(day, "day")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  // Filter out past day boxes
  if (dayjs().isAfter(day, "day")) {
    return null;
  }

  return (
    <div className="border border-[#cdc8c88a] flex flex-col background-color">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1 font-bold week-border">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        {day.format("dddd") !== "Sunday" && (
          <p
            className={`text-sm p-1 my-1 text-center font-bold ${getCurrentDayClass()}  `}>
            {day.format("DD")}
          </p>
        )}
        {day.format("dddd") === "Sunday" && (
          <p
            className={`text-sm p-1 my-1 text-center font-bold text-red-500 ${getCurrentDayClass()} `}>
            {day.format("DD")}
          </p>
        )}
      </header>
      <div
        className={`flex-1 box-inner`}
        onClick={() => {
          setDaySelected(day);
        }}>
        {massTime.map((evt, idx) => {
          var cur_time = new Date().getTime();
          var api_time = new Date(evt?.liturgy_on.replace(/-/g, "/"));
          var booking_time = new Date(api_time);
          booking_time.setDate(api_time.getDate() - 1); // Go back one day
          booking_time.setHours(17, 0, 0, 0); // Set time to 5:00 PM
          if (cur_time <= booking_time.getTime()) {
            var spit = evt.liturgy_on.split(" ");

            return (
              <div
                key={idx}
                onClick={() => {
                  setNewSelectedEvent(evt);
                  setShowEventModal(true);
                }}
                className={`bg-green-200 p-1 mr-3  text-sm rounded mb-1 truncate`}
                style={{
                  backgroundColor:
                    evt.language_id[1] === "Konkani"
                      ? "#fba3a3"
                      : evt.language_id[1] === "Tamil"
                      ? "#a3e7fb"
                      : evt.language_id[1] === "Kannada"
                      ? "#fbe0a3"
                      : evt.language_id[1] === "English"
                      ? "#bbf7d0"
                      : evt.language_id[1] === "Malayalam"
                      ? "#d5bbf7"
                      : "",
                }}>
                <p title="Add new intention">
                  {spit[1]} - {spit[2]} - {evt.language_id["1"]}
                </p>
              </div>
            );
          }
        })}
        {show && (
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-3 border-b border-solid border-gray-300 rounded-t ">
                  <h2 className="text-xl font=bold">ADD INTENTION</h2>
                  <div>
                    <button onClick={() => setShow(false)}>
                      <span
                        className="text-red-500  opacity-7 h-6 w-6 text-xl block  py-0 rounded-full"
                        title="Close">
                        X
                      </span>
                    </button>
                  </div>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-red-400 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <h> You are not allowed to enter the MassIntention </h>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    type="submit"
                    onClick={() => setShow(false)}
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1">
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
