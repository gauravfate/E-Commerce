async function fetchData(input, init) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.message;
        throw Error(errorMessage);
    }
}

// register User
async function registerUser(data) {
    const response = await fetchData("/api/v1/users/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

// login User
async function loginUser(data) {
    const response = await fetchData("/api/v1/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

async function logoutUser() {
    const response = await fetchData("/api/v1/users/logout", {
        method: "POST",
    });

    return response.json();
}

const fetchUserDetails = async () => {
        const response = await fetchData("/api/v1/users/get-user", {
            method: "GET",
        });

        return response.json();
};

export { registerUser, loginUser, logoutUser, fetchUserDetails };
