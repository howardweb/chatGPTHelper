import React, { FunctionComponent, ReactNode } from 'react'
import styles from '../../styles/search/categoryButton.module.css'

export const bgColor = {
  green: "#12b981",
  blue: "#00BAFF",
  red: "#FF2519",
  orange: "#f7b759"
}


interface CategoryButtonProps {
    label: string
    Icon?: ReactNode | undefined
}

const getRandomColor = () => {
  const colorKeys = Object.keys(bgColor);
  const randomColorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)] as keyof typeof bgColor;
  return bgColor[randomColorKey];
};

const CategoryButton: FunctionComponent<CategoryButtonProps> = ({label, Icon})=> {

  const randomBgColor = getRandomColor()

    // Define the opacity level (0.5 means 50% opacity, you can adjust this)
    const opacity = 0.1;

    // Use rgba to set the background color with opacity
    const backgroundStyle = {
      backgroundColor : `rgba(${parseInt(randomBgColor.slice(1, 3), 16)}, ${parseInt(randomBgColor.slice(3, 5), 16)}, ${parseInt(randomBgColor.slice(5, 7), 16)}, ${opacity})`
    };
  


  return (
    <button className={styles.button}>
      <div className={styles.icon__container} style={backgroundStyle}>
          {Icon && <span className={styles.button__icon} style={{color: randomBgColor}}>{Icon}</span>}
      </div>
      <div className={styles.text__container}>
          {label}
      </div>
    </button>
  )
}

export default CategoryButton
