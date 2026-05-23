import { useState, useEffect } from 'react';
import { Skeleton } from 'primereact/skeleton';
import './Icons.css';

const ALLOWED_ICONS = new Set([
  'angular', 'aws', 'csharp', 'css', 'dbeaver', 'dotnet', 'firebase', 'github',
  'html', 'intellij', 'ionic', 'java', 'js', 'leetcode', 'linkedin', 'linkedinyellow',
  'logo-standard', 'mongo', 'mysql', 'nest', 'nodejs', 'oracle', 'postgres', 'postman',
  'python', 'react', 'sc-github', 'sc-linkedin', 'sc-twitter', 'spring', 'springboot',
  'sqlserver', 'twitter', 'vscode'
])

export default function Icon(props) {
  const [image, setImage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); // Track loading state

  useEffect(() => {
    if (!ALLOWED_ICONS.has(props.name)) return;
    const fetchImage = async () => {
      try {
        const response = await import(`../../../Assets/Icons/${props.name}.png`);
        setImage(response.default);
      } catch (err) {
        console.error("Unable to load icon:", props.name);
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
