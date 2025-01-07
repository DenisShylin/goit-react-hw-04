import axios from "axios";

const API_KEY = "kh0BFMTrgcYc6MM226sXIsT6t2xfDBEvqxU8VTpJo";
axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;

export const fetchImages = async (query, page = 1) => {
  try {
    const response = await axios.get("/search/photos", {
      params: {
        query,
        page,
        per_page: 12,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch images"
      );
    }
    throw error;
  }
};
