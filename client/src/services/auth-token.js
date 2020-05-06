export default function auth() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: 'Bearer ' + user.token, accept: 'application/json', };
  } else {
    return {};
  }
}
