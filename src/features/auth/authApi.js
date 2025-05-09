import API from '../../api/axios';

export const login = async (data) => {
    const response = await API.post('/AdminAccount/Login', data);
    return response.data;
};

export const refreshToken = async (accessToken, refreshToken) => {
    const response = await API.post('/Account/RefreshToken', {
        AccessToken: accessToken,
        RefreshToken: refreshToken,
    });
    return response.data;
};
