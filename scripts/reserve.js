(function (global) {
  var Application = function (Days, User) {
    return new Application.init(Days, User);
  }

  Application.prototype = {
    ChangeDays: function () {
      let Day1 = (this.Day1.checked) ? 350 : 0;
      let Day2 = (this.Day2.checked) ? 450 : 0;
      this.Data.Cost = ((Day1 + Day2) > 500) ? 750 : Day1 + Day2;
      document.getElementById('personCost').innerHTML = `$${this.Data.Cost}`;
      return;
    },

    Next: function () {
      if (this.Data.Cost === 0) {
        alert("Please choose atleast one day.");
        return;
      }
      this.Pointer2.classList.add('active');
      this.Step2.classList.add('active');
      this.Pointer1.classList.remove('active');
      this.Step1.classList.remove('active');
      return;
    },

    BackToDays: function () {
      this.Pointer1.classList.add('active');
      this.Step1.classList.add('active');
      this.Pointer2.classList.remove('active');
      this.Step2.classList.remove('active');
      return;
    },

    Register: function () {
      let postalCodeRegExp = new RegExp('^[A-Za-z][0-9][A-Za-z][ ][0-9][A-Za-z][0-9]$');
      if (!postalCodeRegExp.test(this.registerForm.postalcode.value)) {
        alert('There is some errors.');
        return;
      }

      let phoneNumberRegExp = new RegExp('^([0-9]{3}[-]|[(][0-9]{3}[)])?[0-9]{3}[-][0-9]{4}$');
      if (!phoneNumberRegExp.test(this.registerForm.phonenumber.value)) {
        alert('There is some errors.');
        return;
      }

      let Count = this.registerForm.number.value;
      if (Count === '' || Count < 1) {
        alert('Please enter number of registered users.');
        return;
      }


      this.Data.FirstName = this.registerForm.firstname.value;
      this.Data.LastName = this.registerForm.lastname.value;
      this.Data.Address = this.registerForm.address.value;
      this.Data.City = this.registerForm.city.value;
      this.Data.Province = this.registerForm.province.value;
      this.Data.PostalCode = this.registerForm.postalcode.value;
      this.Data.PhoneNumber = this.registerForm.phonenumber.value;
      this.Data.Email = this.registerForm.email.value;
      this.Data.Number = this.registerForm.number.value;

      let Days = (this.Data.Cost === 350) ?
        "Day 1" :
        (this.Data.Cost === 450) ?
        "Day 2" :
        "Both days";

      let Off = (this.Data.Number >= 5) ?
        (this.Data.Number * this.Data.Cost) * 0.1 :
        0;

      this.Data.TotalCost = (this.Data.Number * this.Data.Cost) - Off;

      document.getElementById('confirmationView').innerHTML =
        `<p><b>Name:</b><i>${this.Data.FirstName} ${this.Data.LastName}</i></p>
        <p><b>Address:</b><i>${this.Data.Address}, ${this.Data.City}, ${this.Data.Province}, ${this.Data.PostalCode}</i></p>
        <p><b>Phone:</b><i>${this.Data.PhoneNumber}</i></p>
        <p><b>Email:</b><i>${this.Data.Email}</i></p>
        <p><b>Selected day(s):</b><i>${Days}</i></p>
        <p><b>Cost per person:</b><i>$${this.Data.Cost}</i></p>
        <p><b>Number of persons:</b><i>${this.Data.Number}</i></p>
        <p><b>Off:</b><i>$${Off}</i></p>
        <p><b>Total cost:</b><i>$${this.Data.TotalCost}</i></p>`;

      this.Pointer3.classList.add('active');
      this.Step3.classList.add('active');
      this.Pointer2.classList.remove('active');
      this.Step2.classList.remove('active');
      return;
    },

    BackToRegister: function () {
      this.Pointer2.classList.add('active');
      this.Step2.classList.add('active');
      this.Pointer3.classList.remove('active');
      this.Step3.classList.remove('active');
      return;
    },

    Cancel: function () {
      let Url = new URL(window.location.origin);
      window.location.replace(Url);
      return;
    },

    Confirm: function () {
      let ReserveData = {
        FirstName: this.Data.FirstName,
        LastName: this.Data.LastName,
        Address: this.Data.Address,
        City: this.Data.City,
        Province: this.Data.Province,
        PostalCode: this.Data.PostalCode,
        PhoneNumber: this.Data.PhoneNumber,
        Email: this.Data.Email,
        Number: this.Data.Number,
        Cost: this.Data.Cost,
        TotalCost: this.Data.TotalCost
      }

      let ItemName = ReserveData.FirstName + ReserveData.LastName;
      localStorage.setItem(ItemName, JSON.stringify(ReserveData));
      alert("Your request confirmed.");
      
      this.Cancel();
      return;
    }
  }

  Application.init = function (Days, User) {
    this.Data = {
      Cost: 0,
      FirstName: String,
      LastName: String,
      Address: String,
      City: String,
      Province: String,
      PostalCode: Number,
      PhoneNumber: Number,
      Email: String,
      Number: Number
    };
    this.Pointer1 = document.getElementById('daysPointer');
    this.Step1 = document.getElementById('stepOne');
    this.daysForm = document.getElementById('daysForm');
    this.Day1 = document.getElementById('eventDay1');
    this.Day2 = document.getElementById('eventDay2');
    this.Pointer2 = document.getElementById('registerPointer');
    this.Step2 = document.getElementById('stepTwo');
    this.registerForm = document.getElementById('registerForm');
    this.backToDays = document.getElementById('backToDays');
    this.Pointer3 = document.getElementById('confirmPointer');
    this.Step3 = document.getElementById('stepThree');
    this.backToRegisterButton = document.getElementById('backToRegister');
    this.cancelButton = document.getElementById('cancel');
    this.confirmButton = document.getElementById('confirm');
  }

  Application.init.prototype = Application.prototype;

  global.Application = Application;
})(window);

