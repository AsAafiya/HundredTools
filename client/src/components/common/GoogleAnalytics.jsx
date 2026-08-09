import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = "G-P546RHN3K1";

function GoogleAnalytics() {
    const location = useLocation();

    useEffect(() => {
        if (window.gtag) {
            window.gtag("config", GA_MEASUREMENT_ID, {
            page_path: location.pathname + location.search,
            });
        }
    }, [location]);

    return null;
}

export default GoogleAnalytics;