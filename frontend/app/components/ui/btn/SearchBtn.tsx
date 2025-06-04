"use client";
import { searchRooms } from "@/app/data/room.data";
import React, { useState } from "react";
import { useSearchRoomStore } from "@/app/stores/searchRoom.stores";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getMessages } from "@/messages/getMessages";
import { animationManager, useGSAP } from "@/app/lib/gsap/animation-manager";

interface Props {
  selectedCategory: string;
  selectedLocation: string;
  locale?: string;
}
const SearchBtn = ({
  selectedCategory,
  selectedLocation,
  locale = "es",
}: Props) => {
  /* *Language */
  const currentLocale = locale === "es" ? "es/alojamiento" : "en/accommodation";
  const L = getMessages(locale);
  /* *Hooks */
  const [isSearching, setIsSearching] = useState(false);
  const { setSearchResults } = useSearchRoomStore();

  const router = useRouter();

  const { contextSafe } = useGSAP();

  const handleSearch = contextSafe(async () => {
    if (!selectedCategory || !selectedLocation) {
      toast.warning(L.dashboard.errorMessage);
      return;
    }

    setIsSearching(true);

    try {
      const data = await searchRooms(locale, {
        category: selectedCategory,
        location: selectedLocation,
      });

      if (data && data.length > 0) {
        setSearchResults(data);
        router.push(`/${currentLocale}`);
      }
    } catch (err: any) {
      setSearchResults([]);
      router.push(`/${currentLocale}`);
    } finally {
      setIsSearching(false);
    }
  });

  return (
    <button onClick={handleSearch} className="btn btn__search">
      {isSearching ? L.dashboard.searching : L.dashboard.searchAccommodation}
    </button>
  );
};

export default SearchBtn;
