/*
See on github: https://github.com/muhammederdem/credit-card-form
*/
const url = "https://bookmyshoot-backend.onrender.com";
new Vue({
  el: "#app",
  data() {
    return {
      currentCardBackground: Math.floor(Math.random() * 25 + 1), // just for fun :D
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(),
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      cardNumberTemp: "",
      isCardFlipped: false,
      focusElementStyle: null,
      isInputFocused: false
    };
  },
  mounted() {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById("cardNumber").focus();
  },
  computed: {
    getCardType() {
      let number = this.cardNumber;
      let re = new RegExp("^4");
      if (number.match(re) != null) return "visa";

      re = new RegExp("^(34|37)");
      if (number.match(re) != null) return "amex";

      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";

      re = new RegExp("^6011");
      if (number.match(re) != null) return "discover";

      re = new RegExp('^9792')
      if (number.match(re) != null) return 'troy'

      return "visa"; // default type
    },
    generateCardNumberMask() {
      return this.getCardType === "amex" ? this.amexCardMask : this.otherCardMask;
    },
    minCardMonth() {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    }
  },
  watch: {
    cardYear() {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    }
  },
  methods: {
    flipCard(status) {
      this.isCardFlipped = status;
    },
    focusInput(e) {
      this.isInputFocused = true;
      let targetRef = e.target.dataset.ref;
      let target = this.$refs[targetRef];
      this.focusElementStyle = {
        width: `${target.offsetWidth}px`,
        height: `${target.offsetHeight}px`,
        transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`
      }
    },
    blurInput() {
      let vm = this;
      setTimeout(() => {
        if (!vm.isInputFocused) {
          vm.focusElementStyle = null;
        }
      }, 300);
      vm.isInputFocused = false;
    }
  }
});

// Get the current URL
const currentUrl = window.location.href;
// Create a URL object from the current URL
const url2 = new URL(currentUrl);
// Get the search parameters from the URL
const searchParams = url2.searchParams;
const photographer = searchParams.get("id");
const time = +searchParams.get("time");
const total = document.getElementById("total");
const gst = document.getElementById("gst");
const grandTotal = document.getElementById("grandTotal");
const token = localStorage.getItem("token");
const submit = document.getElementById("submit");

if (!time || !token) {
  Swal.fire({
    icon: "error",
    title: "",
    text: "Access Denied",
    footer: ``
  });
  setTimeout(() => {
    window.location.href = "./index.html";
  }, 2500)
}

appendData();

async function appendData() {
  const req = await fetch(`${url}/user/${photographer}`);
  const data = await req.json();
  const price = +data.user.price;
  const totalPrice = price * time;
  const totalGST = Math.floor(((price * time) * 18) / 100);

  total.innerText = totalPrice.toLocaleString('en-IN')
  gst.innerText = totalGST.toLocaleString('en-IN');
  grandTotal.innerText = (totalGST + totalPrice).toLocaleString('en-IN');
}

submit.addEventListener("click", () => {

  if(!document.getElementById("cardName").value || !document.getElementById("cardNumber") || !document.getElementById("cardCvv").value){
    Swal.fire({
      icon: "error",
      title: "",
      text: "Please enter all the Details",
      footer: ``
    });
    return;
  }

  Swal.fire(
    "Your Payment is successfull",
    '',
    'success'
  )
  setTimeout(()=>{
    window.location.href = "./clientDashboard.html"
  },2500)
})