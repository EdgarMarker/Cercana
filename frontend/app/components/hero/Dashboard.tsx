"use client";
import React, { useEffect, useState } from "react";
import DayPickerComponent from "./DayPickerComponent";
import {
  getAllRoomCategories,
  getAllRoomLocations,
  getCategoriesByLocation,
} from "@/app/data/room.data";
import { RoomCategory, RoomLocation } from "@/app/types/room.types";
import SearchBtn from "../ui/btn/SearchBtn";
import { getMessages } from "@/messages/getMessages";

const Dashboard = ({ locale }: { locale: string }) => {
  /* *Language */
  const L = getMessages(locale);

  /* *Hooks */
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [roomCategory, setRoomCategory] = useState<RoomCategory[]>([]);
  const [roomLocation, setRoomLocation] = useState<RoomLocation[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<RoomCategory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const dataCategory = await getAllRoomCategories();
      const dataLocation = await getAllRoomLocations();
      setRoomLocation(dataLocation);
      setRoomCategory(dataCategory);
      setFilteredCategories(dataCategory);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterCategories = async () => {
      if (selectedLocation) {
        try {
          const availableCategories = await getCategoriesByLocation(locale, selectedLocation);
          setFilteredCategories(availableCategories);
          
          if (selectedCategory && !availableCategories.some(cat => cat.string_name === selectedCategory)) {
            setSelectedCategory("");
          }
        } catch (error) {
          console.error("Error filtering categories:", error);
          setFilteredCategories([]);
        }
      } else {
        setFilteredCategories(roomCategory);
        setSelectedCategory("");
      }
    };

    filterCategories();
  }, [selectedLocation, roomCategory, locale, selectedCategory]);

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const handleLocationChange = (event: any) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <ul role="list" className="dashboard">
      <li className="dashboard__item">
        <select
          value={selectedLocation}
          onChange={handleLocationChange}
          className="dashboard__dropdown"
        >
          <option value="" disabled>
            {L.dashboard.zoneInterest}
          </option>
          {roomLocation.map((location) => (
            <option key={location.string_name} value={location.string_name}>
              {location.string_name}
            </option>
          ))}
        </select>
      </li>
      <li className="dashboard__item">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="dashboard__dropdown"
          disabled={!selectedLocation}
        >
          <option value="" disabled>
            {selectedLocation
              ? L.dashboard.accommodationType
              : L.dashboard.firstZone
            }
          </option>
          {filteredCategories.map((category) => (
            <option key={category.string_name} value={category.string_name}>
              {category.string_name}
            </option>
          ))}
        </select>
      </li>
      <li className="dashboard__item">
        <DayPickerComponent locale={locale}/>
      </li>
      <li className="dashboard__item">
        <SearchBtn
          locale={locale}
          selectedCategory={selectedCategory}
          selectedLocation={selectedLocation}
        />
      </li>
    </ul>
  );
};

export default Dashboard;
