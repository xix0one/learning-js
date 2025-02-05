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
  
let main = document.getElementById("main");

function createButton(text, className) {
    let btn = document.createElement("button");
    btn.textContent = text;
    // btn.className = className;
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
    let spanH2 = document.createElement("span");
    spanH2.id = "tagsTop";

    if (FILE_LIST[i].new) {
        let spanH2Span = document.createElement("span");
        spanH2Span.textContent = "NEW! ";
        spanH2.append(spanH2Span);
    }
    if (FILE_LIST[i].featured) {
        let spanH2Span = document.createElement("span");
        spanH2Span.textContent = "FEATURED";
        spanH2.append(spanH2Span);
    }
    
    h2.append(spanH2);
    divInfo.append(h2);

    let h2Ranks = document.createElement("h2");
    h2Ranks.id = "name";
    h2Ranks.textContent = FILE_LIST[i].position;
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

    FILE_LIST[i].tools.forEach(tool => {
        divRight.append(createButton(tool));
    });
    FILE_LIST[i].languages.forEach(lang => {
        divRight.append(createButton(lang));
    });

    section.append(divLeft);
    section.append(divRight);
    main.append(section);
}