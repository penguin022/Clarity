$(document).ready(function(){
    /* opens up the opening page */
    $('.page').hide();
    $('.navbar').hide();
    $('#opening').show();
    /*changePage('#main');*/
    changePageDelay(0);

    var temp = 23;
    $('#main-temp').text(temp);
    setTemp_savePage(temp);

    var cost = 0;
    var saveMoneyVal = 0; /* saveMoneyVal applies for when you decrease temp by 2 degrees */
    /* this lets you deal with the compare to yourself page */
    var costAt23 = costPerYear(23);
    $('#compare-self-avg').text(costAt23);
    changeCost(temp, cost, saveMoneyVal, costAt23);

    changeTemp(temp, cost, saveMoneyVal, costAt23);

    /* allows you to change the charts */
    var activeChart = '.to-cost';
    $(activeChart).addClass('nav-item-active');

    /* allows you to change the competition pages */
    var activeComp = '.to-fb';
    $(activeComp).addClass('nav-item-active');

    /* this if for the tabs */
    var activeTab = '#home-tab';
    $(activeTab).addClass('nav-item-active');
    changeTab(activeTab, activeComp, activeChart);

    /* this affects the thermostat verification code */
    var thermoCode = 'A1G8X3'
    showCode(thermoCode);
});

/* changes the active page */
function changePage (newID) {
    $('.page').hide();
    $(newID).show();
    $('.navbar').show();
}

/* will delay changing the page for a set time */
function changePageDelay (miliseconds) {
    setTimeout(function() {
        changePage('#main');
    }, miliseconds);
};

/* this function works for changing the temperature */
function changeTemp (temp, cost, saveMoneyVal, costAt23) {
    /* allows you to decrease temperature */
    $('#temp-down-button').click(function() {
        temp --;
        $('#main-temp').text(temp);
        changeCost(temp, cost, saveMoneyVal, costAt23);
        setTemp_savePage(temp);
    });

    /* allows you to increase temperature of house */
    $('#temp-up-button').click(function() {
        temp ++;
        $('#main-temp').text(temp);
        changeCost(temp, cost, saveMoneyVal, costAt23);
        setTemp_savePage(temp);
    });

    /* this deals with the save money button page */
    $('#save-yes').click(function() {
        changePage('#main');
        temp -= 2;
        $('#main-temp').text(temp);
        changeCost(temp, cost, saveMoneyVal, costAt23);
        setTemp_savePage(temp);
    });

    $('#save-no').click(function() {
        changePage('#main');
    });
}

/* adjusts temperatures for the save money page */
function setTemp_savePage (temp) {
    $('#save-current-temp').text(temp);
    $('#save-new-temp').text(temp-2);
}

/* this functions updates the cost to heat hosue per year */
function changeCost (temp, cost, saveMoneyVal, costAt23) {
    cost = costPerYear(temp);
    $('#main-cost').text(cost);
    /* this deals with money saved from dropping temp 2 degrees */
    saveMoneyVal = cost - costPerYear(temp-2);
    $('#save-down-2').text(saveMoneyVal);
    $('#save-year').text(saveMoneyVal);
    $('#save-month').text((saveMoneyVal/12).toFixed(2));
    /* this deals with the compare to yourself page */
    $('#compare-self-current').text('$' + cost);
    var avgCurrentDiff = costAt23 - cost;
    if (avgCurrentDiff > 0) {
        $('#compare-self-diff').text('+$' + avgCurrentDiff);
        $('#compare-self-diff').css('color', '#5cb85c');
        $('#compare-self-current').css('color', '#5cb85c');
    } else if (avgCurrentDiff == 0) {
        $('#compare-self-diff').text('$' + avgCurrentDiff);
        $('#compare-self-diff').css('color', '#000');
        $('#compare-self-current').css('color', '#000`');
    } else {
        $('#compare-self-diff').text('-$' + (-1*avgCurrentDiff));
        $('#compare-self-diff').css('color', '#f30a23');
        $('#compare-self-current').css('color', '#f30a23');
    }
}

