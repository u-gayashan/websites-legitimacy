// export const initiateAnalyse = async (hostname: string) => {
//     try {
//         const response = await fetch('https://tortoise-unbiased-beetle.ngrok-free.app/analyze', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 website_url: hostname
//             })
//         });

//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//         return await response.json();
//     } catch (error) {
//         console.error("Error analysing:", error);
//         throw error;
//     }
// }

// import { useEffect, useState } from "react";

// export const initiateAnalyse = (hostname: string) => {
//     const [sslStatus, setSslStatus] = useState(null);
//     const [analysis, setAnalysis] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         const ws = new WebSocket("wss://tortoise-unbiased-beetle.ngrok-free.app/analyze");

//         ws.onopen = () => {
//             console.log("WebSocket connected");
//             setIsLoading(true);

//             // send request to backend
//             ws.send(JSON.stringify({ website_url: hostname }));
//         };

//         ws.onmessage = (event) => {
//             const message = JSON.parse(event.data);

//             if (message.step === "ssl_status") {
//                 setSslStatus(message.data);   // comes first
//             }

//             if (message.step === "analysis") {
//                 setAnalysis(message.data);   // comes second
//                 setIsLoading(false);
//             }
//         };

//         ws.onclose = () => {
//             console.log("WebSocket closed");
//         };

//         ws.onerror = (error) => {
//             console.error("WebSocket error:", error);
//         };

//         return () => ws.close();
//     }, [hostname, isOpen]);

//     return { sslStatus, analysis, isLoading };
// };
