// import { useEffect } from 'react';
// import styles from './AnimatedBackground.module.css';

// const AnimatedBackground = () => {
//   useEffect(() => {
//     // JavaScript to dynamically style elements, if needed
//     document.querySelectorAll(`.${styles.rect}`).forEach(element => {
//       element.style.setProperty('--x', `${Math.random() * 100}%`);
//       element.style.setProperty('--y', `${Math.random() * 100}%`);
//       element.style.setProperty('--opacity', Math.random());

//       setInterval(() => {
//         element.style.setProperty('--opacity', Math.random());
//         element.style.setProperty('--x', `${Math.random() * 100}%`);
//         element.style.setProperty('--y', `${Math.random() * 100}%`);
//       }, 5000); // Adjust timing as needed
//     });
//   }, []);

//   return (
//     <div className={styles.drawings}>
//       <div className={`${styles.rect} ${styles.background}`} style={{ '--width': '240px', '--height': '48px', '--color': 'rgba(126,135,40,0.2)', '--opacity': '0.00001' }}></div>
//       <div className={`${styles.rect} ${styles.background}`} style={{ '--width': '72px', '--height': '48px', '--color': 'rgba(171,148,63,0.2)', '--opacity': '0.16252' }}>
//         <svg width="72" height="48" className={styles.svg}>
//           <path d="M 24 24 Q 36 36 48 48" stroke="var(--stroke, #dedede)" fill="none" stroke-width="1"></path>
//         </svg>
//       </div>
//       {/* Add more elements as needed */}
//     </div>
//   );
// };

// export default AnimatedBackground;
