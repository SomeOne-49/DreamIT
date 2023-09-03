//Todo: Add & Remove "active" Class :
const navList = document.querySelectorAll("nav .navbar-nav .nav-link");
const navbarcollapse = document.querySelector(".navbar-collapse");
navList.forEach((e) => {
  e.addEventListener("click", () => {
    navList.forEach((el) => el.classList.remove("active"));
    e.classList.add("active");
    navbarcollapse.classList.remove('show')
  });
});
//Todo: Changing The Position Of The Axes :
const navBtn = document.querySelector("nav .navbar-nav a.btn");
navBtn.onmouseover = function (e) {
  let x = e.offsetX;
  let y = e.offsetY;
  navBtn.style.setProperty("--x-axis", x + "px");
  navBtn.style.setProperty("--y-axis", y + "px");
};

//Todo: Add "open" To Hamburger Menu :
const menuBtn = document.querySelector(".menu-box");
let isOpen = false;

menuBtn.addEventListener("click", () => {
  if (!isOpen) {
    menuBtn.classList.add("open");
    isOpen = true;
  } else {
    menuBtn.classList.remove("open");
    isOpen = false;
  }
});

//! Carousel Section :

//Todo : Create Dots =>

const tCaro = document.querySelector(".testimonials .caro"),
  tList = document.querySelector(".testimonials .caro ul"),
  tDotParent = document.querySelector(".testimonials .caro-dots");
const bCaro = document.querySelector(".blog .caro"),
  bList = document.querySelector(".blog .caro ul"),
  bDotParent = document.querySelector(".blog .caro-dots");
let WidthC,
  displayElement,
  i = 0;

window.addEventListener("load", () => {
  create(tCaro, tList, tDotParent, false),
    create(bCaro, bList, bDotParent, true);
});
window.addEventListener("resize", () => {
  create(tCaro, tList, tDotParent, false),
    create(bCaro, bList, bDotParent, true);
});

//Todo: Get Widths :
function getWidths(parent, child) {
  WidthC = +getComputedStyle(child.children[0])
    .getPropertyValue("width")
    .slice(0, -2);
  window.onresize = () => {
    WidthC = +getComputedStyle(child.children[0])
      .getPropertyValue("width")
      .slice(0, -2);
  };
  displayElement = Math.floor(
    getComputedStyle(parent).getPropertyValue("width").slice(0, -2) /
      getComputedStyle(child.children[0]).getPropertyValue("width").slice(0, -2)
  );
}

//Todo: Moving And (Add & Remove "active") :
function moving(dotParent, child, isPages) {
  let dotsParent = [...dotParent.children];
  dotsParent[0].classList.add("active");
  dotsParent.forEach((el, index) => {
    el.addEventListener("click", () => {
      i = index * displayElement; //! To make buttons countinue from the current index of the item...
      addDisabled();
      move(child, index, isPages);
      dotsParent.forEach((e) => {
        e.classList.remove("active");
        el.classList.add("active");
      });
    });
  });
}

//Todo: Moving :
function move(child, index, isPages) {
  !isPages ? (steps = 1) : (steps = displayElement);
  child.style.transform = `translateX(${-WidthC * index * steps}px)`;
}

//Todo: Create Dot Elements :
function create(parent, child, dotParent, isPages) {
  dotParent.innerHTML = "";
  getWidths(parent, child);
  let eleCount;
  isPages
    ? (eleCount = Math.floor(child.childElementCount / displayElement))
    : (eleCount = Math.ceil((child.childElementCount + 1) / displayElement));
  eleCount > child.childElementCount
    ? (eleCount = child.childElementCount)
    : "";
  for (let i = 0; i < eleCount; i++) {
    const dot = document.createElement("span");
    dotParent.append(dot);
  }
  moving(dotParent, child, isPages);
}

//Todo: Set Control Button :
const controlBtns = document.querySelectorAll(".controls");

controlBtns.forEach((el) => {
  el.addEventListener("click", () => {
    if (i < bList.childElementCount - displayElement  ) {
      if (el.classList.contains("btn-right")) {
        i++;
        move(bList, i, false);
      }
    }

    if (i > 0) {
      if (el.classList.contains("btn-left")) {
        i--;
        move(bList, i, false);
      }
    }

    addDisabled();
    //Todo: Add 'active' To Dots :
    [...bDotParent.children].forEach((el, index) => {
      if (index * displayElement == i) {
        [...bDotParent.children].forEach((e) => {
          e.classList.remove("active");
        });
        el.classList.add("active");
      }
    });
  });
});

function addDisabled() {
  if (i < bList.childElementCount - displayElement ) {
    //!- (-1) because we are using "isPages" which sets displayElement to 1;
    controlBtns[0].classList.remove("disabled");
  } else controlBtns[0].classList.add("disabled");

  if (i > 0) {
    controlBtns[1].classList.remove("disabled");
  } else controlBtns[1].classList.add("disabled");
}
