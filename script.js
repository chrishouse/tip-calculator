'use strict';

let serviceButtons = document.querySelectorAll('.service-button');
let customButton = document.querySelector('.custom');
let customInput = document.querySelector('.input-custom');
let form = document.querySelector('form');

const serviceBtnClicked = e => {
    serviceButtons.forEach(b => b.classList.remove('checked'));
    if (e.target.classList.contains('input-custom')) {
        customButton.classList.add('checked');
    } else {
        e.target.classList.add('checked');
    }
}

serviceButtons.forEach(i => i.addEventListener('click', serviceBtnClicked));

customButton.addEventListener('click', () => customInput.focus());

const btnSubmit = e => {

    e.preventDefault();

    let bill = document.querySelector('.bill').value;
    let checked = document.querySelector('.checked');
    let tipText = document.querySelector('.tip span');
    let totText = document.querySelector('.total span');
    let error = document.querySelector('.error');
    let tipPerc;
    let tip;
    let total;

    if (checked.classList.contains('exceptional')) {
        tipPerc = .25;
    } else if (checked.classList.contains('standard')) {
        tipPerc = .2;
    } else if (checked.classList.contains('subpar')) {
        tipPerc = .15;
    } else if(checked.classList.contains('bad')) {
        tipPerc = .10;
    } else if (checked.classList.contains('terrible')) {
        tipPerc = .05;
    } else if (checked.classList.contains('custom')) {
        tipPerc = customInput.value/100;
    }

    if (!bill) {        
        error.textContent = 'Enter a value';
    } else {        
        error.textContent = '';
        bill = Number(bill.replace('$', ''));
        tip = bill*tipPerc;
        total = bill+tip;
        tipText.textContent = '$' + tip.toFixed(2) + ' (' + Math.round(tipPerc*100) + '%)';
        totText.textContent = '$' + total.toFixed(2);
        document.querySelector('.tip').style.display = 'block';
        document.querySelector('.total').style.display = 'block';
    }    
};

form.addEventListener('submit', btnSubmit);