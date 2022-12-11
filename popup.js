var short_checkbox = document.getElementById('shorts-disabled');
short_checkbox.addEventListener('change', changeBehaviour);

var buttonTest = document.getElementById('button');
buttonTest.addEventListener('click', getValue);

chrome.storage.local.get('shorts-disabled', function (result) {
    if (result["shorts-disabled"] == true) {
        console.log("Setting checkbox to TRUE")
        short_checkbox.checked = true;

    } else if (result["shorts-disabled"] == false) {
        console.log("Setting checkbox to FALSE")
        short_checkbox.checked = false;

    } else {
        console.log("Not yet set up")
    }
})

function changeBehaviour() {
    console.log('Checkbox is ' + short_checkbox.checked);
    chrome.storage.local.set({
        "shorts-disabled": short_checkbox.checked
    }, function () {
        console.log('Value is set to ' + short_checkbox.checked);
    });
}

function getValue() {
    chrome.storage.local.get('shorts-disabled', function (result) {
        console.log("Result", result["shorts-disabled"])
        if (result == true) {
            console.log("We can disable Shorts")

        } else {
            console.log("We can NOT disable Shorts")
        }
    })
}