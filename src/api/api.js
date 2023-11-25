/** @format */

import { useMutation, useQuery, useQueryClient } from "react-query";
const BASE = import.meta.env.VITE_BASE_API;

// get all

/**
 * Fetches data from the specified URL with optional filters and pagination.
 * @param {Object} options - The options object.
 * @param {string} options.key - The key for the query cache.
 * @param {string} options.url - The URL to fetch data from.
 * @param {number} [options.isPage] - The page number for pagination.
 * @param {Object} [options.filters] - The filters to apply to the data.
 * @param {string} options.token - The authorization token.
 * @returns {Object} - The query result object.
 */

export const useGetFetch = ({ key, url, isPage, filters, token }) => {
  let endPoint;

  if (isPage) {
    endPoint = `${url}?page=${isPage}`;
  } else {
    endPoint = `${url}?`;
  }

  if (filters) {
    for (const key in filters) {
      if (key && filters[key]) {
        endPoint += `&${key}=${filters[key]}`;
      }
    }
  }

  const get = async () => {
    const response = await fetch(`${BASE}${endPoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch get all.");
    }
    return response.json();
  };

  return useQuery(key, get, { staleTime: 9999999, retryDelay: 9999999 });
};

// get one
export const useFetchById = ({ key, url, userId, token }) => {
  const fetchById = async () => {
    const response = await fetch(`${BASE}${url}/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.json();
  };

  return useQuery(key, fetchById, { staleTime: 9999999 });
};

// create
export const useCreateFetch = ({ key, url, token, isJSON = true }) => {
  const queryClient = useQueryClient();

  const createUser = async (data) => {
    console.log("🚀 ~ file: api.js:64 ~ createUser ~ data:", data);
    console.log("🚀 ~ file: api.js:64 ~ createUser ~ isJSON:", isJSON);
    const response = await fetch(`${BASE}${url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return isJSON ? response.json() : response;
  };

  const mutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(key);
    },
  });

  return mutation;
};

export const useCreateForm = ({ key, url, token }) => {
  const queryClient = useQueryClient();

  const createUser = async (data) => {
    const response = await fetch(`https://devapi.wtfup.me${url}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    return response.json();
  };

  const mutation = useMutation(createUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(key);
    },
  });

  return mutation;
};

// update one
export const useUpdateFetch = ({ key, url, token }) => {
  const queryClient = useQueryClient();

  const update = async ({ data, uid }) => {
    const response = await fetch(`${BASE}${url}/${uid}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  };

  const mutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries(key);
    },
  });

  return mutation;
};

// delete a user
export const useDeleteFetch = ({ key, url, token }) => {
  const queryClient = useQueryClient();

  const deleteUser = async ({ userId, body }) => {
    const response = await fetch(`${BASE}${url}/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Failed to delete");
    }

    return response.json();
  };

  const mutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(key);
    },
  });

  return mutation;
};
