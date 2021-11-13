console.log("apps.js");
const links = document.querySelectorAll('.link')

links.forEach(link => {
  link.addEventListener('click', () => {
    links.forEach(elto => elto.classList.remove('active'));
    link.classList.add('active');
  })
});

// toggle button
const toggleBtn = document.querySelector('.toggle-btn');
const linkContainer = document.querySelector('.links-container')

toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('active');
  linkContainer.classList.toggle('show');
});


// email
const contactBtn = document.querySelector('.contact-btn');
const firstName = document.querySelector('.first-name');
const lastName = document.querySelector('.last-name');
const email = document.querySelector('.email');
const msg = document.querySelector('.message');


contactBtn.addEventListener('click', () =>{
  if(email.value.length && msg.value.length){
    fetch('/mail', {
      method: 'post',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({
        firstname: firstName.value,
        lastname: lastName.value,
        email: email.value,
        msg: msg.value,
      })
    })
    .then(res => res.json())
    .then(data => {
      alert(data);
    })
  }else{
    alert('Email and Message are required.')
  }
})
