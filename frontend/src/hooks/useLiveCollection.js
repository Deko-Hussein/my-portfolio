import { useEffect, useRef, useState } from "react";
import API from "../services/api";

const REFRESH_INTERVAL_MS = 10000;

function useLiveCollection(endpoint) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasResolvedInitialFetch = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const fetchItems = async ({ showLoader = false } = {}) => {
      if (showLoader && isMounted) {
        setLoading(true);
      }

      try {
        const response = await API.get(endpoint);

        if (!isMounted) {
          return;
        }

        setItems(response.data.data || []);
        hasResolvedInitialFetch.current = true;
      } catch (error) {
        console.error(`Failed to fetch ${endpoint}:`, error);

        if (!isMounted || hasResolvedInitialFetch.current) {
          return;
        }

        setItems([]);
      } finally {
        if (showLoader && isMounted) {
          setLoading(false);
        }
      }
    };

    fetchItems({ showLoader: true });

    const handleFocus = () => {
      fetchItems();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchItems();
      }
    };

    // Keep the public portfolio in sync with dashboard updates without a manual refresh.
    const intervalId = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        fetchItems();
      }
    }, REFRESH_INTERVAL_MS);

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [endpoint]);

  return { items, loading };
}

export default useLiveCollection;
