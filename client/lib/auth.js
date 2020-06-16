const auth = {
  isAuthenticated: false,
  authenticate(callback, passphrase) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(passphrase)
    };
    fetch('/api/auth', req)
      .then(res => {
        if (res.status === 401) return;
        if (res.status === 200) auth.isAuthenticated = true;
      });
    setTimeout(callback, 1000);
  },
  signout(callback) {
    auth.isAuthenticated = false;
    setTimeout(callback, 100);
  }
};

export default auth;
