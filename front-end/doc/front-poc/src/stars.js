var number_of_star = 290;

var random_number = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createStars = function (container) {
    var star_rotation = "move_right";
    container.innerHTML = "";

    for (var i = 0; i < number_of_star; i++) {
        var rotation =
            star_rotation === "move_right" ? "move_left" : "move_right";
        var star_top = random_number(0, container.clientHeight);
        var star_left = random_number(0, container.clientWidth);
        var star_radius = random_number(0, 4);
        var star_duration = random_number(6, 16);

        container.innerHTML += `<div class='star' style='top: ${star_top}px; left: ${star_left}px; width: ${star_radius}px; height: ${star_radius}px; 
        animation-name: ${star_rotation}; animation-duration: ${star_duration}s;'></div>`;

        star_rotation = rotation;
    }
};

export default createStars;
