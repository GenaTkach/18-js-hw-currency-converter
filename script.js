getAllSymbols();
convertButton.onclick = request
changeButton.onclick = changeCurrencies


function request() {
    if (to.value === '' || from.value === '' || amount.value === '') {
        alert('Empty inputs')
        return;
    }
    fetch("https://api.apilayer.com/fixer/convert?" + new URLSearchParams({
        to: to.value,
        from: from.value,
        amount: amount.value
    }), {
        headers: {
            "apikey": "2Oh56eImqfuGArlJLNYluQ7SSOaiC8vq"
        }
    }).then(r => r.json())
        .then(json => {
            const h1 = document.createElement('h1')
            h1.appendChild(document.createTextNode(`${amount.value} ${from.value} = ${json.result} ${to.value}`))
            if (result.firstElementChild !== null) {
                result.replaceChild(h1, result.firstElementChild)
            } else {
                result.appendChild(h1);
            }
        })
}

function changeCurrencies() {
    const temp = from.value;
    from.value = to.value;
    to.value = temp;
}

function getAllSymbols() {
    fetch("https://api.apilayer.com/fixer/symbols", {
        headers: {
            "apikey": "2Oh56eImqfuGArlJLNYluQ7SSOaiC8vq"
        }
    }).then(r => r.json())
        .then(json => {
                const currencies = json.symbols
                console.log(currencies);
                const keys = Object.keys(currencies);
                keys.forEach(e => {
                    const option = document.createElement("option");
                    option.appendChild(document.createTextNode(`${e}`))
                    from.appendChild(option);
                });
                keys.forEach(e => {
                    const option = document.createElement("option");
                    option.appendChild(document.createTextNode(`${e}`))
                    to.appendChild(option);
                });

            }
        )
}
