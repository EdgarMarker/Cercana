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
    <footer className="footer fadeInOut">
      <div className="column__1">
        <GoBtn hasScroll={true} goToSection="#Hero">
          Ir arriba
        </GoBtn>
        <CustomImg
          src={logo}
          alt="logo pie de pagina"
          containerClassName="footer__logo"
          category="small"
          width={100}
          height={100}
        />
      </div>

      <div className="column__1">
        <div className="listado__x4">
          <div className="foot__item">
            <h3>{language === "es" ? "Mapa del sitio" : "Site Map"}</h3>
            <ul role="list">
              {urls.map((url, idx) => (
                <li key={idx}>
                  <a href={url.url}>{url.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="foot__item">
            <h3>{language === "es" ? "Propiedades" : "Properties"}</h3>
            <ul role="list">
              <li>
                <a>Casas</a>
              </li>
              <li>
                <a>Departamentos</a>
              </li>
              <li>
                <a>Playa</a>
              </li>
              <li>
                <a>Desarrollos</a>
              </li>
            </ul>
          </div>

          <div className="foot__item">
            <h3>{language === "es" ? "Contáctenos" : "Contact"}</h3>
            <ul role="list">
              <li>
                <a href={`mailto:${data.contact.string_email}`}>
                  {data.contact.string_email}
                </a>
              </li>
              <li>
                <a href={`telto:${data.contact.string_phone}`}>
                  {data.contact.string_phone}
                </a>
              </li>
              <li>
                <a href={`telto:${data.contact.string_lada}`}>
                  {data.contact.string_lada}
                </a>
              </li>
              <li>
                <a href={data.contact.string_addressLink}>
                  {data.contact.string_address}
                </a>
              </li>
            </ul>
          </div>

          <div className="foot__item">
            <h3>{language === "es" ? "Síguenos" : "Follow"}</h3>
            <ul role="list">
              <li>
                <a href={data.social.string_fbLink} target="_blank">
                  Facebook
                </a>
              </li>
              <li>
                <a href={data.social.string_igLink} target="_blank">
                  Instagram
                </a>
              </li>
              <li>
                <a href={data.social.string_ytLink} target="_blank">
                  YouTube
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

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
