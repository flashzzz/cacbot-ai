

export const getUser = () => {
    const username = localStorage.getItem("username");
    const access_token = localStorage.getItem("token");
    return { username, access_token };
}