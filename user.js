(function () {
  if ('ACTIVEUSER' in localStorage) {
    activeuser = localStorage.getItem('ACTIVEUSER');
    userStr = localStorage.getItem(activeuser);
    if (userStr) {
      user = JSON.parse(userStr);
      uname.innerHTML = user.uname;
      console.log(user);
      display();
    } else {
      console.error('No user data found in localStorage');
      window.location = './signin.html';
    }
  } else {
    window.location = './signin.html';
  }
})();

function signout() {
  localStorage.removeItem('ACTIVEUSER');
  window.location = './index.html';
}

function addIncome() {
  const currentdate = new Date();
  const datetime = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} , ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;

  const newAmt = document.getElementById('unia').value;
  const newTyp = document.getElementById('unit').value;

  if (!user.uinc) user.uinc = [];
  user.uinc.push([newTyp, newAmt, datetime]);
  localStorage.setItem(activeuser, JSON.stringify(user));

  display();
}

function addExpense() {
  const currentdate = new Date();
  const datetime = `${currentdate.getDate()}/${currentdate.getMonth() + 1}/${currentdate.getFullYear()} , ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;

  const newAmt = parseInt(document.getElementById('unea').value);
  const newTyp = document.getElementById('unet').value;

  // Calculate total income and total expense
  const totalIncome = user.uinc.reduce((total, n) => total + parseInt(n[1]), 0);
  const totalExpense = user.uexp.reduce((total, n) => total + parseInt(n[1]), 0);

  if ((totalExpense + newAmt) <= totalIncome) {
    if (!user.uexp) user.uexp = [];
    user.uexp.push([newTyp, newAmt, datetime]);
    localStorage.setItem(activeuser, JSON.stringify(user));
    display();
  } else {
    alert('Expense cannot be greater than total income.');
  }
}

function clearData() {
  user.uinc = [];
  user.uexp = [];
  localStorage.setItem(activeuser, JSON.stringify(user));
  display();
}

function display() {
  const rows = user.uinc.map(n => `
    <tr>
      <th scope="row">${n[1]}</th>
      <td>${n[0]}</th>
      <td>${n[2]}</td>
    </tr>
  `).join('');

  const rows2 = user.uexp.map(n => `
    <tr>
      <th scope="row">${n[1]}</th>
      <td>${n[0]}</th>
      <td>${n[2]}</td>
    </tr>
  `).join('');

  if (user.uinc.length > 0) {
    const tinc = user.uinc.reduce((total, n) => total + parseInt(n[1]), 0);
    console.log(tinc);
    document.getElementById('ti').innerHTML = tinc;
  } else {
    document.getElementById('ti').innerHTML = 0;
  }

  if (user.uexp.length > 0) {
    const texp = user.uexp.reduce((total, n) => total + parseInt(n[1]), 0);
    document.getElementById('te').innerHTML = texp;
  } else {
    document.getElementById('te').innerHTML = 0;
  }

  if (user.uinc.length > 0 && user.uexp.length > 0) {
    const tbal = user.uinc.reduce((total, n) => total + parseInt(n[1]), 0) - user.uexp.reduce((total, n) => total + parseInt(n[1]), 0);
    document.getElementById('tb').innerHTML = tbal;
  } else {
    document.getElementById('tb').innerHTML = 0;
  }

  document.getElementById('idet').innerHTML = rows;
  document.getElementById('edet').innerHTML = rows2;

  // Pie chart values
  const expenseTypes = user.uexp.map(n => n[0]);
  const expenseValues = user.uexp.map(n => parseInt(n[1]));

  const balance = user.uinc.reduce((total, n) => total + parseInt(n[1]), 0) - user.uexp.reduce((total, n) => total + parseInt(n[1]), 0);

  // Adding balance as the first value
  const xValues = ['Balance', ...expenseTypes];
  const yValues = [balance, ...expenseValues];

  const barColors = [
    "#E32525", "#e65555", "#e39696", "#e6c8c8", "#e3d5d5", "#e3d5d5", "#c2b0b0",
    "#9c9191", "#6e6565", "#423d3d", "#211e1e", "#141414", "#261a1a", "#261a1a",
    "#7a3636", "#a33939", "#c93434",
  ];

  new Chart("myChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues,
        borderWidth: 0
      }]
    },
    options: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      }
    },
  });
}
