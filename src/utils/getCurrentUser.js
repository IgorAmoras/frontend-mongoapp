export default function getUser() {return JSON.parse(window.localStorage.getItem('user'))}
export function setUser(user){
  const stringfied =  JSON.stringify(user)
  window.localStorage.setItem('user', stringfied)
}