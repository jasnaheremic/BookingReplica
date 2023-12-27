import React, { useContext, useState ,useEffect } from 'react';
import { useFetch } from '../../hooks/useFetch.js'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { SearchContext } from '../../context/searchContext.js';
import './reserve.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Reserve = ({ setOpen, hotelId , data}) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [roomsData, setRoomsData] = useState([]);

  
  const { dates } = useContext(SearchContext);

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const response = await axios.get(`/hotels/room/${hotelId}`);
        setRoomsData(response.data);
      } catch (error) {
        console.error('Error fetching rooms data:', error);
      }
    };

    fetchRoomsData();
  }, [hotelId]);

  console.log(roomsData);

    const getDatesInRange = (startDate,endDate)=>{
        const start = new Date(startDate);
        const end = new Date(endDate);

        const date = new Date(start.getTime());

        let dates = []

        while(date <= end){
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate()+1);
        }

        return dates;
    }

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const isAvailable = (roomNumber) =>{
        const isFound = roomNumber.unavailableDates.some(date=>
            alldates.includes(new Date(date).getTime())
            );

            return !isFound;
    }

    const handleSelect = (e) => {
      const checked = e.target.checked;
      const value = e.target.value
      setSelectedRooms(checked ? [...selectedRooms, value] 
        : selectedRooms.filter((item)=>item !==value));
    };

const navigate = useNavigate()

    const handleClick = async () => {
      try {
        await Promise.all(
          selectedRooms.map((roomId) => {
            const res = axios.put(`/rooms/availability/${roomId}`, {
              dates: alldates,
            });
            return res.data;
          })
        );
        setOpen(false);
        navigate("/");
      } catch (err) {
        
      }
    };

return (
  <div className="reserve">
    Reserve
    <div className="rContainer">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="rClose"
        onClick={() => setOpen(false)}
      />
      <span>Odabir sobe:</span>
      {data && data.map((item) => (
        <div className="rItemInfo" key={item._id}>
      
          <div className="rTitle">{item.title}</div>
          <div className="rDesc">{item.desc}</div>
          <div className="rMax">
            Max osoba: <b>{item.maxPeople}</b>
          </div>
          <div className="rPrice">{item.price}</div>
          <div className="rSelectRooms">
            {item.roomNumbers.map((roomNumber) => (
              <div className="room" key={roomNumber._id}>
                <label>{roomNumber.number}</label>
                <input
                  type="checkbox"
                  value={roomNumber._id}
                  onChange={handleSelect}
                  disabled={!isAvailable(roomNumber)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleClick} className="rButton">
        Rezervišite sad!
      </button>
    </div>
  </div>
);
};

export default Reserve;



    /*return (
      <div className="reserve">
        Reserve
        <div className="rContainer">
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="rClose"
            onClick={() => setOpen(false)}
          />
          <span>Odabir sobe:</span>
          {data.map((item) => (
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max osoba: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>


              <div className="rSelectRooms">


              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
              </div>
            </div>
          ))}
          <button onClick={handleClick} className="rButton">Rezervišite sad!</button>
        </div>
      </div>
    );
  };


export default Reserve;
*/


/*
import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { SearchContext } from '../../context/searchContext.js';
import axios from 'axios';
import './reserve.css';


const getDatesInRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const date = new Date(start.getTime());
  let dates = [];

  while (date <= end) {
    dates.push(new Date(date).getTime());
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

const Reserve = ({ setOpen, hotelId, data }) => {
  const { dates } = useContext(SearchContext);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const navigate =navigate();
 

  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const response = await axios.get(`/hotels/room/${hotelId}`);
        // setRoomsData(response.data);
      } catch (error) {
        console.error('Error fetching rooms data:', error);
      }
    };

    fetchRoomsData();
  }, [hotelId]);

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
         const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/home")
    } catch (err) {
    }
  };

  return (
    <div className="reserve">
      Reserve
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
        <span>Odabir sobe:</span>
        {data &&
          data.map((item) => (
            <div className="rItemInfo" key={item._id}>
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max osoba: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room" key={roomNumber._id}>
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        <button onClick={handleClick} className="rButton">
          Rezervišite sad!
        </button>
      </div>
      </div>
    );
  };


export default Reserve;*/
