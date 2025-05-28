"use client";
import React, { useEffect, useState } from "react";
import DayPickerComponent from "./DayPickerComponent";
import {
  getAllRoomCategories,
  getAllRoomLocations,
} from "@/app/data/room.data";
import { RoomCategory, RoomLocation } from "@/app/types/room.types";
import SearchBtn from "../ui/btn/SearchBtn";

const Dashboard = ({ locale }: { locale: string }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const [roomCategory, setRoomCategory] = useState<RoomCategory[]>([]);
  const [roomLocation, setRoomLocation] = useState<RoomLocation[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const dataCategory = await getAllRoomCategories();
      const dataLocation = await getAllRoomLocations();
      setRoomLocation(dataLocation);
      setRoomCategory(dataCategory);
    };
    fetchData();
  }, []);

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
            Zona de interés
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
        >
          <option value="" disabled>
            Tipo de alojamiento
          </option>
          {roomCategory.map((category) => (
            <option key={category.string_name} value={category.string_name}>
              {category.string_name}
            </option>
          ))}
        </select>
      </li>
      <li className="dashboard__item">
        <DayPickerComponent />
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
