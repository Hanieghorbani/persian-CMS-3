function isLogin(adminToken){
    let getPass = localStorage.getItem('pass')
  if (adminToken == getPass) {
    return true
  }else{
    return false
  }
}

export default isLogin