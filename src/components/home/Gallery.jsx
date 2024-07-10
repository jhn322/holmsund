import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { trackGalleryElementClick } from "../analytics/home";
import { RxChevronLeft, RxChevronRight, RxArrowRight } from "react-icons/rx";
import styles from "../../styles/home/Gallery.module.css";
import staticGalleryImage from "../../assets/gallery/staticGallery.jpg";
import galleryImage1 from "../../assets/gallery/gallery1.jpg";
import galleryImage2 from "../../assets/gallery/gallery2.jpg";
import galleryImage3 from "../../assets/gallery/gallery3.jpg";
import galleryImage4 from "../../assets/gallery/gallery4.jpg";
import galleryCircle from "../../assets/other/circle.png";

const Gallery = () => {
  const images = [
    {
      url: galleryImage1,
      title: "Badställe",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et libero vestibulum, sollicitudin metus nec, porttitor sem.",
      link: "/galleri-1",
    },
    {
      url: galleryImage2,
      title: "Skog",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et libero vestibulum, sollicitudin metus nec, porttitor sem.",
      link: "/galleri-2",
    },
    {
      url: galleryImage3,
      title: "Vattentorn",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et libero vestibulum, sollicitudin metus nec.",
      link: "/galleri-3",
    },
    {
      url: galleryImage4,
      title: "Storsjöskolan",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et libero vestibulum.",
      link: "/galleri-4",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [deltaX, setDeltaX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const initialTouch = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToPrevSlide = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    setDeltaX(0);
  };

  const goToNextSlide = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    setDeltaX(0);
  };

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    initialTouch.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    const deltaX = touch.clientX - initialTouch.current.x;
    const deltaY = touch.clientY - initialTouch.current.y;

    // Check if horizontal swipe is dominant
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      event.preventDefault();
      setIsSwiping(true);
      setDeltaX(deltaX);
    } else {
      setIsSwiping(false);
    }
  };

  const handleTouchEnd = () => {
    if (isSwiping) {
      if (deltaX < -50) {
        goToNextSlide();
      } else if (deltaX > 50) {
        goToPrevSlide();
      }
    }
    setDeltaX(0);
    setIsSwiping(false);
  };

  // Prevent nav buttons to trigger hover on other elements
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleNavMouseEnter = () => setIsNavHovered(true);
  const handleNavMouseLeave = () => setIsNavHovered(false);

  // Google Analytics
  const trackElementClickEvent = (elementType, elementText, elementUrl) => {
    trackGalleryElementClick(elementType, elementText, elementUrl);
  };

  return (
    <section>
      <div className={styles.galleryContainer}>
        <figure className={styles.galleryImageContainer}>
          <div className={styles.galleryImageInner}>
            <article
              className={styles.galleryImage}
              style={{ backgroundImage: `url(${staticGalleryImage})` }}
            >
              <div
                className={styles.galleryCircle}
                style={{ backgroundImage: `url(${galleryCircle})` }}
              ></div>
              <h2 className={styles.galleryTitle}>
                Uppfriskad & <br /> Förnyad
              </h2>
            </article>
          </div>
        </figure>
        <section className={styles.galleryCarousel}>
          <article
            className={`${styles.carouselContainer} ${
              isHovered && !isNavHovered ? styles.hover : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className={styles.carouselInner}>
              <div
                className={styles.slider}
                style={{
                  transform: `translateX(calc(-${
                    currentIndex * 100
                  }% + ${deltaX}px))`,
                  transition: isSwiping ? "none" : "transform 0.3s ease", // Disable transition during swipe
                }}
              >
                {images.map((image, index) => (
                  <figure key={index} className={styles.slide}>
                    <NavLink
                      to={image.link}
                      onClick={() =>
                        trackElementClickEvent(
                          "carousel_img",
                          image.title,
                          image.link
                        )
                      }
                    >
                      <img src={image.url} alt={`Slide ${index}`} />
                    </NavLink>
                  </figure>
                ))}
              </div>
              <nav
                className={styles.carouselNav}
                onMouseEnter={handleNavMouseEnter}
                onMouseLeave={handleNavMouseLeave}
              >
                <span className={styles.navPrev} onClick={goToPrevSlide}>
                  <RxChevronLeft strokeWidth={0.8} />
                </span>
                <span className={styles.navNext} onClick={goToNextSlide}>
                  <RxChevronRight strokeWidth={0.8} />
                </span>
              </nav>
            </div>
            <section className={styles.carouselText}>
              <NavLink to={images[currentIndex].link}>
                <header className={styles.hoverContainer}>
                  <h2>{images[currentIndex].title}</h2>
                  <p>{images[currentIndex].text}</p>
                  <div className={styles.linkContainer}>
                    <a
                      className={styles.carouselLink}
                      href={images[currentIndex].link}
                      onClick={() =>
                        trackElementClickEvent(
                          "carousel_link",
                          "Läs Mer...",
                          images[currentIndex].link
                        )
                      }
                    >
                      Läs Mer...
                    </a>
                  </div>
                  <div className={styles.arrowContainer}>
                    <a
                      href={images[currentIndex].link}
                      onClick={() =>
                        trackElementClickEvent(
                          "arrow_icon",
                          "Arrow Icon",
                          images[currentIndex].link
                        )
                      }
                    >
                      <RxArrowRight className={styles.arrowIcon} />
                    </a>
                  </div>
                </header>
              </NavLink>
            </section>
          </article>
          <div className={styles.dotPagination}>
            {images.map((_, index) => (
              <span
                key={index}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.active : ""
                }`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Gallery;
