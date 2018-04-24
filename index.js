document.addEventListener('DOMContentLoaded', function(event) {
  //ES6 Fetch call
  fetch('https://randomuser.me/api/')
    .then(function(response) {
      return response.json();
    })
    .then(function(myData) {
      console.log(myData.results[0]);

      let fname = singleItem(myData.results[0].name.first);
      let fullname = arrayFunc(myData.results[0].name);
      let city = singleItem(myData.results[0].location.city);
      let state = singleItem(myData.results[0].location.state);
      let address = `${myData.results[0].location.street} ${city}, ${state} ${
        myData.results[0].location.postcode
      }`;
      //Name
      let name = arrayFunc(myData.results[0].name);
      namefunc(name);

      //Picture
      document.getElementById('profile-pic').src =
        myData.results[0].picture.large;

      //Info
      document.getElementById(
        'info-paragraph'
      ).innerHTML = `Hi! My name is ${fname}! I'm so glad you visited this page! If you're ever in ${city} let's go sightseeing!`;

      //setup the icon functionality
      iconSetup(address, myData.results[0]);

      //profile icon
      document
        .getElementById('icon1')
        .addEventListener(
          'click',
          () =>
            (document.getElementById(
              'info-paragraph'
            ).innerHTML = `Hi! My name is ${fname}! I'm so glad you visited this page! If you're ever in ${city} let's go sightseeing!`)
        );
    });

  document.getElementById('formName').addEventListener('blur', function() {
    if (!this.value) {
      document.getElementById('nameError').style.display = 'block';
    } else {
      document.getElementById('nameError').style.display = 'none';
    }
  });
  document.getElementById('formEmail').addEventListener('blur', function() {
    if (!this.value) {
      document.getElementById('emailError').style.display = 'block';
    } else {
      document.getElementById('emailError').style.display = 'none';
    }
  });
  document.getElementById('formQuestion').addEventListener('blur', function() {
    if (!this.value) {
      document.getElementById('questionError').style.display = 'block';
    } else {
      document.getElementById('questionError').style.display = 'none';
    }
  });

  document.getElementById('close').addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'none';
  });
  window.addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'none';
  });

  document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let modal = document.getElementById('myModal');
    let span = document.getElementsByClassName('close')[0];
    modal.style.display = 'block';
  });
});

function arrayFunc(data) {
  return Object.values(data)
    .map(name => name[0].toUpperCase() + name.slice(1))
    .join(' ');
}

function singleItem(data) {
  return data[0].toUpperCase() + data.slice(1);
}

function namefunc(name) {
  console.log(name);
  document.getElementById('name').innerHTML = name;
}

function iconSetup(address, data) {
  document.getElementById('icon2').addEventListener('click', function() {
    document.getElementById('info-paragraph').innerHTML = `Address: ${address}`;
  });

  document.getElementById('icon3').addEventListener('click', function() {
    document.getElementById('info-paragraph').innerHTML = `Email: ${
      data.email
    }`;
  });

  document.getElementById('icon4').addEventListener('click', function() {
    document.getElementById('info-paragraph').innerHTML = `Phone: ${
      data.phone
    } Cell: ${data.cell}`;
  });
  let birthday = data.dob.split(' ');
  let format = birthday[0].split('-');

  document.getElementById('icon5').addEventListener('click', function() {
    document.getElementById('info-paragraph').innerHTML = `Birthday: ${
      format[1]
    }/${format[2]}/${format[0]}`;
  });

  document.getElementById('icon6').addEventListener('click', function() {
    document.getElementById(
      'info-paragraph'
    ).innerHTML = `(Secret Keys) Username: ${data.login.username} Password: ${
      data.login.password
    } Salt: ${data.login.salt}`;
  });
}
