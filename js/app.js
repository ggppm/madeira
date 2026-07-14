/*
==========================================================
VIAGEM À MADEIRA
js/app.js
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    // Mostrar o primeiro dia ao abrir o site
    showDay("day1");

    // Atualizar automaticamente o botão ativo
    setupDayButtons();

    // Adicionar animação aos cartões
    animateCards();

});


/* ==========================================================
   MUDAR DE DIA
========================================================== */

function showDay(dayId) {

    // Esconde todos os dias
    document.querySelectorAll(".day").forEach(day => {
        day.classList.remove("active");
    });

    // Mostra o dia escolhido
    const selectedDay = document.getElementById(dayId);

    if (selectedDay) {
        selectedDay.classList.add("active");
    }

    // Atualiza o botão selecionado
    document.querySelectorAll(".day-menu button").forEach(button => {
        button.classList.remove("active");

        if (button.dataset.day === dayId) {
            button.classList.add("active");
        }
    });

    // Volta ao topo da página
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* ==========================================================
   BOTÕES DOS DIAS
========================================================== */

function setupDayButtons() {

    document.querySelectorAll(".day-menu button").forEach(button => {

        button.addEventListener("click", () => {

            showDay(button.dataset.day);

        });

    });

}


/* ==========================================================
   ANIMAÇÃO DOS CARTÕES
========================================================== */

function animateCards() {

    const cards = document.querySelectorAll(".activity");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    }, {

        threshold: 0.15

    });

    cards.forEach(card => observer.observe(card));

}


/* ==========================================================
   ABRIR TODOS OS MAPAS (opcional)
========================================================== */

function openAllMaps() {

    const links = document.querySelectorAll(".map-button");

    links.forEach((link, index) => {

        setTimeout(() => {

            window.open(link.href, "_blank");

        }, index * 400);

    });

}


/* ==========================================================
   COPIAR LINK DA ATIVIDADE
========================================================== */

function copyLink(url) {

    navigator.clipboard.writeText(url)
        .then(() => {

            alert("Link copiado para a área de transferência.");

        })
        .catch(() => {

            alert("Não foi possível copiar o link.");

        });

}


/* ==========================================================
   PARTILHAR A ATIVIDADE
========================================================== */

async function shareActivity(title, url) {

    if (navigator.share) {

        try {

            await navigator.share({

                title: title,
                url: url

            });

        } catch (e) {

            console.log(e);

        }

    } else {

        copyLink(url);

    }

}


/* ==========================================================
   MARCAR COMO CONCLUÍDO
========================================================== */

function toggleVisited(button) {

    const card = button.closest(".activity");

    card.classList.toggle("visited");

    if (card.classList.contains("visited")) {

        button.innerHTML = "✅ Visitado";

    } else {

        button.innerHTML = "✔️ Marcar como visitado";

    }

}


/* ==========================================================
   FILTRO (para futura utilização)
========================================================== */

function searchActivities(text) {

    text = text.toLowerCase();

    document.querySelectorAll(".activity").forEach(card => {

        const title = card.querySelector("h3").textContent.toLowerCase();

        if (title.includes(text)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}