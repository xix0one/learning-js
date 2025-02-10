"use strict";

const FILE_LIST = [
    {
      "id": 1,
      "company": "Photosnap",
      "logo": "./images/photosnap.svg",
      "new": true,
      "featured": true,
      "position": "Senior Frontend Developer",
      "role": "Frontend",
      "level": "Senior",
      "postedAt": "1d ago",
      "contract": "Full Time",
      "location": "USA Only",
      "languages": ["HTML", "CSS", "JavaScript"],
      "tools": []
    },
    {
      "id": 2,
      "company": "Manage",
      "logo": "./images/manage.svg",
      "new": true,
      "featured": true,
      "position": "Fullstack Developer",
      "role": "Fullstack",
      "level": "Midweight",
      "postedAt": "1d ago",
      "contract": "Part Time",
      "location": "Remote",
      "languages": ["Python"],
      "tools": ["React"]
    },
    {
      "id": 3,
      "company": "Account",
      "logo": "./images/account.svg",
      "new": true,
      "featured": false,
      "position": "Junior Frontend Developer",
      "role": "Frontend",
      "level": "Junior",
      "postedAt": "2d ago",
      "contract": "Part Time",
      "location": "USA Only",
      "languages": ["JavaScript"],
      "tools": ["React", "Sass"]
    },
    {
      "id": 4,
      "company": "MyHome",
      "logo": "./images/myhome.svg",
      "new": false,
      "featured": false,
      "position": "Junior Frontend Developer",
      "role": "Frontend",
      "level": "Junior",
      "postedAt": "5d ago",
      "contract": "Contract",
      "location": "USA Only",
      "languages": ["CSS", "JavaScript"],
      "tools": []
    },
    {
      "id": 5,
      "company": "Loop Studios",
      "logo": "./images/loop-studios.svg",
      "new": false,
      "featured": false,
      "position": "Software Engineer",
      "role": "Fullstack",
      "level": "Midweight",
      "postedAt": "1w ago",
      "contract": "Full Time",
      "location": "Worldwide",
      "languages": ["JavaScript", "Ruby"],
      "tools": ["Sass"]
    },
    {
      "id": 6,
      "company": "FaceIt",
      "logo": "./images/faceit.svg",
      "new": false,
      "featured": false,
      "position": "Junior Backend Developer",
      "role": "Backend",
      "level": "Junior",
      "postedAt": "2w ago",
      "contract": "Full Time",
      "location": "UK Only",
      "languages": ["Ruby"],
      "tools": ["RoR"]
    },
    {
      "id": 7,
      "company": "Shortly",
      "logo": "./images/shortly.svg",
      "new": false,
      "featured": false,
      "position": "Junior Developer",
      "role": "Frontend",
      "level": "Junior",
      "postedAt": "2w ago",
      "contract": "Full Time",
      "location": "Worldwide",
      "languages": ["HTML", "JavaScript"],
      "tools": ["Sass"]
    },
    {
      "id": 8,
      "company": "Insure",
      "logo": "./images/insure.svg",
      "new": false,
      "featured": false,
      "position": "Junior Frontend Developer",
      "role": "Frontend",
      "level": "Junior",
      "postedAt": "2w ago",
      "contract": "Full Time",
      "location": "USA Only",
      "languages": ["JavaScript"],
      "tools": ["Vue", "Sass"]
    },
    {
      "id": 9,
      "company": "Eyecam Co.",
      "logo": "./images/eyecam-co.svg",
      "new": false,
      "featured": false,
      "position": "Full Stack Engineer",
      "role": "Fullstack",
      "level": "Midweight",
      "postedAt": "3w ago",
      "contract": "Full Time",
      "location": "Worldwide",
      "languages": ["JavaScript", "Python"],
      "tools": ["Django"]
    },
    {
      "id": 10,
      "company": "The Air Filter Company",
      "logo": "./images/the-air-filter-company.svg",
      "new": false,
      "featured": false,
      "position": "Front-end Dev",
      "role": "Frontend",
      "level": "Junior",
      "postedAt": "1mo ago",
      "contract": "Part Time",
      "location": "Worldwide",
      "languages": ["JavaScript"],
      "tools": ["React", "Sass"]
    }
  ];

let header = document.getElementsByTagName("header")[0];
let main = document.getElementById("main");
let filterHeader = document.getElementById("filter");
let clear = document.getElementById("clear");
let sections = document.getElementsByTagName("section");

let filterItems = [];

function removeArrayFilter(event) {
    for (let i = 0; i < filterItems.length; ++i) {
      if (event.target.className == filterItems[i])
          filterItems.splice(i, 1);
    }
}

function resetFilter() {
    for (let i = 0; i < sections.length; ++i) {
      sections[i].classList.remove("hidden");
    }
    filterItems = [];
}

function defaultHeader() {
    header.className = "";
    header.style.visibility = "hidden";
    header.style.height = "3.5rem";
}

function clearHeader() {
  let divs = header.getElementsByTagName("div");
  for (let i = divs.length - 1; i >= 0; --i) {
      if (divs[i].id !== "filter" && divs[i].id !== "clear")
        divs[i].remove();
  }
  defaultHeader();
  resetFilter();
}

function checkSpan(event) {
  let spans = header.getElementsByTagName("span");
  for (let i = 0; i < spans.length; ++i) {
      if (event.target.textContent == spans[i].textContent)
          return false;
  }
  return true;
}

function filterAfterRemoveItem() {
  for (let i = 0; i < sections.length; ++i) {
    for (let j = 0; j < filterItems.length; ++j) {
        let rex = new RegExp(`\\b${filterItems[j]}\\b`);
        if (rex.test(sections[i].className))
            sections[i].classList.remove("hidden");
        else {
            sections[i].classList.add("hidden");
            break;
        }
    }
  }
}

