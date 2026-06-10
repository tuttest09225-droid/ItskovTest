import { Link, useLocation } from "react-router";
import { FiPhoneCall, FiMail } from "react-icons/fi";
import {
  TbBrandLinkedin,
  TbBrandFacebook,
  TbBrandInstagram,
} from "react-icons/tb";
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
        <div className="flex flex-row justify-between w-full px-1 md:px-4 mt-4">
          <div className="aspect-[3/1] md:max-w-[240px] lg:max-w-[320px] min-w-[120px] self-center">
            <Link to="/">
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
          </div>
          <aside className="self-center flex flex-col justify-around md:gap-2">
            <div className="flex flex-col gap-1 sm:gap-2 md:gap-3 justify-center">
              <p className="flex flex-row text-center items-center text-xs md:text-xl lg:text-3xl indent-2 justify-center font-pf">
                <FiPhoneCall className="text-neutral text-lg md:text-2xl" />
                {t("footer.phone")}
              </p>
              <p className="flex flex-row text-center items-center text-xs md:text-xl lg:text-3xl indent-2 justify-center">
                <FiMail className="text-neutral text-lg md:text-2xl" />
                <a href={`mailto:${email}`} className="font-pf">
                  {email}
                </a>
              </p>
            </div>
            <p className="hidden lg:block md:text-xl justify-self-center mb-4 self-center">
              {t("footer.slogan")}
            </p>
          </aside>
          <aside className="self-center">
            <div className="grid grid-flow-col sm:gap-1 md:gap-4">
              <a
                href={t("footer.social-links.linkedin")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-3xl md:text-5xl text-bold text-neutral"
              >
                <TbBrandLinkedin className="hover:text-accent transition-colors duration-300"/>
              </a>
              <a
                href={t("footer.social-links.facebook")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-3xl md:text-5xl text-bold text-neutral"
              >
                <TbBrandFacebook className="hover:text-accent transition-colors duration-300"/>
              </a>
              <a
                href={t("footer.social-links.instagram")}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-3xl md:text-5xl text-bold text-neutral"
              >
                <TbBrandInstagram className="hover:text-accent transition-colors duration-300"/>
              </a>
            </div>
          </aside>
        </div>
        <p className="justify-self-center self-center text-s my-2 md:text-xl lg:hidden font-ns">
          {t("footer.slogan")}
        </p>
      </footer>
    </div>
  );
};

export default Footer;
