import { useState } from 'react';
import Box from '@mui/material/Box';
import ImageData from '../../mocks/imageData.json';
import styles from './ImageList.module.css';

export default function MasonryImageList() {
  const [itemData] = useState(ImageData);

  const calculateTallImagePlacement = (index: number) => {
    const isTall = index === 0 || (index > 0 && (index + 1) % 3 === 0);

    const rowNumber = Math.floor((index + (index > 0 ? 2 : 0)) / 3);
    const isLeftColumn = rowNumber % 2 === 0;

    if (isTall) {
      return isLeftColumn ? styles.tallImageLeft : styles.tallImageRight;
    }
    return '';
  };

  return (
    <Box sx={{ width: '100%', height: '90%', overflowY: 'auto', padding: 2 }}>
      <div className={styles.imageGrid}>
        {itemData.map((item, index) => (
          <div
            key={item.img}
            className={`${styles.imageGridItem} ${calculateTallImagePlacement(index)}`}
            style={{ gridColumn: index % 3 === 1 ? 'span 1' : 'span 1' }}
          >
            <img
              src={item.img}
              srcSet={item.img}
              alt={item.title}
              loading="eager"
              style={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '4px',
              }}
            />
          </div>
        ))}
      </div>
    </Box>
  );
}
