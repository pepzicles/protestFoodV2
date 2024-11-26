$(document).ready(function () {
    // Toggle dropdown menu
    $(".dropdown-toggle").click(function() {
        $(this).siblings(".dropdown-menu").toggle();
    });

    // Filter countries based on search input
    $("#countrySearch").on("keyup", function() {
        const searchText = $(this).val().toLowerCase();
        $(".dropdown-menu label").each(function() {
            const country = $(this).text().toLowerCase();
            $(this).toggle(country.includes(searchText));
        });
    });

    // Filter regions based on search input
    $("#region").on("keyup", function() {
        const searchText = $(this).val().toLowerCase();
        $(".dropdown-menu label").each(function() {
            const region = $(this).text().toLowerCase();
            $(this).toggle(region.includes(searchText));
        });
    });

    // Event listener for sorting by date
    $("input[name='sortDate']").change(function() {
        sortItemsByDate($(this).val());
    });

    // Sort items by date
    function sortItemsByDate(order) {
        const items = $(".flex-item").toArray();
        
        items.sort(function(a, b) {
            const dateA = new Date($(a).data("date"));
            const dateB = new Date($(b).data("date"));

            return (order === "newest") ? dateB - dateA : dateA - dateB;
        });

        // Re-append items in sorted order
        $(".flex-container").append(items);
    }

    // Show or hide flex items based on selected filters
    $(".dropdown-menu input[type='checkbox']").change(function() {
        updateContentDisplay();
    });

    // Update content display based on selected checkboxes
    function updateContentDisplay() {
        const selectedCountries = $("#countrySearch").closest(".dropdown-menu").find("input[type='checkbox']:checked").map(function() {
            return $(this).val();
        }).get();

        const selectedRegions = $("#region").closest(".dropdown-menu").find("input[type='checkbox']:checked").map(function() {
            return $(this).val();
        }).get();

        const selectedCategories = $("#category .dropdown-menu input[type='checkbox']:checked").map(function() {
            return $(this).val();
        }).get();

        const selectedScales = $("#scale .dropdown-menu input[type='checkbox']:checked").map(function() {
            return $(this).val();
        }).get();

        if (selectedCountries.length === 0 && selectedRegions.length === 0 && selectedCategories.length === 0 && selectedScales.length === 0) {
            $(".flex-item").fadeIn(700); // Show all if no filters
        } else {
            $(".flex-item").hide(); // Hide all initially

            $(".flex-item").each(function() {
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

    // Close dropdown if clicked outside
    $(document).click(function(event) {
        if (!$(event.target).closest(".dropdown").length) {
            $(".dropdown-menu").hide();
        }
    });

    // Initialize with all items shown
    updateContentDisplay();
});
