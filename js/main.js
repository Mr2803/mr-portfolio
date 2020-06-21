function init() {
  // Select DOM Items
  var cookiesPolicy = {
    popupTitle: "GDPR COOKIE POLICY",
    popupZIndex: "10000",
    popupTitleFontSize: "18px",
    popupTextFontSize: "11px",
    colorOfButton: "#007bce",
    cookieGeneral: "blog.alessandrostella.it",
    cookieCheckPref: "preferences",
    cookieCheckStat: "statistics",
    cookieCheckMark: "marketing",
    urlCookiePolicy: "https://blog.alessandrostella.it/privacy-cookie-policy/",
    cookieExpiresDays: 30,
    prefCheckValue: "checked",
    statCheckValue: "checked",
    markCheckValue: "checked",
    cookieValue: "0",
    showPopup: false,
    popup: null,

    start: function () {
      window.addEventListener("load", cookiesPolicy.onLoad, false);
    },
    onLoad: function () {
      console.log("LOADED " + window.location.href);
      cookiesPolicy.getCookie();
      cookiesPolicy.createPopup();
    },
    getCookie: function () {
      var nameOfGeneral = cookiesPolicy.cookieGeneral + "=";
      var nameOfPreferences = cookiesPolicy.cookieCheckPref + "=";
      var nameOfStatistics = cookiesPolicy.cookieCheckStat + "=";
      var nameOfMarketing = cookiesPolicy.cookieCheckMark + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(nameOfGeneral) == 0) {
          cookiesPolicy.cookieValue = c.substring(
            nameOfGeneral.length,
            c.length
          );
        }
        if (c.indexOf(nameOfPreferences) == 0) {
          cookiesPolicy.prefCheckValue = c.substring(
            nameOfPreferences.length,
            c.length
          );
        }
        if (c.indexOf(nameOfStatistics) == 0) {
          cookiesPolicy.statCheckValue = c.substring(
            nameOfStatistics.length,
            c.length
          );
        }
        if (c.indexOf(nameOfMarketing) == 0) {
          cookiesPolicy.markCheckValue = c.substring(
            nameOfMarketing.length,
            c.length
          );
        }
      }
      return "";
    },
    createPopup: function () {
      cookiesPolicy.popup = document.createElement("div");
      var cssElement = document.createElement("style");
      cookiesPolicy.popup.id = "cookiePopup";
      cookiesPolicy.popup.innerHTML = cookiesPolicy.loadPopupContent();
      cssElement.innerHTML = cookiesPolicy.loadCSS();
      var element = document.getElementsByTagName("body")[0];
      element.appendChild(cookiesPolicy.popup);
      element.appendChild(cssElement);
      if (window.location.href === cookiesPolicy.urlCookiePolicy) {
        cookiesPolicy.popup.style.display = "none";
        if (cookiesPolicy.cookieValue === "1") {
          cookiesPolicy.loadScript();
        }
      } else if (cookiesPolicy.cookieValue === "1") {
        cookiesPolicy.popup.style.display = "none";
        cookiesPolicy.loadScript();
      }
    },
    loadPopupContent: function () {
      var checkForPref =
        '<input type="checkbox" name="preferences" value="preferences" ' +
        cookiesPolicy.prefCheckValue +
        '><span class="checkboxtext">Preferenze</span>';
      var checkForStat =
        '<input type="checkbox" name="statistics" value="statistics" ' +
        cookiesPolicy.statCheckValue +
        '><span class="checkboxtext">Statistiche</span>';
      var checkForMark =
        '<input type="checkbox" name="marketing" value="marketing" ' +
        cookiesPolicy.markCheckValue +
        '><span class="checkboxtext">Marketing</span>';
      var allPrefScript = document.querySelectorAll(
        'script[data-starcookie="preferences"]'
      );
      if (allPrefScript.length === 0) {
        checkForPref = "";
      }
      var allStatScript = document.querySelectorAll(
        'script[data-starcookie="statistics"]'
      );
      if (allStatScript.length === 0) {
        checkForStat = "";
      }
      var allMarkScript = document.querySelectorAll(
        'script[data-starcookie="marketing"]'
      );
      if (allMarkScript.length === 0) {
        checkForMark = "";
      }
      var htmlCode =
        '<div id="cookieBox">' +
        "<h3>" +
        cookiesPolicy.popupTitle +
        "</h3>" +
        "<hr>" +
        "<p>Per poter gestire al meglio la tua navigazione su questo sito " +
        "verranno temporaneamente memorizzate alcune informazioni in piccoli file di testo denominati <strong>cookie</strong>. " +
        "È molto importante che tu sia informato e che accetti la politica sulla privacy e sui cookie di questo sito Web. " +
        "Per ulteriori informazioni, leggi la nostra politica sulla privacy e sui cookie.</p>" +
        '<p><a href="' +
        cookiesPolicy.urlCookiePolicy +
        '" title="Leggi la Policy">Politica sulla privacy e sui cookie</a></p>' +
        '<div id="checkboxContainer"> ' +
        '<div class="singleCheckBox"><input type="checkbox" name="necesse" value="necesse" checked disabled><span class="checkboxtext">Cookie necessari</span></div> ' +
        '<div class="singleCheckBox">' +
        checkForPref +
        "</div>" +
        '<div class="singleCheckBox">' +
        checkForStat +
        "</div>" +
        '<div class="singleCheckBox">' +
        checkForMark +
        "</div>" +
        "</div>" +
        '<button onClick="cookiesPolicy.loadScript()">OK, HO CAPITO E ACCETTO</button>' +
        "</div>";
      return htmlCode;
    },
    loadCSS: function () {
      var style =
        "#cookiePopup {" +
        "font-family: sans-serif; " +
        "position: fixed; " +
        "z-index: " +
        cookiesPolicy.popupZIndex +
        ";" +
        "left: 0; " +
        "top: 0; " +
        "height: 100vh; " +
        "width: 100%; " +
        "padding-top: 15vh; " +
        "color: #ddd;" +
        "background-color: rgba(0,0,0,0.6);" +
        "} " +
        "#cookiePopup #cookieBox {" +
        "width: 90%; " +
        "max-width: 640px; " +
        "margin: 0 auto; " +
        "border: 2px solid white; " +
        "box-shadow: 0px 0px 15px #000;" +
        "padding: 25px; " +
        "background-color: #222;" +
        "} " +
        "#cookiePopup #cookieBox h3 {" +
        "margin-top: 0; " +
        "margin-bottom: 0; " +
        "font-size: " +
        cookiesPolicy.popupTitleFontSize +
        ";" +
        "font-weight: bold; " +
        "font-family: sans-serif, arial; " +
        "} " +
        "#cookiePopup #cookieBox hr {" +
        "width: 60vw; " +
        "max-width: 250px; " +
        "margin-top: 0; " +
        "margin-left: 0; " +
        "} " +
        "#cookiePopup #cookieBox p {" +
        "font-size: " +
        cookiesPolicy.popupTextFontSize +
        ";" +
        "text-align: justify; " +
        "line-height: " +
        cookiesPolicy.popupTextFontSize +
        ";" +
        "font-family: sans-serif; " +
        "} " +
        "#cookiePopup #cookieBox p:nth-child(3) {" +
        "padding: 0 0 10px 0; " +
        "} " +
        "#cookiePopup #cookieBox a {" +
        "color: #fff; " +
        "} " +
        "#cookiePopup #cookieBox #checkboxContainer {" +
        "padding: 15px 10px 25px 10px; " +
        "} " +
        "#cookiePopup #cookieBox #checkboxContainer div.singleCheckBox{" +
        "display: inline-block; " +
        "} " +
        "#cookiePopup #cookieBox #checkboxContainer input[type=checkbox] {" +
        "-ms-transform: scale(1.5); " +
        "-moz-transform: scale(1.5); " +
        "-webkit-transform: scale(1.5); " +
        "-o-transform: scale(1.5); " +
        "padding: 10px; " +
        "margin-left: 15px; " +
        "cursor: pointer; " +
        "} " +
        "#cookiePopup #cookieBox #checkboxContainer .checkboxtext {" +
        "margin-left: 5px; " +
        "display: inline; " +
        "font-size: " +
        cookiesPolicy.popupTextFontSize +
        ";" +
        "} " +
        "#cookiePopup #cookieBox button {" +
        "background-color: " +
        cookiesPolicy.colorOfButton +
        "; " +
        "color: #fff; " +
        "font-size: 1rem; " +
        "padding: 10px 20px; " +
        "cursor: pointer; " +
        "transition: all 0.5s; " +
        "} " +
        "#cookiePopup #cookieBox button:hover {" +
        "background-color: white;" +
        "color: " +
        cookiesPolicy.colorOfButton +
        "; " +
        "} " +
        "@media screen and (max-width:768px) { " +
        "#cookiePopup {" +
        "padding-top: 6vh; " +
        "} " +
        "#cookiePopup #cookieBox #checkboxContainer div.singleCheckBox{" +
        "display: block; " +
        "padding: 5px 0; " +
        "} " +
        "} ";
      return style;
    },
    loadScript: function () {
      var d = new Date();
      d.setTime(
        d.getTime() + cookiesPolicy.cookieExpiresDays * 24 * 60 * 60 * 1000
      );
      var expires = "expires=" + d.toUTCString();
      var popupIsVisible =
        cookiesPolicy.popup.style.display === "block" ||
        cookiesPolicy.popup.style.display === "";
      if (popupIsVisible) {
        document.cookie =
          cookiesPolicy.cookieGeneral + "=1;" + expires + ";path=/";
      }
      if (document.querySelector('input[name="preferences"]') != null) {
        if (document.querySelector('input[name="preferences"]').checked) {
          var allPrefScript = document.querySelectorAll(
            'script[data-starcookie="preferences"]'
          );
          for (var i = 0; i < allPrefScript.length; i++) {
            allPrefScript[i].setAttribute("type", "text/javascript");
            try {
              eval(allPrefScript[i].text);
            } catch (err) {
              //doNothing
            }
          }
          if (popupIsVisible) {
            cookiesPolicy.prefCheckValue = "checked";
            document.cookie =
              cookiesPolicy.cookieCheckPref +
              "=" +
              cookiesPolicy.prefCheckValue +
              ";" +
              expires +
              ";path=/";
          }
        } else if (popupIsVisible) {
          cookiesPolicy.prefCheckValue = "";
          document.cookie =
            cookiesPolicy.cookieCheckPref +
            "=" +
            cookiesPolicy.prefCheckValue +
            ";" +
            expires +
            ";path=/";
        }
      }
      if (document.querySelector('input[name="statistics"]') != null) {
        if (document.querySelector('input[name="statistics"]').checked) {
          var allStatScript = document.querySelectorAll(
            'script[data-starcookie="statistics"]'
          );
          for (var i = 0; i < allStatScript.length; i++) {
            allStatScript[i].setAttribute("type", "text/javascript");
            try {
              var newCode = document.createElement("script");
              newCode.text = allStatScript[i].text;
              document.body.appendChild(newCode);
              eval(allStatScript[i].text);
            } catch (err) {
              console.log(err);
              //doNothing
            }
          }
          if (popupIsVisible) {
            cookiesPolicy.statCheckValue = "checked";
            document.cookie =
              cookiesPolicy.cookieCheckStat +
              "=" +
              cookiesPolicy.statCheckValue +
              ";" +
              expires +
              ";path=/";
          }
        } else if (popupIsVisible) {
          cookiesPolicy.statCheckValue = "";
          document.cookie =
            cookiesPolicy.cookieCheckStat +
            "=" +
            cookiesPolicy.statCheckValue +
            ";" +
            expires +
            ";path=/";
        }
      }
      if (document.querySelector('input[name="marketing"]') != null) {
        if (document.querySelector('input[name="marketing"]').checked) {
          var allMarkScript = document.querySelectorAll(
            'script[data-starcookie="marketing"]'
          );
          for (var i = 0; i < allMarkScript.length; i++) {
            allMarkScript[i].setAttribute("type", "text/javascript");
            try {
              eval(allMarkScript[i].text);
            } catch (err) {
              //doNothing
            }
          }
          if (popupIsVisible) {
            cookiesPolicy.markCheckValue = "checked";
            document.cookie =
              cookiesPolicy.cookieCheckMark +
              "=" +
              cookiesPolicy.markCheckValue +
              ";" +
              expires +
              ";path=/";
          }
        } else if (popupIsVisible) {
          cookiesPolicy.markCheckValue = "";
          document.cookie =
            cookiesPolicy.cookieCheckMark +
            "=" +
            cookiesPolicy.markCheckValue +
            ";" +
            expires +
            ";path=/";
        }
      }
      if (popupIsVisible) {
        cookiesPolicy.popup.style.display = "none";
      }
    },
    showPopup: function () {
      cookiesPolicy.popup.style.display = "block";
    },
  };
  cookiesPolicy.start();

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

  printGraph();
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
