import "../styles/home.style.css";
import { getMessages } from "@/messages/getMessages";
import { getDataPage } from "../data/home.data";
import PopBtn from "../components/ui/btn/PopBtn";
import Image from "next/image";
import PortableTextCustom from "../components/ui/portableText/PortableTextCustom";
import CustomImg from "../components/ui/img/CustomImg";
import GoBtn from "../components/ui/btn/GoBtn";
import SliderTesty from "../components/slider/SliderTesty";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const supportedLocales = ["en", "es"];
  if (!supportedLocales.includes(locale)) {
    throw new Error("Function not implemented.");
  }

  const data = await getDataPage(locale);
  const t = getMessages(locale);

  return (
    <>
      <section className="hero">
        <CustomImg
          containerClassName="hero__bgContainer"
          src={data.hero.img_bg.media.url}
          alt="Hero background"
          fill={true}
          priority={true}
          sizes="100vw"
        />
        <div className="column__1">
          <h1>{data.hero.string_h1}</h1>
          <h2>{data.hero.string_h2}</h2>
          <PopBtn iconDirection="" text={data.hero.string_btn} />
        </div>
        <div className="column__1">
          <ul className="hero__reserveDashboard">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </section>
      <section className="intro fadeInOut">
        <div className="column__1">
          <PortableTextCustom
            data={data.intro.block_info}
            hasImg={true}
            imgContainerClassName="intro__imgIconContainer"
          />
        </div>
        <div className="column__2">
          <div className="col__left">
            <CustomImg
              containerClassName="intro__imgLeftContainer"
              src={data.intro.img.media.url}
              alt="intro imagen referencia"
              width={960}
              height={720}
            />
          </div>
          <div className="col__right">
            <PortableTextCustom
              data={data.intro.block_imgAndInfo}
              hasImg={true}
              imgContainerClassName="intro__imgRightContainer"
            />
          </div>
        </div>
      </section>
      <section className="catalogue fadeInOut">
        <div className="column__2">
          <div className="col__left">
            <h2>{data.catalogue.string_h2}</h2>
          </div>
          <div className="col__right">
            <p>{data.catalogue.text_desc}</p>
          </div>
        </div>
        <div className="column__1">
          <GoBtn goTo="/" text={data.catalogue.string_btn} />
        </div>
      </section>
      <section className="cercana fadeInOut">
        <div className="column__2">
          <div className="col__left">
            <PortableTextCustom data={data.explore.block_info} hasImg={false} />
            <GoBtn goTo="/" text={data.explore.string_btn} />
          </div>
          <div className="col__right">
            <CustomImg
              containerClassName="cercana__imgLContainer"
              src={data.explore.img_1.media.url}
              alt="cercana imagen referencia 1"
              width={600}
              height={600}
            />
            <div className="cercana__img--absolute">
              <CustomImg
                containerClassName="cercana__imgSmContainer"
                src={data.explore.img_1.media.url}
                alt="cercana imagen referencia 1"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="testimonials">
        <div className="column__1">
          <h2>{data.testy.string_h2}</h2>
          <SliderTesty data={data.testy} />
        </div>
      </section>
    </>
  );
}
