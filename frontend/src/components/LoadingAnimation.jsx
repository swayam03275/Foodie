// import React from 'react';
// import './LoadingAnimation.css';

// const LoadingAnimation = () => {
//   return (
//     <div className="loading-container">
//       <div className="loading-content">
//         {/* Background elements */}
//         <div className="road"></div>
//         <div className="clouds">
//           <div className="cloud cloud-1"></div>
//           <div className="cloud cloud-2"></div>
//           <div className="cloud cloud-3"></div>
//         </div>
        
//         {/* Delivery scooter */}
//         <div className="scooter-container">
//           <div className="scooter">
//             {/* Delivery person */}
//             <div className="delivery-person">
//               <div className="helmet"></div>
//               <div className="body"></div>
//               <div className="arms">
//                 <div className="arm arm-left"></div>
//                 <div className="arm arm-right"></div>
//               </div>
//               <div className="legs">
//                 <div className="leg leg-left"></div>
//                 <div className="leg leg-right"></div>
//               </div>
//             </div>
            
//             {/* Scooter body */}
//             <div className="scooter-body">
//               <div className="handlebar"></div>
//               <div className="main-body"></div>
//               <div className="seat"></div>
//               <div className="delivery-box"></div>
//             </div>
            
//             {/* Wheels */}
//             <div className="wheels">
//               <div className="wheel wheel-front">
//                 <div className="wheel-inner"></div>
//                 <div className="spokes">
//                   <div className="spoke"></div>
//                   <div className="spoke"></div>
//                   <div className="spoke"></div>
//                   <div className="spoke"></div>
//                 </div>
//               </div>
//               <div className="wheel wheel-back">
//                 <div className="wheel-inner"></div>
//                 <div className="spokes">
//                   <div className="spoke"></div>
//                   <div className="spoke"></div>
//                   <div className="spoke"></div>
//                   <div className="spoke"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {/* Speed lines */}
//           <div className="speed-lines">
//             <div className="speed-line speed-line-1"></div>
//             <div className="speed-line speed-line-2"></div>
//             <div className="speed-line speed-line-3"></div>
//           </div>
//         </div>
        
//         {/* App name in sky */}
//         <div className="app-name">
//           <h1>Tomato.</h1>
//           <p>serving deliciousness</p>
//         </div>
        
//         {/* Loading text */}
//         <div className="loading-text">
//           <h2>Delivering your order...</h2>
//           <div className="loading-dots">
//             <span></span>
//             <span></span>
//             <span></span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoadingAnimation;



import React from 'react';
import './LoadingAnimation.css';

const LoadingAnimation = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        {/* Background elements */}
        <div className="road"></div>
        <div className="clouds">
          <div className="cloud cloud-1"></div>
          <div className="cloud cloud-2"></div>
          <div className="cloud cloud-3"></div>
        </div>

        {/* Delivery scooter */}
        <div className="scooter-container">
          <div className="scooter">
            {/* Side-view Delivery Person */}
            <div className="delivery-person side-view">
              <div className="helmet-side"></div>
              <div className="face-profile"></div>
              <div className="body-side"></div>
              <div className="side-arm"></div>
              <div className="side-leg"></div>
              <div className="side-backpack"></div>
            </div>

            {/* Scooter body */}
            <div className="scooter-body">
              <div className="handlebar"></div>
              <div className="main-body"></div>
              <div className="seat"></div>
              <div className="delivery-box"></div>
            </div>

            {/* Wheels */}
            <div className="wheels">
              <div className="wheel wheel-front">
                <div className="wheel-inner"></div>
                <div className="spokes">
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                </div>
              </div>
              <div className="wheel wheel-back">
                <div className="wheel-inner"></div>
                <div className="spokes">
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                  <div className="spoke"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Speed lines */}
          <div className="speed-lines">
            <div className="speed-line speed-line-1"></div>
            <div className="speed-line speed-line-2"></div>
            <div className="speed-line speed-line-3"></div>
          </div>
        </div>

        {/* App name in sky */}
        <div className="app-name">
          <h1>Tomato.</h1>
          <p>serving deliciousness</p>
        </div>

        {/* Loading text */}
        <div className="loading-text">
          <h2>Delivering your order...</h2>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
