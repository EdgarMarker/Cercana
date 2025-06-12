import "../../styles/accommodationPage.styles.css";
import Dashboard from "@/app/components/hero/Dashboard";
import AccommodationPageCardList from "@/app/components/ui/card-list/AccommodationPage.cardList";
import PortableTextCustom from "@/app/components/ui/portableText/PortableTextCustom";
import { getAccommodationData } from "@/app/data/accommodationPage.data";
import { getRoomData } from "@/app/data/room.data";
import { Accommodation } from "@/app/types/accommodationPage.types";
import { Room } from "@/app/types/room.types";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

const page = async ({ params }: Props) => {
  const { locale } = await params;
  const pageData: Accommodation = await getAccommodationData({ locale });
  const roomData: Room[] = await getRoomData(locale);

  return (
    <>
      <section className="hero">
        <div className="column__2">
          <div className="col__left">
            <h1>{pageData?.string_h1}</h1>
            <PortableTextCustom
              hasImg={false}
              data={pageData?.block_info || []}
            />
          </div>
          <div className="col__right">
          </div>
        </div>
        <div className="column__1">
          <Dashboard locale={locale} />
        </div>
      </section>
      <section className="content">
        <div className="column__1">
          <AccommodationPageCardList locale={locale} roomData={roomData} />
        </div>
      </section>
    </>
  );
};

export default page;
