const script = function () {
  setInterval(() => {
    chrome.storage.local.get('shorts-disabled', function (result) {
      if (result["shorts-disabled"] == true) {
        console.log("We can disable Shorts")
        var shortsAtt = document.querySelectorAll('[overlay-style="SHORTS"]');
        var newItem = document.createElement('div');

        for (i = 0; i < shortsAtt.length; i++) {
          shortsAtt[i].parentNode.parentNode.parentNode.parentNode.parentNode.replaceWith(newItem);
        }

      } else if (result["shorts-disabled"] == false) {
        console.log("We can NOT disable Shorts")

      } else {
        console.log("there was an error")
      }
    });

  }, 1100)

}

script();