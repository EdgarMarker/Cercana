import "@/app/styles/footer.style.css";
import { getCompanyData } from "@/app/data/company.data";
import { Company } from "@/app/types/company.types";
import GoBtn from "../ui/btn/GoBtn";
import CustomImg from "../ui/img/CustomImg";
import logo from "@/app/assets/svg/key_gold_dark.svg";

interface Props {
  language: string;
}
const Footer = async ({ language }: Props) => {
  const data: Company = await getCompanyData();

  const urlsEs = [
    { name: "Inicio", url: "/" },
    { name: "Alojamiento", url: "/alojamiento" },
    { name: "Desarrollo", url: "/desarrollo" },
    { name: "Nosotros", url: "/nosotros" },
    { name: "Contacto", url: "/contacto" },
  ];

  const urlsEn = [
    { name: "Home", url: "/" },
    { name: "Accommodation", url: "/accommodation" },
    { name: "Development", url: "/develop" },
    { name: "About", url: "/about" },
    { name: "Contact", url: "/contact" },
  ];

  const urls = language === "es" ? urlsEs : urlsEn;
  return (
    <footer className="footer">
      <div className="column__1">
        <GoBtn hasScroll={true} goToSection="#Hero" text="Ir arriba" />
        <CustomImg
          src={logo}
          alt="logo pie de pagina"
          containerClassName="footer__logo"
          category="small"
          width={100}
          height={100}
        />
      </div>
      <ul className="listado__x4" role="list">
        <li>
          <h3>{language === "es" ? "Mapa del sitio" : "Site Map"}</h3>
          {urls.map((url, idx) => (
            <GoBtn
              key={idx}
              hasScroll={false}
              goToUrl={url.url}
              text={url.name}
            />
          ))}
        </li>
        <li>
          <h3>{language === "es" ? "Propiedades" : "Properties"}</h3>
          <p>Casas</p>
          <p>Departamentos</p>
          <p>Playa</p>
          <p>Desarrollos</p>
        </li>
        <li>
          <h3>{language === "es" ? "Contáctenos" : "Contact"}</h3>
          <GoBtn
            hasScroll={false}
            goToUrl={`mailto:${data.contact.string_email}`}
            text={data.contact.string_email}
          />
          <GoBtn
            hasScroll={false}
            goToUrl={`telto:${data.contact.string_phone}`}
            text={data.contact.string_phone}
          />
          <GoBtn
            hasScroll={false}
            goToUrl={`telto:${data.contact.string_lada}`}
            text={data.contact.string_lada}
          />
          <GoBtn
            hasScroll={false}
            goToUrl={data.contact.string_addressLink}
            text={data.contact.string_address}
          />
        </li>
        <li>
          <h3>{language === "es" ? "Síguenos" : "Follow"}</h3>
          <GoBtn
            hasScroll={false}
            goToUrl={data.social.string_fbLink}
            text="Facebook"
          />
          <GoBtn
            hasScroll={false}
            goToUrl={data.social.string_igLink}
            text="Instagram"
          />
          <GoBtn
            hasScroll={false}
            goToUrl={data.social.string_ytLink}
            text="YouTube"
          />
        </li>
      </ul>
      <span>
        Cercana © Todos los derechos reservados.{" "}
        <a href="/" className="footer__spanAviso">
          Aviso de Privacidad
        </a>
        . Sitio web creado por{" "}
        <a href="/" className="footer__spanMarker">
          Marker
        </a>
      </span>
    </footer>
  );
};

export default Footer;
