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

// get all Users for admin
export const getAddProduct = async () => {
    const response = await fetchData("/api/v1/admin/allUser", {
        method: "GET",
    });

    return response.json();
};

// register admin
export const createAdmin = async(data) => {
    const response = await fetchData("/api/v1/admin/register-admin", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    return response.json();
}