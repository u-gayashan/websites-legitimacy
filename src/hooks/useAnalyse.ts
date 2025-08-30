import { useEffect, useState } from "react";
// import { initiateAnalyse } from "~services/analyseService";

export const useAnalyse = (isOpen: boolean) => {
    const [sslData, setSslStatus] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        const ws = new WebSocket("wss://tortoise-unbiased-beetle.ngrok-free.app/analyze");
        const hostname = window.location.hostname;
        const normalizeHostname = (url: string) => {
            if (!url) return "";
            return url
                .toLowerCase()
                .replace(/^https?:\/\//, "") // remove http/https
                .replace(/^www\./, "")
                .replace(/\/.*$/, "");       // remove trailing paths
        };

        // .replace(/^www\./, "")       // remove www

        const cleanHost = normalizeHostname(hostname);

        ws.onopen = () => {
            console.log("WebSocket connected");
            setIsLoading(true);

            // send request to backend
            ws.send(JSON.stringify({ website_url: cleanHost }));
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log(message);

            if (message.step === "ssl_status") {
                setSslStatus(message.data);
            }

            if (message.step === "analysis") {
                setAnalysis(message.data);
                setIsLoading(false);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket closed");
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    }, [isOpen]);

    return { sslData, analysis, isLoading };
};
