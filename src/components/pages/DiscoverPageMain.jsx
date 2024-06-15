import { useState, useEffect } from "react";
import DiscoverAddon from "../addon/DiscoverAddon";

// Components
import Layout from "../layouts/Layout";

// CSS
import styles from "../../styles/pages/DiscoverPageMain.module.css";

// Images
import headerBackgroundImage1 from "../../assets/header/header1.jpg";
import headerBackgroundImage2 from "../../assets/header/header2.jpg";
import headerBackgroundImage3 from "../../assets/header/header3.jpg";
import headerBackgroundImage4 from "../../assets/header/header4.jpg";

const DiscoverPageMain = () => {
  const headerImages = [
    headerBackgroundImage1,
    headerBackgroundImage2,
    headerBackgroundImage3,
    headerBackgroundImage4,
  ];

  const gridImages = [
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % headerImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [headerImages.length]);

  const gridItems = gridImages.map((image, index) => (
    <div className={styles.gridItem} key={index}>
      <img src={image} alt={`Image ${index}`} />
    </div>
  ));

  return (
    <Layout
      headerTitle="Discover Page"
      headerBackgroundImage={headerImages[currentImageIndex]}
    >
      <div className={styles.gridContainer}>{gridItems}</div>
      <DiscoverAddon />
    </Layout>
  );
};

export default DiscoverPageMain;
