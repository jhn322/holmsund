import { useRef, useEffect, useState } from "react";
import styles from "../styles/Spotlight.module.css";

// Images
import cardImage1 from "../assets/spotlight1.jpg";
import cardImage2 from "../assets/spotlight2.jpg";
import cardImage3 from "../assets/spotlight3.jpg";
import cardImage4 from "../assets/spotlight4.jpg";
import cardImage5 from "../assets/spotlight5.jpg";
import cardImage6 from "../assets/spotlight6.jpg";
import cardImage7 from "../assets/spotlight7.jpg";
import cardImage8 from "../assets/spotlight8.jpg";

const Spotlight = () => {
  const spotlightContainerRef = useRef(null);
  const [totalCardsHeight, setTotalCardsHeight] = useState(0);

  useEffect(() => {
    const calculateTotalHeight = () => {
      if (spotlightContainerRef.current) {
        const totalHeight = Array.from(
          spotlightContainerRef.current.querySelectorAll(
            `.${styles.spotlightCard}`
          )
        ).reduce((acc, card) => acc + card.offsetHeight, 0);
        setTotalCardsHeight(totalHeight);
      }
    };

    const handleScroll = () => {
      if (!spotlightContainerRef.current) return;

      const cards = spotlightContainerRef.current.querySelectorAll(
        `.${styles.spotlightCard}`
      );

      cards.forEach((card) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (
          cardTop < windowHeight * 0.75 &&
          !card.classList.contains(styles.fadeInSlideIn)
        ) {
          card.classList.add(styles.fadeInSlideIn);
        }
      });
    };

    calculateTotalHeight();
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      calculateTotalHeight();
      handleScroll();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section>
      <div ref={spotlightContainerRef} className={styles.spotlightContainer}>
        <div className={styles.spotlightInner}>
          <div className={styles.spotlightTitle}>
            <h2>Upptäck Holmsund</h2>
          </div>
          <div className={styles.spotlightCardContainer}>
            {/* Image 1 */}
            <div className={styles.spotlightCard}>
              <div
                className={styles.cardImage}
                style={{ backgroundImage: `url(${cardImage1})` }}
              >
                <div className={styles.cardOverlay}>
                  <h3>En längre titel</h3>
                </div>
              </div>
            </div>

            <div className={styles.stackedImagesContainer}>
              {/* Image 2 */}
              <div className={styles.spotlightCard}>
                <div
                  className={styles.cardImage}
                  style={{ backgroundImage: `url(${cardImage2})` }}
                >
                  <div className={styles.cardOverlay}>
                    <h3>Saker man kan göra</h3>
                  </div>
                </div>
              </div>
              {/* Image 3 */}
              <div
                className={`${styles.spotlightCard} ${styles.thirdSpotlightCard}`}
              >
                <div
                  className={styles.cardImage}
                  style={{ backgroundImage: `url(${cardImage3})` }}
                >
                  <div className={styles.cardOverlay}>
                    <h3>Aqua Arena</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Image 4 */}
            <div
              className={`${styles.spotlightCard} ${styles.fourthSpotlightCard}`}
            >
              <div
                className={styles.cardImage}
                style={{ backgroundImage: `url(${cardImage4})` }}
              >
                <div className={styles.cardOverlay}>
                  <h3>Golfbana</h3>
                </div>
              </div>
            </div>

            <div className={styles.spotlightSecondTitle}>
              <h2>Upptäck Mer</h2>
            </div>

            {/* Image 5 */}
            <div className={styles.spotlightCard}>
              <div
                className={styles.cardImage}
                style={{ backgroundImage: `url(${cardImage5})` }}
              >
                <div className={styles.cardOverlay}>
                  <h3>Nästa ställe</h3>
                </div>
              </div>
            </div>

            <div className={styles.stackedImagesContainer}>
              {/* Image 6 */}
              <div className={styles.spotlightCard}>
                <div
                  className={styles.cardImage}
                  style={{ backgroundImage: `url(${cardImage6})` }}
                >
                  <div className={styles.cardOverlay}>
                    <h3>Någonstans där</h3>
                  </div>
                </div>
              </div>
              {/* Image 7 */}
              <div
                className={`${styles.spotlightCard} ${styles.seventhSpotlightCard}`}
              >
                <div
                  className={styles.cardImage}
                  style={{ backgroundImage: `url(${cardImage7})` }}
                >
                  <div className={styles.cardOverlay}>
                    <h3>Ett spännande ställe</h3>
                  </div>
                </div>
              </div>
            </div>
            <div
              /* Image 8 */
              className={`${styles.spotlightCard} ${styles.lastSpotlightCard}`}
            >
              <div
                className={styles.cardImage}
                style={{ backgroundImage: `url(${cardImage8})` }}
              >
                <div className={styles.cardOverlay}>
                  <h3>SISTA STÄLLET</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Spotlight;