window.App = Application();

App.Day1.addEventListener('change', function () {
  App.ChangeDays()
});

App.Day2.addEventListener('change', function () {
  App.ChangeDays();
});

App.daysForm.addEventListener('submit', function (event) {
  event.preventDefault();
  App.Next();
});

App.backToDays.addEventListener('click', function () {
  App.BackToDays();
});

let postalCode = document.getElementById('postalcode');
let postalCodeError = document.getElementById('postalcodeerror');
postalCode.addEventListener('change', function () {
  let postalCodeRegExp = new RegExp('^[A-Za-z][0-9][A-Za-z][ ][0-9][A-Za-z][0-9]$');
  if (!postalCodeRegExp.test(this.value)) {
    postalCodeError.style.display = 'block';
  } else {
    postalCodeError.style.display = 'none';
  }
});

let phoneNumber = document.getElementById('phonenumber');
let phoneNumberError = document.getElementById('phonenumbererror');
phoneNumber.addEventListener('change', function () {
  let phoneNumberRegExp = new RegExp('^([0-9]{3}[-]|[(][0-9]{3}[)])?[0-9]{3}[-][0-9]{4}$');
  if (!phoneNumberRegExp.test(this.value)) {
    phoneNumberError.style.display = 'block';
  } else {
    phoneNumberError.style.display = 'none';
  }
});

App.registerForm.addEventListener('submit', function (event) {
  event.preventDefault();
  App.Register();
});

App.backToRegisterButton.addEventListener('click', function () {
  App.BackToRegister();
});

App.cancelButton.addEventListener('click', function () {
  App.Cancel();
});

App.confirmButton.addEventListener('click', function () {
  App.Confirm();
});