/* this function applies for changing the tab on the navbar */
function changeTab (activeTab, activeComp, activeChart) {
    $('#home-tab').click(function() {
        $(activeTab).removeClass('nav-item-active');
        activeTab = '#home-tab';
        $(activeTab).addClass('nav-item-active');
        changePage('#main');
    });

    /* this deals with clicking the save money button on home page */
    $('#save-button').click(function() {
        changePage('#save-money');
    });

    $('#comparisons-tab').click(function() {
        $(activeTab).removeClass('nav-item-active');
        activeTab = '#comparisons-tab';
        $(activeTab).addClass('nav-item-active');
        if (activeComp == '.to-fb') {
            changePage('#comp-fb');
        } else if (activeComp == '.to-reg') {
            changePage('#comp-reg');
        } else {
            changePage('#comp-you');
        }
    });

    $('#statistics-tab').click(function() {
        $(activeTab).removeClass('nav-item-active');
        activeTab = '#statistics-tab';
        $(activeTab).addClass('nav-item-active');
        if (activeChart == '.to-cost') {
            changePage('#charts-cost');
        } else if (activeChart == '.to-energy') {
            changePage('#charts-energy');
        } else if (activeChart == '.to-temp') {
            changePage('#charts-temp');
        } else {
            changePage('#charts-goals');
        }
    });

    $('#settings-tab').click(function() {
        $(activeTab).removeClass('nav-item-active');
        activeTab = '#settings-tab';
        $(activeTab).addClass('nav-item-active');
        changePage('#settings');
    });

    /* this deals with the different settings pages */
    $('#settings-tab').click(function() {
        $(activeTab).removeClass('nav-item-active');
        activeTab = '#settings-tab';
        $(activeTab).addClass('nav-item-active');
        changePage('#settings');
    });

    $('#settings-to-thermo').click(function() {
        changePage('#settings-thermo');
    });

    $('#settings-to-house').click(function() {
        changePage('#settings-house');
    });

    $('#settings-to-fb').click(function() {
        changePage('#settings-fb');
    });

    $('#settings-to-custom').click(function() {
        changePage('#settings-custom');
    });

    $('.settings-return').click(function() {
        changePage('#settings');
    });

    /* this is for the circle nav in the competitions page */
    $('.to-fb').click(function() {
        $(activeComp).removeClass('nav-item-active');
        activeComp = '.to-fb';
        $(activeComp).addClass('nav-item-active');
        changePage('#comp-fb');
    });

    $('.to-reg').click(function() {
        $(activeComp).removeClass('nav-item-active');
        activeComp = '.to-reg';
        $(activeComp).addClass('nav-item-active');
        changePage('#comp-reg');
    });

    $('.to-you').click(function() {
        $(activeComp).removeClass('nav-item-active');
        activeComp = '.to-you';
        $(activeComp).addClass('nav-item-active');
        changePage('#comp-you');
    });

    /* this is for the circle nav in the charts page */
    $('.to-cost').click(function() {
        $(activeChart).removeClass('nav-item-active');
        activeChart = '.to-cost';
        $(activeChart).addClass('nav-item-active');
        changePage('#charts-cost');
    });

    $('.to-energy').click(function() {
        $(activeChart).removeClass('nav-item-active');
        activeChart = '.to-energy';
        $(activeChart).addClass('nav-item-active');
        changePage('#charts-energy');
    });

    $('.to-temp').click(function() {
        $(activeChart).removeClass('nav-item-active');
        activeChart = '.to-temp';
        $(activeChart).addClass('nav-item-active');
        changePage('#charts-temp');
    });

    $('.to-goals').click(function() {
        $(activeChart).removeClass('nav-item-active');
        activeChart = '.to-goals';
        $(activeChart).addClass('nav-item-active');
        changePage('#charts-goals');
    });
};

function changeChart (activeChart) {

};

/* this displays the code in the settings page */
function showCode (thermoCode) {
    $('#code-0').text(thermoCode[0]);
    $('#code-1').text(thermoCode[1]);
    $('#code-2').text(thermoCode[2]);
    $('#code-3').text(thermoCode[3]);
    $('#code-4').text(thermoCode[4]);
    $('#code-5').text(thermoCode[5]);
}

/* allows you to change the thermostat code connected */
function changeCode (thermoCode) {
    $('#settings-thermo-code').click(function() {

    });
}
