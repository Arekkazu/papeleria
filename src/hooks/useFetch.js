import { useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    hasError: false,
  });

  useEffect(() => {
    getData(url);
  }, [url]);

  const getData = async (url) => {
    setLoading();
    const resp = await fetch(url);
    if (!resp.ok) {
      setData({
        data: null,
        isLoading: false,
        hasError: true,
      });
    }

    const data = await resp.json();
    setData({
      data,
      isLoading: false,
      hasError: false,
    });
  };
  const setLoading = () => {
    setData({
      data: null,
      isLoading: true,
      hasError: false,
    });
  };
  return {
    data: data.data,
    isLoading: data.isLoading,
    hasError: data.hasError,
  };
};
