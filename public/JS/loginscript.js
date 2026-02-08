const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', async () => {
    const form = document.getElementById('loginForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const token = result.jwt_token || result.token;

        if (!token) {
            alert("Login fallido");
            return;
        }

        localStorage.setItem('token', token);
        window.location.href = '/';
    } catch (err) {
        alert("Error de conexión");
    }
});
