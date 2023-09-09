function generateRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

const script = function () {
  setInterval(() => {
    // Clean shorts
    chrome.storage.local.get('shorts-disabled', function (result) {
      if (result["shorts-disabled"] == true) {
        // console.log("We can disable Shorts")
        var shortsRow = document.querySelectorAll('div.style-scope.ytd-rich-section-renderer');
        shortsRow.forEach((row) => {
          row.style.display = 'none';
        });
      } else if (result["shorts-disabled"] == false) {
        console.log("We can NOT disable Shorts")

      } else {
        console.log("there was an error")
      }
    });

    if (window.location.href.includes("playlist?list=WL")) {
      const playlistVideoRenderers = document.querySelectorAll('ytd-playlist-video-renderer');
      // Iterate through each element and add a <div> with a link emoji
      playlistVideoRenderers.forEach((element) => {
        const randomId = generateRandomId(20);
        const existingEmojiDiv = element.querySelector('#link');
        if (!existingEmojiDiv) {
          // Add Link
          const emojiDiv = document.createElement('div');
          element.setAttribute("id", "video_" + randomId);
          emojiDiv.id = 'link';
          emojiDiv.innerHTML = '🔗'; // You can replace this emoji with your desired emoji
          emojiDiv.style.fontSize = '20px'; // You can adjust the size of the emoji
          emojiDiv.style.marginLeft = '10px'; // You can adjust the margin as needed
          emojiDiv.style.marginRight = '20px'; // You can adjust the margin as needed
          emojiDiv.style.color = 'blue'; // You can set the color of the emoji text
          emojiDiv.style.cursor = 'pointer';
          emojiDiv.setAttribute('data-link-id', randomId);
          // Get the href of the ytd-playlist-video-renderer a#video-title link
          const videoTitleLink = element.querySelector('a#video-title');
          if (videoTitleLink) {
            const videoLink = "http://youtube.com" + videoTitleLink.getAttribute('href');
            emojiDiv.addEventListener('click', () => {
              chrome.runtime.sendMessage({
                action: "openNewTab",
                url: videoLink
              });

              // click menu
              var element = document.querySelector("#video_" + randomId + " #menu #interaction")
              console.log(element, "#video_" + randomId + " #menu #interaction")
              if (element) {
                var event = new MouseEvent('click', {
                  bubbles: true,
                  cancelable: true,
                  view: window
                });
                // element.dispatchEvent(event);
              } else {
                console.error(`Element with query selector "${querySelector}" not found.`);
              }

              // wait to open button
              setTimeout(function () {}, 500);

              // click remove from watch later
              var elements = document.querySelectorAll('ytd-menu-popup-renderer ytd-menu-service-item-renderer');
              for (var i = 0; i < elements.length; i++) {
                var element = elements[i];
                var spanText = element.querySelector('span[dir="auto"]');
                if (spanText) {
                  if (spanText.textContent.includes("Remove from")) {
                    // Trigger a click event on the element
                    var event = new MouseEvent('click', {
                      bubbles: true,
                      cancelable: true,
                      view: window
                    });
                    // element.dispatchEvent(event);
                    break;
                  }
                }

              }

            });
          }
          // Add the emoji <div> to the <ytd-playlist-video-renderer> element
          element.appendChild(emojiDiv);



        }

      });
    }


  }, 1500)



}

script();



// // Select the second element matching the query
// var parentElement = document.querySelectorAll('ytd-playlist-video-renderer #menu')[1];

// // Check if the second matching element exists
// if (parentElement) {
//   // Select all elements inside the second element
//   var elementsInside = parentElement.querySelectorAll('*');

//   // Loop through the elements inside the second element and trigger a click event on each of them
//   elementsInside.forEach(function(element) {
//     var event = new MouseEvent('click', {
//       bubbles: true,
//       cancelable: true,
//       view: window
//     });
//     element.dispatchEvent(event);
//   });
// } else {
//   console.log('The second matching element does not exist.');
// }