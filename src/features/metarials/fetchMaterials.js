import API from '../../api/axios';

const getEncodedFilter = (skip, limit = 20) => {
    const filter = {
        Skip: skip,
        Limit: limit,
        Types: [1],
    };
    return btoa(JSON.stringify(filter));
};

export const fetchMaterials = async ({ pageParam = 0, token }) => {
    const filter = getEncodedFilter(pageParam);
    const response = await API.get(`/Materials/GetAll/?filter=${filter}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return {
        ...response.data,
        nextSkip: pageParam + 20,
    };
};
