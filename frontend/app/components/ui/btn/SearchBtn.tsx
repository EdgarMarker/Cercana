"use client";
import { searchRooms } from "@/app/data/room.data";
import React, { useState } from "react";
import { useSearchRoomStore } from "@/app/stores/searchRoom.stores";
import { useRouter } from "next/navigation";

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
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setSearchResults } = useSearchRoomStore();
  const router = useRouter();
  const currentLocale = locale === "es" ? "es/alojamiento" : "en/accommodation";
  const handleSearch = async () => {
    if (!selectedCategory || !selectedLocation) {
      setError("Por favor, selecciona una categoría o ubicación.");
      return;
    }

    setIsSearching(true);
    setError(null);

    try {
      const data = await searchRooms(locale, {
        category: selectedCategory,
        location: selectedLocation,
      });
      if (data && data.length > 0) {
        setIsSearching(false);
        setSearchResults(data);
        router.push(`/${currentLocale}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  };
  return (
    <button onClick={handleSearch} className="btn btn__search">
      {isSearching ? "Buscando..." : "Buscar Alojamiento"}
      {error && <div className="error">{error}</div>}
    </button>
  );
};

export default SearchBtn;