function removeItemFilter(event) {
    document.getElementById(event.target.className).remove();
    let divs = header.getElementsByTagName("div");
    if (divs.length === 2) {
        defaultHeader();
        resetFilter();
    } 
    else {
      event.target.classList.remove("idRemove");
      removeArrayFilter(event);
      filterAfterRemoveItem();
    }
}

function filtration(event) {
    let regExp = new RegExp(event.target.textContent);
    for (let i = 0; i < sections.length; ++i) {
        if (!(regExp.test(sections[i].className)))
            sections[i].classList.add('hidden'); 
    }
}

function addItemFilter(event) {
    header.className = "container d-flex justify-content-between align-items-center p-3 shadow rounded";
    if (window.innerWidth < 400) {
        header.classList.add("flex-row");
    }
    header.style.visibility = "visible";
    header.style.height = "auto";

    if (checkSpan(event)) {
      filterItems.push(event.target.textContent);

      let div = document.createElement("div");    
      let closeBtn = document.createElement("button");
      let img = document.createElement("img");
      let span = document.createElement("span");
      
      span.textContent = event.target.textContent;
      div.className = "d-flex align-items-center rounded";
      div.id = "idRemove " + event.target.textContent;
      closeBtn.className = "idRemove " + event.target.textContent;
      img.className = "idRemove " + event.target.textContent;
      img.src = "images/icon-remove.svg";
      
      closeBtn.addEventListener("mousedown", removeItemFilter);
      closeBtn.append(img);
      div.append(span);
      div.append(closeBtn);
      filterHeader.append(div);

      filtration(event);
    }
}

function headerClick(event) {
   event.target.className.split(" ").forEach(e => {
      let fakeEvent = { target: { textContent: e } };
      addItemFilter(fakeEvent);
   });
}

function createButton(text) {
    let btn = document.createElement("button");
    btn.textContent = text;
    btn.addEventListener("mousedown", addItemFilter);
    return btn;
}

for (let i = 0; i < FILE_LIST.length; ++i) {
    let section = document.createElement("section");
    section.className = "d-flex flex-row justify-content-center justify-content-between align-items-center my-4 container p-4 shadow rounded";

    let divLeft = document.createElement("div");
    divLeft.className = "d-flex flex-row justify-content-between align-items-center";

    let divImg = document.createElement("div");
    divImg.className = "me-3";
    let img = document.createElement("img");
    img.src = FILE_LIST[i].logo;
    img.alt = FILE_LIST[i].company;
    divImg.append(img);
    divLeft.append(divImg);

    let divInfo = document.createElement("div");
    let h2 = document.createElement("h2");
    h2.textContent = FILE_LIST[i].company + " ";
    h2.className = "align-items-center";
    let spanH2 = document.createElement("span");
    spanH2.id = "tagsTop";

    if (FILE_LIST[i].new) {
        let spanH2Span = document.createElement("span");
        spanH2Span.textContent = "NEW!";
        spanH2Span.className = "new p-1";
        spanH2.append(spanH2Span);
    }
    if (FILE_LIST[i].featured) {
        let spanH2Span = document.createElement("span");
        spanH2Span.textContent = "FEATURED";
        spanH2Span.classList = "featured p-1";
        spanH2.append(spanH2Span);
        section.classList.add("FEATURED");
    }
    
    h2.append(spanH2);
    divInfo.append(h2);

    let h2Ranks = document.createElement("h2");
    h2Ranks.id = "name";
    h2Ranks.className = FILE_LIST[i].level + " " + FILE_LIST[i].role;
    h2Ranks.textContent = FILE_LIST[i].position;
    h2Ranks.addEventListener("mousedown", headerClick);
    divInfo.append(h2Ranks);

    let tagsBottom = document.createElement("div");
    tagsBottom.id = "tagsBottom";
    let spanPostedAt = document.createElement("span");
    spanPostedAt.innerHTML = FILE_LIST[i].postedAt + " &bull; ";
    tagsBottom.append(spanPostedAt);
    let spanContract = document.createElement("span");
    spanContract.innerHTML = FILE_LIST[i].contract + " &bull; ";
    tagsBottom.append(spanContract);
    let spanLocation = document.createElement("span");
    spanLocation.textContent = FILE_LIST[i].location;
    tagsBottom.append(spanLocation);

    divInfo.append(tagsBottom);
    divLeft.append(divInfo);

    let divRight = document.createElement("div");

    divRight.append(createButton(FILE_LIST[i].role));
    divRight.append(createButton(FILE_LIST[i].level));
    section.classList.add(FILE_LIST[i].role);
    section.classList.add(FILE_LIST[i].level);

    FILE_LIST[i].tools.forEach(tool => {
        divRight.append(createButton(tool));
        section.classList.add(tool)
    });
    FILE_LIST[i].languages.forEach(lang => {
        divRight.append(createButton(lang));
        section.classList.add(lang)
    });

    section.append(divLeft);
    section.append(divRight);
    main.append(section);

    if (window.innerWidth < 400) {
        section.classList.remove("my-4");
        section.classList.remove("p-4");
        section.classList.remove("flex-row");
        section.classList.add("flex-column");
        section.classList.remove("align-items-center");

        divImg.classList.remove("me-3");

        divLeft.classList.remove("flex-row");
        divLeft.classList.add("flex-column");
        divLeft.classList.remove("align-items-center");
        divLeft.style.marginTop = "-1rem";

        divRight.id = "divRight";
    }
}

clear.addEventListener("mousedown", clearHeader);