// 1. Wait for the HTML page to load completely
document.addEventListener("DOMContentLoaded", () => {
    
    // 2. Select our elements from the HTML
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const cartBtn = document.getElementById("cartBtn");
    const cartCount = document.getElementById("cartCount");

    let currentCartValue = 0;

    // 3. Handle Search Functionality
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Stop page from reloading automatically
        const query = searchInput.value.trim();
        
        if (query === "") {
            alert("Please type something to search!");
        } else {
            alert(`Searching database for: "${query}"`);
            // In a real project, this is where we send the query to a server
        }
    });

    // 4. Handle Cart Functionality
    cartBtn.addEventListener("click", () => {
        currentCartValue++;
        cartCount.innerText = currentCartValue;
        
        // Add a nice visual feedback console log
        console.log(`Item added to cart. Total items: ${currentCartValue}`);
    });

});