// import variables from "../../scss/_config.scss";

// console.log(variables.secondaryColor);

function init() {
  document
    .querySelector("body")
    .style.setProperty("--secondary-color", "#35682d");
  console.log(window.location.pathname);
  if (
    window.location.pathname == "/mr-portfolio/about.html" ||
    window.location.pathname == "/dist/about.html"
  ) {
    class Defilee {
      constructor(element) {
        if (!element) {
          return;
        }
        console.log("sono un element" + element);
        this.element = element;
        this._name = "defilee";
        this._itemSelector = "." + this._itemClass;
      }

      addLoop() {
        const parent = this.element;

        Array.prototype.slice
          .call(this.element.children)
          .reverse()
          .forEach((el) => {
            const clone = el.cloneNode(true);
            clone.classList.add("clone");
            parent.insertBefore(clone, parent.firstChild);
          });
      }
    }

    const defilee = new Defilee(document.getElementById("defilee"));
    console.log(defilee);
    defilee.addLoop();
    callingFn();
    printGraph();
  }

  async function callingFn() {
    try {
      const response = await fetch(
        //   "https://api.github.com/users/Mr2803/repos",
        "https://v1.nocodeapi.com/mr2803/instagram/sdXWhfbqqpGhUpPJ?limit=12",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      var json = await response.json();
      console.log(json);

      var personal_class = [
        "defilee__div--special1",
        "defilee__div--special2",
        "defilee__div--special3",
        "defilee__div--special4",
        "defilee__div--special1",
        "defilee__div--special2",
        "defilee__div--special3",
        "defilee__div--special4",
        "defilee__div--special1",
        "defilee__div--special2",
        "defilee__div--special3",
        "defilee__div--special4",
      ];
      for (let index = 0; index < json.data.length; index++) {
        json.data[index].class = personal_class[index];
      }
      console.log(json);
      json.data.map((value) => {
        console.log(value);
        if (value.caption == undefined) value.caption = "#Instagram";
        var template = document.createRange()
          .createContextualFragment(`<div class="defilee__div ${value.class}">
          <img
            src="${value.media_url}"
            alt="Avatar for user 1"
          />
          <p style="color:black">${value.caption}</p>
        </div>`);
        var src = document.getElementById("defilee");
        src.appendChild(template);
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Select DOM Items
  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.querySelector(".menu");
  const menuNav = document.querySelector(".menu-nav");
  const menuBranding = document.querySelector(".menu-branding");
  const navItems = document.querySelectorAll(".nav-item");

  // Set Initial State Of Menu
  let showMenu = false;

  menuBtn.addEventListener("click", toggleMenu);

  function toggleMenu() {
    if (!showMenu) {
      menuBtn.classList.add("close");
      menu.classList.add("show");
      menuNav.classList.add("show");
      menuBranding.classList.add("show");
      navItems.forEach((item) => item.classList.add("show"));

      // Set Menu State
      showMenu = true;
    } else {
      menuBtn.classList.remove("close");
      menu.classList.remove("show");
      menuNav.classList.remove("show");
      menuBranding.classList.remove("show");
      navItems.forEach((item) => item.classList.remove("show"));

      // Set Menu State
      showMenu = false;
    }
  }

  $(
    ".fa-instagram, .fa-facebook, .fa-linkedin, .fa-github , .fa-skype"
  ).mouseover(function () {
    $(this).addClass("fa-spin");
  });
  $(
    ".fa-instagram, .fa-facebook, .fa-linkedin, .fa-github , .fa-skype"
  ).mouseleave(function () {
    $(this).removeClass("fa-spin");
  });
}

//typed js

function printGraph() {
  var ctx = document.getElementById("myChart").getContext("2d");
  new Chart(ctx, {
    type: "horizontalBar",
    data: {
      labels: [
        "HTML",
        "CSS",
        "JAVASCRIPT",
        "JQUERY",
        "VUE.JS",
        "PHP",
        "MySQL",
        "LARAVEL",
      ],
      datasets: [
        {
          label: "Skills",
          data: [93, 95, 80, 83, 77, 80, 80, 87],
          backgroundColor: [
            "#d58300",
            "#e38e00",
            "#f19900",
            "#ffa500",
            "#ffb11b",
            "#ffbd2c",
            "#ffc93b",
            "#ffd93b",
          ],
          /* borderColor: [

                    'rgba(255, 159, 64, 1)'
                    
                ], */

          borderWidth: 1,
        },
      ],
    },
    options: {
      legend: {
        display: false,
        labels: {
          fontColor: "white",
          fontSize: 15,
          fontStyle: "bold",
        },
      },

      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontColor: "white",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              fontColor: "white",
            },
          },
        ],
      },
    },
  });
}

$(document).ready(init);
