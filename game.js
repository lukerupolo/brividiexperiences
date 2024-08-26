function toggleDescription(id) {
    const description = document.getElementById(id);
    
    if (description.style.display === "block") {
        description.style.display = "none";
    } else {
        description.style.display = "block";
    }
}
