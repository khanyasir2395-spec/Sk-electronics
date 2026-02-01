const products = {
  ahuja: {
    speaker: {
      "500W": 18000,
      "1000W": 28000
    },
    amplifier: {
      "800W": 22000,
      "1200W": 32000
    },
    mic: {
      "Wireless": 6000
    }
  },

  skpro: {
    speaker: {
      "600W": 15000,
      "1200W": 25000
    },
    cabinet: {
      "15 inch": 14000
    },
    mixer: {
      "4 Channel": 9000
    }
  },

  robo: {
    speaker: {
      "500W": 16000
    },
    amplifier: {
      "1000W": 26000
    }
  }
};

let cart = [];
let total = 0;

function updateComponents() {
  const brand = document.getElementById("brand").value;
  const componentSelect = document.getElementById("component");
  componentSelect.innerHTML = `<option value="">Select Component</option>`;

  if (!brand) return;

  for (let component in products[brand]) {
    componentSelect.innerHTML += `<option value="${component}">${component}</option>`;
  }
}

function updateModels() {
  const brand = document.getElementById("brand").value;
  const component = document.getElementById("component").value;
  const modelSelect = document.getElementById("model");
  modelSelect.innerHTML = "";

  if (!component) return;

  for (let model in products[brand][component]) {
    modelSelect.innerHTML += `<option value="${model}">${model}</option>`;
  }
}

function addItem() {
  const brand = document.getElementById("brand").value;
  const component = document.getElementById("component").value;
  const model = document.getElementById("model").value;
  const qty = parseInt(document.getElementById("qty").value);

  if (!brand || !component || !model) {
    alert("Please select all options");
    return;
  }

  const price = products[brand][component][model];
  const itemTotal = price * qty;

  cart.push(`${brand.toUpperCase()} | ${component} | ${model} x ${qty} = ₹${itemTotal}`);
  total += itemTotal;

  updateSummary();
}

function updateSummary() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

function sendWhatsApp() {
  if (cart.length === 0) {
    alert("No items added");
    return;
  }

  let msg = "Hello SK Electronics Kolkata,%0A%0AMy DJ Setup:%0A";

  cart.forEach(i => {
    msg += i + "%0A";
  });

  msg += `%0ATotal: ₹${total}`;

  const phone = "8052546602"; // replace
  window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}
