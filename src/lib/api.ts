
const registerAPI = async (data: any) => {
    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error registering:', error);
    }
}
const loginAPI = async (data: any) => {
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error logging in:', error);
    }
}
export { registerAPI , loginAPI};