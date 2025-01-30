$(document).ready(function () {
    // Get the item index from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const itemIndex = urlParams.get("id");

    if (itemIndex === null) {
        $("body").html("<h2>Item not found.</h2>");
        return;
    }

    // Load the JSON file
    $.getJSON("data.json", function (data) {
        if (itemIndex >= data.length) {
            $("body").html("<h2>Item not found.</h2>");
            return;
        }

        const item = data[itemIndex];

        $("#item-name").text(item.name);
        $("#item-image").attr("src", item.imageSrc).attr("alt", item.name);
        $("#item-category").text(item.category);
        $("#item-scale").text(item.scale);
        $("#item-country").text(item.country);
        $("#item-region").text(item.region);
        $("#item-url").attr("href", item.url);
    });
});
