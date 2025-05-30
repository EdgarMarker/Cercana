"use client";
import { Room } from "@/app/types/room.types";
import React, { useState } from "react";
import PortableTextCustom from "../portableText/PortableTextCustom";

interface Props {
  data: Room;
  LWalking: string;
  LDriving: string;
}
const AccommodationDetailDistanceTab = ({
  data,
  LWalking,
  LDriving,
}: Props) => {
  const [currentTab, setCurrentTab] = useState("walking");
  return (
    <section className="tab__distanceRoom">
      <div className="dashboard">
        <button
          className={currentTab === "walking" ? "" : "select"}
          onClick={() => setCurrentTab("walking")}
        >
          {LWalking}
        </button>
        <button
          className={currentTab === "driving" ? "" : "select"}
          onClick={() => setCurrentTab("driving")}
        >
          {LDriving}
        </button>
      </div>
      {currentTab === "walking" && (
        <div className="content">
          <PortableTextCustom
            hasImg={false}
            data={data.page.distance.block_distanceWalking || []}
          />
        </div>
      )}
      {currentTab === "driving" && (
        <div className="content">
          <PortableTextCustom
            hasImg={false}
            data={data.page.distance.block_distanceDriving || []}
          />
        </div>
      )}
    </section>
  );
};

export default AccommodationDetailDistanceTab;
