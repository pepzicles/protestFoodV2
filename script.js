$(document).ready(function () {
    // Load data from JSON file
    $.getJSON("data.json", function (data) {
        renderFlexItems(data);
    });

    // Render flex items
    function renderFlexItems(items) {
        const container = $(".flex-container");
        container.empty(); // Clear the container

        items.forEach((item, index) => {
            const flexItem = `
                <div class="flex-item" data-index="${index}" 
                    data-category="${item.category}" 
                    data-date="${item.date}" 
                    data-scale="${item.scale}" 
                    data-country="${item.country}" 
                    data-region="${item.region}">
                    <a href="item.html?id=${index}">
                        <img src="${item.imageSrc}" alt="${item.name}">
                        <h3>${item.name}</h3>
                    </a>
                    <p>${item.location}</p>
                </div>
            `;
            container.append(flexItem);
        });

        // Call to updateContentDisplay() ensures that filters apply after rendering
        updateContentDisplay();
    }

    // Toggle dropdown menu using event delegation
    $(document).on("click", ".dropdown-toggle", function () {
        $(this).siblings(".dropdown-menu").toggle();
    });

    // Filter countries based on search input
    $(document).on("keyup", "#countrySearch", function () {
        const searchText = $(this).val().toLowerCase();
        $(".dropdown-menu label").each(function () {
            const country = $(this).text().toLowerCase();
            $(this).toggle(country.includes(searchText));
        });
    });

    // Filter regions based on search input
    $(document).on("keyup", "#region", function () {
        const searchText = $(this).val().toLowerCase();
        $(".dropdown-menu label").each(function () {
            const region = $(this).text().toLowerCase();
            $(this).toggle(region.includes(searchText));
        });
    });

    // Event listener for sorting by date
    $(document).on("change", "input[name='sortDate']", function () {
        sortItemsByDate($(this).val());
    });

    // Show or hide flex items based on selected filters
    $(document).on("change", ".dropdown-menu input[type='checkbox']", function () {
        updateContentDisplay();
    });


    // Update content display based on selected checkboxes
    function updateContentDisplay() {
        const selectedCountries = $("#countrySearch").closest(".dropdown-menu").find("input[type='checkbox']:checked").map(function () {
            return $(this).val();
        }).get();

        const selectedRegions = $("#region").closest(".dropdown-menu").find("input[type='checkbox']:checked").map(function () {
            return $(this).val();
        }).get();

        const selectedCategories = $("#category .dropdown-menu input[type='checkbox']:checked").map(function () {
            return $(this).val();
        }).get();

        const selectedScales = $("#scale .dropdown-menu input[type='checkbox']:checked").map(function () {
            return $(this).val();
        }).get();

        if (selectedCountries.length === 0 && selectedRegions.length === 0 && selectedCategories.length === 0 && selectedScales.length === 0) {
            $(".flex-item").fadeIn(700); // Show all if no filters
        } else {
            $(".flex-item").hide(); // Hide all initially

            $(".flex-item").each(function () {
                const countries = $(this).data("country").split(",");
                const regions = $(this).data("region").split(",");
                const categories = $(this).data("category").split(",");
                const scales = $(this).data("scale").split(",");

                const matchCountry = countries.some(country => selectedCountries.includes(country.trim()));
                const matchRegion = regions.some(region => selectedRegions.includes(region.trim()));
                const matchCategory = categories.some(category => selectedCategories.includes(category.trim()));
                const matchScale = scales.some(scale => selectedScales.includes(scale.trim()));

                if (matchCountry || matchRegion || matchCategory || matchScale) {
                    $(this).fadeIn(700);
                }
            });
        }
    }

    // Sort items by date
    function sortItemsByDate(order) {
        const items = $(".flex-item").toArray();

        items.sort(function (a, b) {
            const dateA = new Date($(a).data("date"));
            const dateB = new Date($(b).data("date"));

            return (order === "newest") ? dateB - dateA : dateA - dateB;
        });

        $(".flex-container").append(items);
    }

    // Close dropdown if clicked outside
    $(document).click(function (event) {
        if (!$(event.target).closest(".dropdown").length) {
            $(".dropdown-menu").hide();
        }
    });

    
    //CLEAR filters
    document.getElementById("clear-filters").addEventListener("click", function () {
        // Uncheck all checkboxes
        document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
            checkbox.checked = false;
        });

        // Uncheck all radio buttons
        document.querySelectorAll("input[type='radio']").forEach((radio) => {
            radio.checked = false;
        });

        // Clear all input fields (e.g., search bars)
        document.querySelectorAll("input[type='text']").forEach((textInput) => {
            textInput.value = "";
        });

        // Optionally trigger any updates to the UI or data display
        // For example:
        updateContentDisplay();
    });


    // Initialize with all items shown
    updateContentDisplay();
});


// Search by topic- Tags function
