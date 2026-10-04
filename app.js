const Base_url = "https://api.frankfurter.dev/v2/rate";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector("#from");
const toCurr = document.querySelector("#to");
const msg = document.querySelector("#result");
for (let select of dropdowns) {
    for (let currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if (select.name == "from" && currcode == "USD") {
            newoption.selected = true;
        }
        else if (select.name == "to" && currcode == "INR") {
            newoption.selected = true;
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
const updateFlag = (element) => {
    let currcode = element.value;
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amount_value = amount.value;

    if (amount_value == "" || amount_value < 1) {
        amount_value = 1;
        amount.value = "1";
    }
    const url = `${Base_url}/${fromCurr.value}/${toCurr.value}`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data.rate;
    console.log(rate);
    let finalamount = amount_value * rate;
    msg.innerText =
        `${amount_value} ${fromCurr.value} = ${finalamount} ${toCurr.value}`;
});