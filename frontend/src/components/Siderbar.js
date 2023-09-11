import React, { useEffect, useContext } from "react";
//import CreateEventButton from './CreateEventButton'
import GlobalContext from "../context/GlobalContext";
//import dayjs from 'dayjs'
import "../App.css";
import axios from "axios";
//import EventModal from "./EventModal";
import swal from "sweetalert";

export default function Siderbar() {
  //const { dispatchCalEvent } = useContext(GlobalContext);
  //const [dayEvents, setDayEvents] = useState([]);
  const {
    //setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
    //setNewSelectedEvent,
    //advice, setAdvice,
  } = useContext(GlobalContext);

  const paymentUrl = "https://payonline.ascensionchurchbangalore.org/";

  function hadleSubmit(e) {
    const datas = {
      amount: 200 * filteredEvents.length,
      name: filteredEvents[0].name,
      email: filteredEvents[0].email,
      mobile: filteredEvents[0].number,
      intention: filteredEvents[0].intention,
      intentionfor: filteredEvents[0].intentionfor,
      mass_id: filteredEvents[0].mass_id,
      massTiming: filteredEvents[0].massTiming,
      language: filteredEvents[0].language[1],
    };

    window.location =
      paymentUrl +
      `payment/?amount=${datas.amount}&name=${filteredEvents[0].name}&email=${filteredEvents[0].email}&mobile=${filteredEvents[0].number}&intention=${datas.intention}&intentionfor=${datas.intentionfor}&mass_id=${datas.mass_id}&massTiming=${datas.massTiming}&language=${datas.language}`;
    axios
      .post("paymentUrl+/payment/", datas)
      .then((res) => {
        //localStorage.clear();
        console.log(res);
        if (res.status === 200) {
          //window.location.href = res.data.URL;
        }
      })
      .catch((err) => {
        alert("Something went wrong, please try again");
      });
  }

  const getUrl = "https://massbooking.ascensionchurchbangalore.org/?f_code=";

  useEffect(() => {
    var data = window.location.href.split("?f_code=");
    axios
      .get(getUrl)
      .then((res) => {
        if (data[1] === "OK") {
          swal({
            title: "Your record is Saved Successfully!",
            text: "Ascension Church,Bangalore",
            icon: "success",
            confirmButtonColor: "rgb(24, 57, 60)",
            button: "OK",
          });
        } else if (data[1] === "F") {
          swal({
            title: "Try again! Somthing went wrong!",
            text: "Ascension Church,Bangalore",
            icon: "error",
            buttonColor: "#DD6B55",
            button: "OK",
          });
        } else if (data[1] === "C") {
          swal({
            title: "Try again! Somthing went wrong!",
            text: "Ascension Church,Bangalore",
            buttonColor: "#DD6B55",
            button: "Cancel",
          });
        }
      })
      .catch((error) => {
        swal({
          error: "error",
          title: "Try again! Somthing went wrong!",
          text: "Ascension Church,Bangalore",
          icon: "error",
          buttonColor: "#DD6B55",
          button: "OK",
        });
      });
  }, []);

  return (
    <aside className="">
      {filteredEvents.length !== 0 && (
        <table>
          {filteredEvents.map((evt, idx) => {
            var spit = evt.massTiming.split(" ");
            return (
              <div>
                <div className="flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t ">
                  <h1 className="text-xl  font=bold">MASS-INTENTION</h1>
                  <span
                    onClick={() => {
                      setSelectedEvent(evt);
                      setShowEventModal(true);
                    }}
                    className="material-icons-outlined text-red-500 edit text-black opacity-7 h-6 w-6 text-xl block bg-red-400 py-0 rounded-full"
                    title="Edit">
                    edit
                  </span>
                </div>
                <div className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                  <p>
                    {
                      <p style={{ color: "green" }}>
                        {evt.language[1]} : {spit[0]} {spit[1]} - {spit[2]}
                      </p>
                    }
                    <label
                      for="icon-users"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Name
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          class="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          {" "}
                          <path
                            class="path1"
                            d="M12 12.041v-0.825c1.102-0.621 2-2.168 2-3.716 0-2.485 0-4.5-3-4.5s-3 2.015-3 4.5c0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h14c0-2.015-2.608-3.682-6-3.959z"></path>
                          <path
                            class="path2"
                            d="M5.112 12.427c0.864-0.565 1.939-0.994 3.122-1.256-0.235-0.278-0.449-0.588-0.633-0.922-0.475-0.863-0.726-1.813-0.726-2.748 0-1.344 0-2.614 0.478-3.653 0.464-1.008 1.299-1.633 2.488-1.867-0.264-1.195-0.968-1.98-2.841-1.98-3 0-3 2.015-3 4.5 0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h4.359c0.227-0.202 0.478-0.393 0.753-0.573z"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your Name"
                        value={evt.name}
                      />
                    </div>
                    <label
                      for="icon-users"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Offered For
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          class="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          {" "}
                          <path
                            class="path1"
                            d="M12 12.041v-0.825c1.102-0.621 2-2.168 2-3.716 0-2.485 0-4.5-3-4.5s-3 2.015-3 4.5c0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h14c0-2.015-2.608-3.682-6-3.959z"></path>
                          <path
                            class="path2"
                            d="M5.112 12.427c0.864-0.565 1.939-0.994 3.122-1.256-0.235-0.278-0.449-0.588-0.633-0.922-0.475-0.863-0.726-1.813-0.726-2.748 0-1.344 0-2.614 0.478-3.653 0.464-1.008 1.299-1.633 2.488-1.867-0.264-1.195-0.968-1.98-2.841-1.98-3 0-3 2.015-3 4.5 0 1.548 0.898 3.095 2 3.716v0.825c-3.392 0.277-6 1.944-6 3.959h4.359c0.227-0.202 0.478-0.393 0.753-0.573z"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="intentionfor"
                        value={evt.intentionfor}
                      />
                    </div>
                    <label
                      for="icon-users"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Intention
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          class="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path d="M 4 4 h 16 a 2 2 0 0 1 2 2 v 14" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="intention"
                        value={evt.intention}
                      />
                    </div>
                    <label
                      for="email-address-icon"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Email
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          class="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="email@gmail.com"
                        value={evt.email}
                      />
                    </div>
                    <label
                      for="email-address-icon"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Phone Number
                    </label>
                    <div class="relative">
                      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          class="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          {" "}
                          <path
                            class="path1"
                            d="M11.5 0h-7c-0.825 0-1.5 0.675-1.5 1.5v13c0 0.825 0.675 1.5 1.5 1.5h7c0.825 0 1.5-0.675 1.5-1.5v-13c0-0.825-0.675-1.5-1.5-1.5zM6 0.75h4v0.5h-4v-0.5zM8 15c-0.552 0-1-0.448-1-1s0.448-1 1-1 1 0.448 1 1-0.448 1-1 1zM12 12h-8v-10h8v10z"></path>
                        </svg>
                      </div>
                      <input
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Phone Number"
                        value={evt.number}
                      />
                    </div>
                  </p>
                </div>
              </div>
            );
          })}
          <div className="flex items-center justify-end p-2 border-t border-solid border-blueGray-200 rounded-b">
            <button
              type="button"
              onClick={hadleSubmit}
              class="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
              <svg
                class="w-4 h-4 mr-2 -ml-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="paypal"
                role="img"
                viewBox="0 0 384 512">
                <path
                  fill="currentColor"
                  d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path>
              </svg>
              PayNow
            </button>
            <p style={{ paddingLeft: "8%" }}>
              Total : ₹ {200 * filteredEvents.length}
            </p>
          </div>
        </table>
      )}
    </aside>
  );
}
