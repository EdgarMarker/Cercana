import "../styles/home.style.css";
import { getMessages } from "@/messages/getMessages";
import { getDataPage } from "../data/home.data";
import PopBtn from "../components/ui/btn/PopBtn";
import PortableTextCustom from "../components/ui/portableText/PortableTextCustom";
import CustomImg from "../components/ui/img/CustomImg";
import GoBtn from "../components/ui/btn/GoBtn";
import SliderTesty from "../components/slider/SliderTesty";
import Footer from "../components/footer/Footer";
import Navigation from "../components/hero/Navigation";
import { animationManager, useGSAP } from "../lib/gsap/animation-manager";

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
      <section className="hero" id="Hero">

        <div className="hero__bgStatic">
          {/* Este sería un slice con la imagen 1 del array, que se usa de fondo para facilitar el loop */}
          <CustomImg
            containerClassName="hero__bgContainer"
            src={data.hero.img_bg.media.url}
            alt="Hero background"
            category="xl"
            fill={true}
          />
        </div>
        
        {/*   Array de las 3 imágenes: */}
        <CustomImg
          containerClassName="hero__bgContainer"
          src={data.hero.img_bg.media.url}
          alt="Hero background"
          category="xl"
          fill={true}
        />
        <CustomImg
          containerClassName="hero__bgContainer"
          src={data.hero.img_bg.media.url}
          alt="Hero background"
          category="xl"
          fill={true}
        />
        <CustomImg
          containerClassName="hero__bgContainer"
          src={data.hero.img_bg.media.url}
          alt="Hero background"
          category="xl"
          fill={true}
        />

        <div className="column__2 hero__info">
          <div className="col__left">
            <h1>{data.hero.string_h1}</h1>
            <h2>{data.hero.string_h2}</h2>
            <PopBtn
              className="btn__secondary"
              showModal={true}
              whichModal="formModal"
              iconDirection=""
              text={data.hero.string_btn}
            />
          </div>
          <div className="col__right"></div>
        </div>
        <div className="grad__left"></div>
        <div className="grad__down"></div>
        <div className="column__1">
          <ul className="hero__reserveDashboard">
            <Navigation />
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </section>
      <section className="intro fadeInOut" id="Intro">
        <div className="column__1">
          <PortableTextCustom
            data={data.intro.block_info}
            hasImg={true}
            imgContainerClassName="intro__imgIconContainer"
            category="small"
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
              category="regular"
            />
          </div>
          <div className="col__right">
            <PortableTextCustom
              data={data.intro.block_imgAndInfo}
              hasImg={true}
              imgContainerClassName="intro__imgRightContainer"
              category="small"
            />
          </div>
        </div>
      </section>
      <section className="catalogue fadeInOut" id="Catalogue">
        <div className="column__2">
          <div className="col__left">
            <h2>{data.catalogue.string_h2}</h2>
          </div>
          <div className="col__right">
            <p>{data.catalogue.text_desc}</p>
          </div>
        </div>
        <div className="column__1">
          <div className="parent">
            <div className="div1">
              <div>1</div>
            </div>
            <div className="div2">
              <div>2</div>
            </div>
            <div className="div3">
              <div>3</div>
            </div>
            <div className="div4">
              <div>4</div>
            </div>
            <div className="div5">
              <div>5</div>
            </div>
          </div>
          <GoBtn
            hasScroll={false}
            goToUrl="/accommodation"
            text={data.catalogue.string_btn}
            className="btn__primary"
          />
        </div>
      </section>
      <section className="cercana fadeInOut" id="Explore">
        <div className="column__2">
          <div className="col__left">
            <PortableTextCustom data={data.explore.block_info} hasImg={false} />
            <GoBtn
              hasScroll={false}
              goToUrl=""
              text={data.explore.string_btn}
              className="btn__primary"
            />
          </div>
          <div className="col__right">
            <CustomImg
              containerClassName="cercana__imgLContainer"
              src={data.explore.img_1.media.url}
              alt="cercana imagen referencia 1"
              width={600}
              height={600}
              category="regular"
            />
            <div className="cercana__img--absolute">
              <CustomImg
                containerClassName="cercana__imgSmContainer"
                src={data.explore.img_1.media.url}
                alt="cercana imagen referencia 1"
                width={300}
                height={300}
                category="small"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="testimonials fadeInOut" id="Testimonials">
        <div className="column__1">
          <h2>{data.testy.string_h2}</h2>
          <SliderTesty data={data.testy} />
        </div>
      </section>
      <Footer language={locale} />
    </>
  );
}
