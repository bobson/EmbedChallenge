fetch("data.json")
  .then((response) => response.json())
  .then((feeds) => {
    localStorage.setItem("feeds", JSON.stringify(feeds));
  });

const itemsContainer = document.querySelector(".layout-container");

const loadMoreButton = document.querySelector(".load-more-btn");

const initialItems = 4;
const loadItems = 4;

function loadInitialItems() {
  const feeds = JSON.parse(localStorage.getItem("feeds"));
  let out = "";
  let counter = 0;

  for (let feed of feeds) {
    if (counter < initialItems) {
      out += `
      <div class="feed-item">
        <div class="user-profile">
            <img src=${feed.profile_image} alt="Profile Picture">
            <div>
                <p>${feed.name}</p>
                <span>${feed.date}<span> 
            </div>
            <a href=${feed.source_link} target="blank">
              <img class="social" src=${
                feed.source_type === "facebook"
                  ? "images/facebook.png"
                  : "images/instagram.png"
              } alt="social" />
            </a>
        </div>
        <p class="feed-text">${feed.caption}</p>
        <img onclick="loadModal('${feed.image}')" class="feed-img" src=${
        feed.image
      } alt="feed image" />  
        
        <div class="activity-icons">
            <div><img src="images/like-blue.png"/>${feed.likes}</div>
            <div>
                <img src="images/like.png" alt="like btn"/>
                <img src="images/comments.png" alt="comments btn"/>
                <img src="images/share.png" alt="share btn"/>
            </div>
        </div>
     </div>
      `;
    }
    counter++;
  }

  const div = document.createElement("div");
  div.classList.add("feed-wrapper");
  itemsContainer.insertBefore(div, loadMoreButton);
  div.innerHTML = out;
}

loadInitialItems();

function loadData() {
  const feeds = JSON.parse(localStorage.getItem("feeds"));
  const currentDisplayedItems = document.querySelectorAll(".feed-item").length;

  let out = "";
  let counter = 0;
  for (let feed of feeds) {
    if (
      // Here we check if the items are already fetched so we dont fetch again
      counter >= currentDisplayedItems &&
      // And here fetch only the next 4 items
      counter < loadItems + currentDisplayedItems
    ) {
      out += `
      <div class="feed-item">
        <div class="user-profile">
            <img  src=${feed.profile_image} alt="Profile Picture">
            <div>
                <p>${feed.name}</p>
                <span>${feed.date}<span> 
            </div>
            <a href=${feed.source_link} target="blank">
            <img class="social" src=${
              feed.source_type === "facebook"
                ? "images/facebook.png"
                : "images/instagram.png"
            } alt="social" />
          </a>
        </div>
        <p class="feed-text">${feed.caption}</p>
        <img onclick="loadModal('${feed.image}')" class="feed-img" src=${
        feed.image
      } alt="feed image" />  
        
        <div class="activity-icons">
            <div><img src="images/like-blue.png"/>${feed.likes}</div>
            <div>
                <img src="images/like.png" alt="like btn"/>
                <img src="images/comments.png" alt="comments btn"/>
                <img src="images/share.png" alt="share btn"/>
            </div>
        </div>
     </div>
      `;
    }
    counter++;
  }

  let div = document.createElement("div");
  div.classList.add("feed-wrapper");
  itemsContainer.insertBefore(div, loadMoreButton);
  div.innerHTML = out;
  div.style.opacity = 0;

  // Hide load btn at the end of the feeds array
  if (document.querySelectorAll(".feed-item").length == feeds.length) {
    loadMoreButton.style.display = "none";
  }

  fadeIn(div);
}

function fadeIn(div) {
  let opacity = 0;
  let interval = setInterval(function () {
    if (opacity <= 1) {
      opacity = opacity + 0.1; // increasing the opacity by 0.1.
      div.style.opacity = opacity; // making the div element gradual visible.
    } else {
      clearInterval(interval);
    }
  }, 30);
}

loadMoreButton.addEventListener("click", loadData);

// Toggle dark theme
const darkBtn = document.getElementById("toggle-theme");
darkBtn.addEventListener("change", () => {
  if (darkBtn.checked) document.body.classList.add("dark-theme");
  else document.body.classList.remove("dark-theme");
});

// Modal functionality
const modal = document.getElementById("lightBox");
const modalContent = document.querySelector(".modal-content");
const closeBtn = document.querySelector(".close");
closeBtn.onclick = closeModal;

// I'm adding loadModal function on window object to be able to
//access it on the feed img as onclick event
window.loadModal = (src) => {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  modalContent.innerHTML = `
     <img class="modal-img" src=${src} alt="modal img" />
     `;
};

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}
