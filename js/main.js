// =================================================================
// CENTRAL SHARED INITIALIZATION SEQUENCE (MULTI-PAGE ENGINE)
// =================================================================
document.addEventListener("DOMContentLoaded", () => {
    
    // -------------------------------------------------------------
    // FEATURE 1: DYNAMIC COUNTDOWN TIMER INITIALIZER
    // -------------------------------------------------------------
    const runCountdownTimer = () => {
        let days = 4;
        let hours = 13;
        let minutes = 2;
        let seconds = 56;

        const daysBox = document.getElementById("daysBox");
        const hoursBox = document.getElementById("hoursBox");
        const minsBox = document.getElementById("minsBox");
        const secsBox = document.getElementById("secsBox");

        // Agar element page par nahi hai (jaise listing ya detail page), toh script crash nahi hogi
        if (!daysBox) return;

        setInterval(() => {
            if (seconds > 0) {
                seconds--;
            } else {
                seconds = 59;
                if (minutes > 0) {
                    minutes--;
                } else {
                    minutes = 59;
                    if (hours > 0) {
                        hours--;
                    } else {
                        hours = 23;
                        if (days > 0) {
                            days--;
                        }
                    }
                }
            }

            daysBox.innerText = String(days).padStart(2, '0');
            hoursBox.innerText = String(hours).padStart(2, '0');
            minsBox.innerText = String(minutes).padStart(2, '0');
            secsBox.innerText = String(seconds).padStart(2, '0');
        }, 1000);
    };

    runCountdownTimer();

    // -------------------------------------------------------------
    // FEATURE 2: ELEMENTS SELECTORS & INTERACTIVE LISTENERS
    // -------------------------------------------------------------
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const cartBtn = document.getElementById("cartBtn");
    const cartCountElement = document.getElementById("cartCount");
    const addToCartMainBtn = document.getElementById("addToCartMainBtn");

    let sharedCartCounter = 0;

    // Search Validation Interceptor
    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const queryValue = searchInput.value.trim();
            
            if (queryValue === "") {
                alert("Please type something to search!");
            } else {
                alert(`Searching global database for: "${queryValue}"`);
            }
        });
    }

    // Top Header Menu Cart Counter
    if (cartBtn && cartCountElement) {
        cartBtn.addEventListener("click", () => {
            sharedCartCounter++;
            cartCountElement.innerText = sharedCartCounter;
            console.log(`Cart icon directly incremented. Total: ${sharedCartCounter}`);
        });
    }

    // Product Detail Page "Add to Cart" Main Button
    if (addToCartMainBtn && cartCountElement) {
        addToCartMainBtn.addEventListener("click", () => {
            sharedCartCounter++;
            cartCountElement.innerText = sharedCartCounter;
            alert("Item successfully added to your cart selection!");
            console.log(`Product page click logged. Total: ${sharedCartCounter}`);
        });
    }

    // -------------------------------------------------------------
    // NEW ADDITION: DYNAMIC PRODUCT SORTING CONTROLLER ENGINE
    // -------------------------------------------------------------
    const sortSelector = document.querySelector(".sort-select");
    const productGridContainer = document.querySelector(".catalog-product-grid");

    if (sortSelector && productGridContainer) {
        sortSelector.addEventListener("change", (event) => {
            const selectedValue = event.target.value;
            
            // Get all card elements into an array
            const productCardsArray = Array.from(productGridContainer.querySelectorAll(".product-card"));
            
            // Core sorting logic implementation
            productCardsArray.sort((cardA, cardB) => {
                const priceTextA = cardA.querySelector(".product-price").innerText.replace(/[^0-9.]/g, "");
                const priceTextB = cardB.querySelector(".product-price").innerText.replace(/[^0-9.]/g, "");
                
                const priceA = parseFloat(priceTextA);
                const priceB = parseFloat(priceTextB);

                if (selectedValue === "Price: Low to High") {
                    return priceA - priceB;
                } else if (selectedValue === "Price: High to Low") {
                    return priceB - priceA;
                } else {
                    return 0; // Maintain original layout configuration
                }
            });
            
            // Clear current layout grid
            productGridContainer.innerHTML = "";
            
            // Re-render nodes dynamically on screen
            productCardsArray.forEach(card => {
                productGridContainer.appendChild(card);
            });

            console.log(`Grid rearranged dynamically by: ${selectedValue}`);
        });
    }

});

// =================================================================
// GLOBAL MULTI-PAGE WINDOW LAYOUT HELPER FUNCTIONS
// =================================================================

// 1. Dynamic Gallery Image Switcher
function switchGalleryImage(imgSrc) {
    const mainImageElement = document.getElementById("mainDetailImage");
    if (mainImageElement) {
        mainImageElement.src = imgSrc;
    }
    
    const thumbs = document.querySelectorAll(".thumb-img");
    thumbs.forEach(thumb => {
        if(thumb.src === imgSrc) {
            thumb.classList.add("active-thumb");
        } else {
            thumb.classList.remove("active-thumb");
        }
    });
}

// 2. Tab Content Navigation Control
function switchTab(event, tabId) {
    const contents = document.querySelectorAll(".tab-content");
    contents.forEach(content => content.classList.remove("active-content"));

    const links = document.querySelectorAll(".tab-link");
    links.forEach(link => link.classList.remove("active"));

    document.getElementById(tabId).classList.add("active-content");
    event.currentTarget.classList.add("active");
}