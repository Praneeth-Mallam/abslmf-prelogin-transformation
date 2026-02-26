// // components/Recaptcha.tsx
// 'use client';

// import { useRef } from 'react';
// import ReCAPTCHA from 'react-google-recaptcha';

// interface RecaptchaProps {
//   onVerify: (token: string | null) => void;
// }

// export default function Recaptcha({ onVerify }: RecaptchaProps) {
//   const recaptchaRef = useRef<ReCAPTCHA>(null);

//   const handleChange = (token: string | null) => {
//     onVerify(token);
//   };

//   const handleExpired = () => {
//     onVerify(null);
//   };

//   return (
//     <div className="recaptcha-container">
//       <ReCAPTCHA
//         ref={recaptchaRef}
//         sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
//         onChange={handleChange}
//         onExpired={handleExpired}
//         theme="light"
//         size="normal"
//       />
//     </div>
//   );
// }

