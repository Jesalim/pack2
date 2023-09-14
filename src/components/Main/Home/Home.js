// Import the necessary modules and components
import React from 'react'; // Import the React library
import layout from '@/styles/Layout.css'; // Import layout styles
import style from './Home.css' // Import Home component styles
// Create the Home component function
function Home() {
  return (
    // Create a section element with specified class names
    <section className={classNames([style.home], [layout.section])} id='home'>
      <div
        className={classNames(
          [style.home__container],
          [layout.container],
          [layout.grid]
        )}
      >
        {/* Use an imported SVG component */}
        <HomeImg
          className={classNames(
            [layout.svg__img],
            [layout.svg__color],
            [style.home__img]
          )}
        />
        <div className={[style.home__data]}>
          {/* Render a title element */}
          <h1 className={[style.home__title]}>{t('main.home.title')}</h1>
          {/* Render a description element */}
          <p className={[style.home__description]}>
            {t('main.home.description')}
          </p>
          {/* Render a link element */}
          <a href='#' className={[layout.button]}>
            {t('main.home.getStarted')}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home; // Export the Home component
