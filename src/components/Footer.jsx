import { Link, useLocation } from "react-router";
import { FiPhoneCall, FiMail} from "react-icons/fi";
import {
  TbBrandLinkedin,
  TbBrandFacebook,
  TbBrandInstagram,
} from "react-icons/tb";
import { FaFacebook } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import useMediaQuery from "../hooks/useMediaQuery";

const Footer = () => {
  const { t } = useTranslation();
  const emailUser1 = t("footer.email.value1");
  const emailUser2 = t("footer.email.value2");
  const emailDomain = "gmail.com";
  const email = `${emailUser1}${emailUser2}@${emailDomain}`;

  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const contactsStyle =
    location.pathname === "/contacts" && !isMobile
      ? "fixed bottom-0 left-0"
      : "";

  return (
    <div>
      <footer
        className={`footer bg-secondary text-primary justify-around border-t-2 border-primary block ${contactsStyle}`}
      >
        <div className="flex flex-row justify-evenly md:justify-between w-full px-1 md:px-4 mt-4">
          <aside className="aspect-[3/1] md:max-w-[240px] lg:max-w-[320px] min-w-[90px] self-center">
            <Link to="/" className="hidden md:block">
              <img
                src={t("navbar.logo")}
                alt="ITSKOV STROY logo"
                width="514"
                height="194"
                className="w-40 md:w-64 h-auto"
                loading="eager"
                decoding="async"
              />
            </Link>
            <Link to="/" className="md:hidden">
              <img
                src={t("navbar.logo2")}
                alt="ITSKOV STROY logo"
                className="w-32 md:w-64 h-auto"
                loading="eager"
                decoding="async"
              />
            </Link>
          </aside>
          <aside className="self-center hidden md:flex flex-col justify-around md:gap-2">
            <div className="flex flex-col gap-2 md:gap-3 justify-center">
              <p className="flex flex-row text-center items-center text-xs md:text-xl lg:text-3xl indent-2 justify-center font-pf">
                <a
                  href={`tel:${t("footer.phone")}`}
                  className="font-pf flex flex-row text-center text-neutral items-center hover:text-accent transition-colors duration-300"
                >
                  <FiPhoneCall className="text-lg md:text-3xl" />
                  {t("footer.phone")}
                </a>
              </p>
              <p className="text-xs md:text-xl lg:text-3xl indent-2 justify-center">
                <a
                  href={`mailto:${email}`}
                  className="font-pf flex flex-row text-center text-neutral items-center hover:text-accent transition-colors duration-300"
                >
                  <FiMail className="text-lg md:text-3xl" />
                  {email}
                </a>
              </p>
            </div>
            <p className="hidden lg:block md:text-xl justify-self-center mb-4 self-center">
              {t("footer.slogan")}
            </p>
          </aside>
          <aside className="self-center md:mr-8">
            <div className="flex flex-col">
              <div className="flex flex-row justify-center gap-1 md:gap-4">
                <a
                  href={`tel:${t("footer.phone")}`}
                  className="md:hidden text-3xl md:text-5xl text-bold text-neutral"
                >
                  <FiPhoneCall className="hover:text-accent transition-colors duration-300" />
                </a>
                <a
                  href={`mailto:${email}`}
                  className="md:hidden text-3xl md:text-5xl text-bold text-neutral"
                >
                  <FiMail className="hover:text-accent transition-colors duration-300" />
                </a>
                <a
                  href={t("footer.social-links.linkedin")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-3xl md:text-5xl text-bold text-neutral"
                >
                  <TbBrandLinkedin className="hover:text-accent transition-colors duration-300" />
                </a>
                <a
                  href={t("footer.social-links.instagram")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-3xl md:text-5xl text-bold text-neutral"
                >
                  <TbBrandInstagram className="hover:text-accent transition-colors duration-300" />
                </a>
                <a
                  href={t("footer.social-links.facebook")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-3xl md:text-5xl text-bold text-neutral"
                >
                  <FaFacebook className="hover:text-accent transition-colors duration-300" />
                </a>
              </div>
                <p className="max-w-[90%] text-center md:hidden justify-self-center self-center text-s my-2 md:text-xl lg:hidden font-ns">

              {t("footer.slogan")}
                </p>

            </div>
          </aside>
        </div>
        <p className="hidden md:block justify-self-center self-center text-s my-2 md:text-xl lg:hidden font-ns">
          {t("footer.slogan")}
        </p>
      </footer>
    </div>
  );
};

export default Footer;