/*
// var newContactForm = document.getElementById('newContact');

var postalCodeInput = document.getElementById('postalcode');
var postalCodeError = document.getElementById('postalcodeerror');

var phoneNumberInput = document.getElementById('phonenumber');
var phoneNumberError = document.getElementById('phonenumbererror');

var informationContainer = document.getElementById('contactInformation');

var addContactButton = document.getElementById('addContact');
var searchButton = document.getElementById('searchButton');

var contactList = document.getElementById('contactList');
var removeContactButton = document.getElementById('removeContact');
var goHomeButton = document.getElementById('goHome');

if (addContactButton) {
  addContactButton.addEventListener('click', function () {
    addContact();
  });
}

if (newContactForm) {
  postalCodeInput.addEventListener('change', function () {
    let postalCodeRegExp = new RegExp('^[A-Za-z][0-9][A-Za-z][ ][0-9][A-Za-z][0-9]$');
    if (!postalCodeRegExp.test(this.value)) {
      postalCodeError.style.display = 'block';
    } else {
      postalCodeError.style.display = 'none';
    }
  });

  phoneNumberInput.addEventListener('change', function () {
    let phoneNumberRegExp = new RegExp('^([0-9]{3}[-]|[(][0-9]{3}[)])?[0-9]{3}[-][0-9]{4}$');
    if (!phoneNumberRegExp.test(this.value)) {
      phoneNumberError.style.display = 'block';
    } else {
      phoneNumberError.style.display = 'none';
    }
  });

  newContactForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let Error =
      (postalCodeError.style.display === 'block') |
      (phoneNumberError.style.display === 'block');
    if (Error) {
      return;
    }

    let firstName = this.firstname.value,
      lastName = this.lastname.value,
      itemName = (firstName + lastName).toLowerCase(),
      Address = this.address.value,
      City = this.city.value,
      Province = this.province.value,
      postalCode = this.postalcode.value,
      phoneNumber = this.phonenumber.value,
      Email = this.email.value,
      Notes = this.notes.value

    let contactInfo = {
      firstName: firstName,
      lastName: lastName,
      Address: Address,
      City: City,
      Province: Province,
      postalCode: postalCode,
      Phone: phoneNumber,
      Email: Email,
      Notes: Notes
    }

    if (typeof (Storage) === 'undefined') {
      alert("Sorry, Your browser doesn't support local storage!");
      return;
    }
    localStorage.setItem(itemName, JSON.stringify(contactInfo));

    let linkUrl = new URL(window.location.origin);
    linkUrl.pathname = 'information.html';
    linkUrl.searchParams.set('contact', itemName);

    let linkText =
      `Name: ${firstName} ${lastName} <br>
     Address: ${Address}, ${City}, ${Province}, ${postalCode} <br>
     Phone Number: ${phoneNumber} <br>
     Email: ${Email} <br>
     Notes: ${Notes}`;

    let hyperLink = `<a href="${linkUrl}">${linkText}</a>`;
    newContactForm.innerHTML = hyperLink;
  });
}

if (informationContainer) {
  let urlString = window.location.href;
  let Url = new URL(urlString);
  let contactId = Url.searchParams.get('contact');

  if (contactId) {
    let Contact = JSON.parse(localStorage.getItem(contactId));
    if (!Contact) {
      alert('Contact not found!');
      goHome();
    }
    let fullName = `${Contact.firstName} ${Contact.lastName}`;
    let Address = `${Contact.Address}, ${Contact.City}, ${Contact.Province}, ${Contact.postalCode}`;

    let contactFullName = document.getElementById('fullName');
    contactFullName.innerHTML = fullName;

    let contactAddress = document.getElementById('Address');
    contactAddress.innerHTML = Address;

    let contactPhone = document.getElementById('phoneNumber');
    contactPhone.innerHTML = Contact.Phone;

    let contactEmail = document.getElementById('Email');
    contactEmail.innerHTML = Contact.Email;

    let contactNotes = document.getElementById('Notes');
    contactNotes.innerHTML = Contact.Notes;
  }
}

if (searchButton) {
  searchButton.addEventListener('click', function () {
    showContacts();
  });
}

if (contactList) {
  // let Contact = JSON.parse(localStorage.getItem(contactId));
  let Contacts = Object.keys(localStorage);
  let i = Contacts.length;
  while (i--) {
    let tempData = JSON.parse(localStorage.getItem(Contacts[i]));
    let tempContact = `<span class="contact">
      <p>Name: <i>${tempData.firstName} ${tempData.lastName}</i></p>
      <p>Address: <i>${tempData.Address}, ${tempData.City}, ${tempData.Province}, ${tempData.postalCode}</i></p>
      <p>Phone: <i>${tempData.Phone}</i></p>
      <p>Email: <i>${tempData.Email}</i></p>
      <p>Notes: <i>${tempData.Notes}</i></p>
      </span>`;

    contactList.innerHTML += tempContact;
  }

}

if (removeContactButton) {
  var removeContactButton = document.getElementById('removeContact');
  removeContactButton.addEventListener('click', function () {
    let urlString = window.location.href;
    let Url = new URL(urlString);
    let contactId = Url.searchParams.get('contact');
    window.localStorage.removeItem(contactId);
    goHome();
  });
}

if (goHomeButton) {
  var goHomeButton = document.getElementById('goHome');
  goHomeButton.addEventListener('click', function () {
    goHome();
  });
}

function addContact() {
  contactList.style.display = 'none';
  newContactForm.style.display = 'block';
  addContactButton.classList.add('active');
  searchButton.classList.remove('active');
}

function showContacts() {
  contactList.style.display = 'block';
  newContactForm.style.display = 'none';
  addContactButton.classList.remove('active');
  searchButton.classList.add('active');
}

function goHome() {
  let Url = new URL(window.location.origin);
  window.location.replace(Url);
}
*/