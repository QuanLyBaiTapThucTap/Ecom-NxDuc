import { useEffect } from "react";

import { useLocation } from "react-router-dom";

import { analyticsService } from "@/Services/analyticsService";

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    analyticsService.track("PAGE_VIEW", {
      path: location.pathname + location.search,
    });
  }, [location.pathname, location.search]);

  return null;
};

export default AnalyticsTracker;
