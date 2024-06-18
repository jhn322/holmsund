import React from "react";

// CSS
import styles from "../../styles/addon/SeparatorAddon.module.css";

const Separator = () => {
  return (
    <section>
      <div className={styles.separatorContainer}>
        <div className={styles.separatorFirst}></div>
      </div>
    </section>
  );
};

export default Separator;
