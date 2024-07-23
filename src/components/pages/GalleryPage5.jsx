import { useEffect } from "react";
import { setDocumentTitle } from "../utils/setDocumentTitle";
import PhotoGridAddon from "../addon/PhotoGridAddon";
import LayoutPage from "../layouts/LayoutPage";
import styles from "../../styles/pages/AllPage.module.css";
import backgroundImage from "../../assets/gallery/galleryPage5.jpg";
import { galleryPhotos5 } from "../data/PhotoGridSet";

const GalleryPage5 = () => {
  useEffect(() => {
    setDocumentTitle("Galleri-5");
  }, []);

  return (
    <LayoutPage headerTitle="Järnväg" headerBackgroundImage={backgroundImage}>
      <article className={styles.container}>
        <h2 className={styles.title}>Järnväg</h2>
        <p className={styles.text}>
          Holmsunds järnväg byggdes under slutet av 1800-talet, med byggstart år
          1899 och färdigställande 1901, för att förbättra
          transportmöjligheterna i regionen. Den blev snabbt en viktig länk för
          både person- och godstrafik mellan Holmsund och Umeå.
        </p>
        <PhotoGridAddon photos={galleryPhotos5} />
      </article>
    </LayoutPage>
  );
};

export default GalleryPage5;
