const username = document.querySelector('#user');
const pass     = document.querySelector('#pass');

document.querySelector('#login').addEventListener('click', (e) => {
    e.preventDefault();
    if(username.value === 'admin' && pass.value ==='bertin123') {
      return  window.location='admin_dashboard.html';
    }else if(username.value === 'mentor' && pass.value ==='bertin123'){
        return  window.location='mentor.html';

    }
    return window.location='userOperation.html';
});