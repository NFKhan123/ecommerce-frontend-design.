document.addEventListener("DOMContentLoaded", () => {
    
    // --- STATE MANAGEMENT SYSTEM ---
    let sharedCartCounter = 0;
    const cartCountElement = document.getElementById("cartCount");

    // Helper to safely increment data parameters
    const incrementCart = () => {
        sharedCartCounter++;
        if (cartCountElement) {
            cartCountElement.innerText = sharedCartCounter;
        }
        console.log(`Cart total updated safely via action trigger: ${sharedCartCounter}`);
    };

    // --- FEATURE 1: GLOBAL LIVE COUNTDOWN TIMER ---
    const runCountdownTimer = () => {
        let days = 4; let hours = 13; let minutes = 2; let seconds = 56;
        const daysBox = document.getElementById("daysBox");
        const hoursBox = document.getElementById("hoursBox");
        const minsBox = document.getElementById("minsBox");
        const secsBox = document.getElementById("secsBox");

        if (!daysBox) return;

        setInterval(() => {
            if (seconds > 0) seconds--;
            else {
                seconds = 59;
                if (minutes > 0) minutes--;
                else {
                    minutes = 59;
                    if (hours > 0) hours--;
                    else {
                        hours = 23;
                        if (days > 0) days--;
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

    // --- FEATURE 2: CART ACTION ROUTING (NO CLICKS ON ICON OVERRIDES) ---
    const addToCartMainBtn = document.getElementById("addToCartMainBtn");
    if (addToCartMainBtn) {
        addToCartMainBtn.addEventListener("click", () => {
            incrementCart();
            alert("Item successfully added to your cart selection!");
        });
    }

    // Capture Catalog Grid "Buy Now" Triggers Dynamic Operations
    const productGridContainer = document.querySelector(".catalog-product-grid");
    if (productGridContainer) {
        productGridContainer.addEventListener("click", (event) => {
            if (event.target.classList.contains("card-btn")) {
                event.stopPropagation(); // Stop routing redirection link fires
                incrementCart();
                alert("Product registered into global checkout context!");
            }
        });
    }

    // --- FEATURE 3: LIVE SEARCH, DROP-DOWN, & SIDEBAR CATEGORIES REGEX FILTERING ---
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const headerCategorySelect = document.getElementById("headerCategorySelect");

    const filterProductsMatrix = () => {
        if (!productGridContainer) return;

        const searchText = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const selectedHeaderCategory = headerCategorySelect ? headerCategorySelect.value : "All";
        
        // Target values inside active sidebar anchor configurations
        const activeSidebarLink = document.querySelector(".category-filter-link.active-filter");
        const selectedSidebarCategory = activeSidebarLink ? activeSidebarLink.getAttribute("data-category") : "All";

        const cards = productGridContainer.querySelectorAll(".product-card");

        cards.forEach(card => {
            const productName = card.querySelector(".product-name").innerText.toLowerCase();
            
            // Extract mock logic attributes mapping targets configuration metadata elements
            let matchesText = searchText === "" || productName.includes(searchText);
            
            // Hardcoded structural mapping rules engine matching your mock catalog arrays
            let isElectronics = productName.includes("camera") || productName.includes("headset") || productName.includes("headphones");
            let isComputers = productName.includes("laptop") || productName.includes("ultrabook");
            let isAccessories = productName.includes("watch") || productName.includes("sunglasses");

            let currentItemCategory = "All";
            if (isElectronics) currentItemCategory = "Electronics";
            if (isComputers) currentItemCategory = "Computers";
            if (isAccessories) currentItemCategory = "Accessories";

            let matchesHeaderCategory = selectedHeaderCategory === "All" || currentItemCategory === selectedHeaderCategory;
            let matchesSidebarCategory = selectedSidebarCategory === "All" || currentItemCategory === selectedSidebarCategory;

            if (matchesText && matchesHeaderCategory && matchesSidebarCategory) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    };

    // Bind Interaction Intercept Matrix Listeners
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            filterProductsMatrix();
        });
    }
    if (headerCategorySelect) {
        headerCategorySelect.addEventListener("change", filterProductsMatrix);
    }

    // Left Sidebar Category Links Click Interceptors
    const sidebarCategoryLinks = document.querySelectorAll(".category-filter-link");
    sidebarCategoryLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            sidebarCategoryLinks.forEach(l => l.classList.remove("active-filter"));
            link.classList.add("active-filter");
            filterProductsMatrix();
        });
    });

    // --- FEATURE 4: DYNAMIC PRICE SORTING ---
    const sortSelector = document.querySelector(".sort-select");
    if (sortSelector && productGridContainer) {
        sortSelector.addEventListener("change", (event) => {
            const selectedValue = event.target.value;
            const productCardsArray = Array.from(productGridContainer.querySelectorAll(".product-card"));
            
            productCardsArray.sort((cardA, cardB) => {
                const priceTextA = cardA.querySelector(".product-price").innerText.replace(/[^0-9.]/g, "");
                const priceTextB = cardB.querySelector(".product-price").innerText.replace(/[^0-9.]/g, "");
                const priceA = parseFloat(priceTextA);
                const priceB = parseFloat(priceTextB);

                if (selectedValue === "Price: Low to High") return priceA - priceB;
                if (selectedValue === "Price: High to Low") return priceB - priceA;
                return 0;
            });
            
            productGridContainer.innerHTML = "";
            productCardsArray.forEach(card => productGridContainer.appendChild(card));
        });
    }
});

// --- GLOBAL MULTI-PAGE WINDOW HELPER OBJECTS ---
function switchGalleryImage(imgSrc) {
    const mainImageElement = document.getElementById("mainDetailImage");
    if (mainImageElement) mainImageElement.src = imgSrc;
    
    const thumbs = document.querySelectorAll(".thumb-img");
    thumbs.forEach(thumb => {
        thumb.src === imgSrc ? thumb.classList.add("active-thumb") : thumb.classList.remove("active-thumb");
    });
}

function switchTab(event, tabId) {
    const contents = document.querySelectorAll(".tab-content");
    contents.forEach(content => content.classList.remove("active-content"));
    const links = document.querySelectorAll(".tab-link");
    links.forEach(link => link.classList.remove("active"));
    document.getElementById(tabId).classList.add("active-content");
    event.currentTarget.classList.add("active");
}