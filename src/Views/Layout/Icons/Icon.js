import { useState, useEffect } from 'react';
import { Skeleton } from 'primereact/skeleton';
import './Icons.css';
import 'primereact/resources/themes/saga-blue/theme.css';   // Choose your theme
import 'primereact/resources/primereact.min.css';           // PrimeReact styles
import 'primeicons/primeicons.css';                        // PrimeIcons

export default function Icon(props) {
  const [image, setImage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); // Track loading state

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await import(`../../../Assets/Icons/${props.name}.png`);
        setImage(response.default);
      } catch (err) {
        console.log("Unable to load icon");
      }
    };
    fetchImage();
  }, [props.name]);

  // Handle image load
  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={isLoaded ? `iconContainer` : `skeletonContainer`}>
      {!isLoaded && <Skeleton className='skeleton skeleton-mode' shape="circle" />} {/* Placeholder */}
      {image && (
        <img
          className={props.technologyIcon ? 'technologyIcon' : 'small'}
          src={image}
          alt="icon"
          onLoad={handleImageLoad}
          style={{ display: isLoaded ? 'block' : 'none' }} // Hide until loaded
        />
      )}
      {isLoaded && !props.technologyIcon && <p>{props.title}</p>}
    </div>
  );
}
