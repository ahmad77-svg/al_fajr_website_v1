const translations = {
  ar: {
    fleet: [
      ["حفارات",7],["بلدوزر",2],["تريكسات",8],["غريدر",4],
      ["مداحل إسفلت",6],["مداحل رَج",3],["رافعة شوكية",1],["صهاريج ماء",4],
      ["بيك آب",9],["فرازة إسفلت",1],["مدادات إسفلت",3],["سيارات شحن",8],
      ["سيارات سياحية",3],["كسارات حجر",3],["معامل إسفلت",2],["مجبلة بيتون",1]
    ],
    team: [
      ["مهندسون مدنيون",3],["مهندس معماري",1],["مهندس ميكانيك",1],["مهندس كهرباء",1],
      ["مهندس مساحة",1],["فنيون",1],["محاسبون",1],["إداريون",1],
      ["خبراء قانونيون",1],["عمال مهرة",15],["عمال غير مهرة",35]
    ]
  },
  en: {
    fleet: [
      ["Excavators",7],["Bulldozers",2],["Loaders",8],["Graders",4],
      ["Asphalt rollers",6],["Ferrule rollers",3],["Forklifts",1],["Water tanks",4],
      ["Pickups",9],["Cold milling machines",1],["Asphalt pavers",3],["Lorries",8],
      ["Travel cars",3],["Stone breakers",3],["Asphalt plants",2],["Concrete mixers",1]
    ],
    team: [
      ["Civil engineers",3],["Architects",1],["Mechanical engineers",1],["Electrical engineers",1],
      ["Surveying engineers",1],["Technicians",1],["Accountants",1],["Administrators",1],
      ["Legal experts",1],["Skilled labor",15],["General labor",35]
    ]
  }
};

let lang = localStorage.getItem("fajr-language") || "ar";
const $$ = s => document.querySelectorAll(s);
const $ = s => document.querySelector(s);

function renderLists(){
  $("#fleetList").innerHTML = translations[lang].fleet.map(([name,count]) =>
    `<article class="fleet-item"><span>${name}</span><strong>${count}</strong></article>`
  ).join("");
  $("#teamGrid").innerHTML = translations[lang].team.map(([name,count]) =>
    `<article class="team-card"><strong>${count}</strong><span>${name}</span></article>`
  ).join("");
}

function applyLanguage(next){
  lang = next;
  localStorage.setItem("fajr-language", lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  $$("[data-ar]").forEach(el => {
    const value = el.dataset[lang];
    if (value.includes("<br>")) el.innerHTML = value;
    else el.textContent = value;
  });
  $$(".lang").forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));
  renderLists();
}

$$(".lang").forEach(btn => btn.addEventListener("click", () => applyLanguage(btn.dataset.lang)));

document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(lang);
  setTimeout(() => $("#intro").classList.add("hide"), 1250);
});

window.addEventListener("scroll", () => $("#header").classList.toggle("scrolled", scrollY > 30), {passive:true});

$("#menu").addEventListener("click", () => $("#nav").classList.toggle("open"));
$$("nav a").forEach(a => a.addEventListener("click", () => $("#nav").classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
$$(".reveal").forEach(el => observer.observe(el));

$$(".project-filters button").forEach(btn => btn.addEventListener("click", () => {
  $$(".project-filters button").forEach(x => x.classList.remove("active"));
  btn.classList.add("active");
  const filter = btn.dataset.filter;
  $$(".project").forEach(card => card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter));
}));/* ===========================
   SAFE COUNTER ANIMATION
=========================== */

document.addEventListener("DOMContentLoaded", function () {

    const counterElements =
        document.querySelectorAll(".counter");

    if (!counterElements.length) return;


    const statsCounterObserver =
        new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const element = entry.target;

                if (element.dataset.counted === "true") return;

                element.dataset.counted = "true";

                const target =
                    parseInt(element.dataset.target, 10) || 0;

                const duration = 1400;

                const startTime =
                    performance.now();


                function updateCounter(currentTime) {

                    const elapsed =
                        currentTime - startTime;

                    const progress =
                        Math.min(elapsed / duration, 1);

                    const easedProgress =
                        1 - Math.pow(1 - progress, 3);

                    element.textContent =
                        Math.floor(target * easedProgress);


                    if (progress < 1) {

                        requestAnimationFrame(
                            updateCounter
                        );

                    } else {

                       element.textContent = target + "+";
                    }

                }


                requestAnimationFrame(
                    updateCounter
                );

                statsCounterObserver.unobserve(
                    element
                );

            });

        }, {
            threshold: 0.35
        });


    counterElements.forEach((element) => {

        statsCounterObserver.observe(
            element
        );

    });

});document.addEventListener("DOMContentLoaded", () => {

    const counters = document.querySelectorAll(".counter");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const el = entry.target;
            const target = parseInt(el.dataset.target);

            let current = 0;
            const step = Math.max(1, Math.ceil(target / 80));

            function update() {

                current += step;

                if (current >= target) {

                    el.textContent = target;

                } else {

                    el.textContent = current;
                    requestAnimationFrame(update);

                }

            }

            requestAnimationFrame(update);

            observer.unobserve(el);

        });

    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

});
