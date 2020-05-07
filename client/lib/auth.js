const auth = {
  isAuthenticated: false,
  authenticate(cb, passphrase) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(passphrase)
    };
    fetch('/api/auth', req)
      .then(res => {
        if (res.status === 403) return;
        if (res.status === 200) auth.isAuthenticated = true;
      });
    setTimeout(cb, 100);
  },
  signout(cb) {
    auth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

export default auth;
