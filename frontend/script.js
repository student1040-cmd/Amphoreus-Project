$(document).ready(function() {
    console.log("Скрипт ініціалізовано. Усі старі обробники вимкнено.");

    // Видаляємо всі попередні прив'язки подій, щоб уникнути "подвійних кліків"
    $(".like-btn").off("click");

    $(".like-btn").on("click", function(e) {
        e.preventDefault();

        // ВИКОРИСТОВУЄМО $(this) - це КЛЮЧОВИЙ момент!
        // $(this) - це тільки та кнопка, на яку ви клацнули.
        let $clickedBtn = $(this);
        
        // .find() шукає лічильник ТІЛЬКИ всередині $clickedBtn
        let $countSpan = $clickedBtn.find(".like-count");
        
        // Отримуємо число
        let currentLikes = parseInt($countSpan.text());
        
        // Збільшуємо тільки у цього героя
        $countSpan.text(currentLikes + 1);
        
        // Змінюємо стиль тільки цієї кнопки
        $clickedBtn.removeClass("btn-gold").addClass("btn-danger");
        
        console.log("Додано лайк герою: " + $clickedBtn.attr("data-hero"));
    });

    // Скидання
    $("#reset-likes").on("click", function() {
        $(".like-count").text("0");
        $(".like-btn").removeClass("btn-danger").addClass("btn-gold");
    });
    // --- БЛОК ДАТИ ТА ЧАСУ ---
    function updateClock() {
        const now = new Date();
        // Форматуємо дату та час
        const dateString = now.toLocaleDateString('uk-UA'); // напр. 13.03.2026
        const timeString = now.toLocaleTimeString('uk-UA'); // напр. 18:20:05
        
        // Вбудовуємо в HTML
        $("#datetime").text(dateString + " " + timeString);
    }

    // Запускаємо оновлення кожну секунду (1000 мс)
    setInterval(updateClock, 1000);
    updateClock(); // виклик одразу при завантаженні
    // --- КІНЕЦЬ БЛОКУ ---
});