import localize from '../filters/localize.filter'
export default {
  logout: localize('Logout'),
  login: localize('FirstLogin'),
  'auth/user-not-found': localize('NoUserWithEmail'),
  'auth/wrong-password': localize('WrongPassword'),
  'auth/email-already-in-use': localize('EmailInUse')
}
