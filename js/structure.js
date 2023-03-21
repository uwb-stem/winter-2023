
/* ---------------------------- Side Navigation Bar ---------------------------- */
var navIsOpen = false;

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {

    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginRight = "300px";
    document.getElementById("sideNavBtn").innerHTML = "Close Index";
    
    let projects = document.querySelectorAll(".projectUl");
    presentationMargin = window.innerWidth / 2 - 640;

    for (let i  = 0; i < projects.length; i++) {
        projects[i].style.width = "600px";
        // projects[i].style.marginLeft = "300px";
        projects[i].style.marginLeft = presentationMargin + "px";
    }
    navIsOpen = true;
}
  
/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {

    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
    document.body.style.backgroundColor = "#EFEDE4";
    document.getElementById("sideNavBtn").innerHTML = "See All Projects";

    let projects = document.querySelectorAll(".projectUl");

    for (let i  = 0; i < projects.length; i++) {
        projects[i].style.width = "1000px";
        projects[i].style.margin = "auto";
    }

    navIsOpen = false;
}

function sideNavEvent(className) {
    if (navIsOpen) {
        closeNav(className);
    } else {
        openNav(className);
    }
}

function changeOpactiy(tagName, opacity) {
    let elements = document.getElementsByTagName(tagName);

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.opacity = opacity;
    }
}

function dimBackground() {
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    changeOpactiy("img", "0.5");
    changeOpactiy("button", "0.4");
    changeOpactiy("hr", "0.4");
}

function undimBackground() {
    changeOpactiy("img", "1");
    changeOpactiy("button", "1");
    changeOpactiy("hr", "1");
}

/* --------------------------- Multiple Rooms Implementation --------------------------- */
const zoomLinks = [
    'https://google.com',
    'https://google.com',
    'https://google.com',
    'https://google.com',
    /* 'https://google.com',
    'https://google.com',
    'https://google.com' */
]

if (typeof document.getElementById("room-1-presentations") != "undefined") {
    loadCSSEPresentations("room-1-presentations", "js/csseRoom1.json");
    loadCSSEPresentations("room-2-presentations", "js/csseRoom2.json");
    loadCSSEPresentations("room-3-presentations", "js/csseRoom3.json");
    loadCSSEPresentations("room-4-presentations", "js/csseRoom4.json");
    /* loadCSSEPresentations("room-5-presentations", "js/csseRoom5.json");
    loadCSSEPresentations("room-6-presentations", "js/csseRoom6.json");
    loadCSSEPresentations("room-7-presentations", "js/csseRoom7.json"); */
    loadTitleToSideNav("js/csseRoom1.json");
    loadTitleToSideNav("js/csseRoom2.json");
    loadTitleToSideNav("js/csseRoom3.json");
    loadTitleToSideNav("js/csseRoom4.json");
    /* loadTitleToSideNav("js/csseRoom5.json");
    loadTitleToSideNav("js/csseRoom6.json");
    loadTitleToSideNav("js/csseRoom7.json"); */
}

function printNumResults(num, searchKey) {
    let container = document.getElementById("num-result");
    let text = document.createTextNode("Found " + num + " results for '" + searchKey + "'.");
    container.appendChild(text);
}

function search(projectId) {

    let presentations;
    let isREU = false;
    let addAbstractButton = false;

    if (projectId.includes('preu')) {
        presentations = JSON.parse(readTextFile('./js/reu.json'))['preu'];
        isREU = true;
    } else if (projectId.includes('ereu')) {
        presentations = JSON.parse(readTextFile('./js/ereu.json'))['ereu'];
        isREU = true;
    } else if (projectId.includes('bio')) {
        presentations = JSON.parse(readTextFile('./js/bio.json'))['bio'];
    } else if (projectId.includes('phys')) {
        presentations = JSON.parse(readTextFile('./js/chem + phys.json'))['phys'];
    } else if (projectId.includes('chem')) {
        presentations = JSON.parse(readTextFile('./js/chem + phys.json'))['chem'];
    } else if (projectId.includes('ee')) {
        presentations = JSON.parse(readTextFile('./js/ee.json'))['ee'];
    } else if (projectId.includes('ac')) {
        presentations = JSON.parse(readTextFile('./js/ac.json'))['ac'];
    } else {
        const room = projectId[5];
        const jsonfile = './js/csseRoom' + room + '.json';
        presentations = JSON.parse(readTextFile(jsonfile))['csse'];
        addAbstractButton = true;
    }

    for (let i = 0; i < presentations.length; i++) {
        if (presentations[i].projectId === projectId) {
            createPresentationBox(presentations[i], "", isREU, addAbstractButton);
        }
    }
}

function loadCSSEPresentations(room, jsonfile) {
    let container = document.getElementById(room);
    let presentations = JSON.parse(readTextFile(jsonfile))['csse'];

    let zoomLinkText = document.createElement("p");
    zoomLinkText.classList.add("text");
    let zoomLink = document.createElement("a");
    zoomLink.href = zoomLinks[presentations[0].projectId[5] - 1];
    zoomLink.target = '_blank';
    //zoomLink.innerHTML = "Click here to join the live CSSE presentations in room " +  presentations[0].projectId[5];
    // zoomLinkText.innerText = "Click here to join the live CSSE presentations in room " + presentations[0].projectId[5];
    zoomLinkText.appendChild(zoomLink);

    container.appendChild(zoomLinkText);

    
    
    for (let i = 0; i < presentations.length; i++) {
        /*
        if (i == 0) {
            
            if (room == 'room-1-presentations') {
                let contentDiv = document.createElement("div");
                contentDiv.classList.add("info-box");

                let boxTime = document.createElement("h4");     
                boxTime.appendChild(document.createTextNode("1:05 PM - 1:30 PM"));

                let words = document.createElement("p");
                words.appendChild(document.createTextNode("Applied Computing Presentations"));

                contentDiv.appendChild(boxTime);
                contentDiv.appendChild(words);
                container.appendChild(contentDiv);
            } 
        }
*/
        createPresentationBox(presentations[i], container, false, true);
    }
    
    
}

function createPresentationBox(presentationInfo, container, isREU, addAbstractButton) {
    
    if (container === "") {
        container = document.getElementById("presentation");
        // presentationInfo = JSON.parse(presentationInfo);
    }
    
    let presentation = document.createElement("section");
    presentation.classList.add("presentation");

    // add projectId so that when user click on the project on side nav,
    // it goes to the correct presentation box
    presentation.setAttribute("id", presentationInfo.projectId);

    if (isREU) {
        presentation.classList.add("reu");
    }

    let contentUl = document.createElement("ul");
    // contentUl.classList.add("projectUl");
    let textLi = document.createElement("li");

    // time
    let time = document.createElement("p");
    time.classList.add("present-time");
    time.appendChild(document.createTextNode(presentationInfo.time));
    textLi.appendChild(time);

    // short black line
    let blackLine = document.createElement("hr");
    blackLine.classList.add("short-black-line");
    textLi.appendChild(blackLine);

    // project title
    let title = document.createElement("h3");
    title.appendChild(document.createTextNode(presentationInfo.title));
    textLi.appendChild(title);

    addStudents(presentationInfo, textLi, isREU);

    // faculty advisor
    let advisor = document.createElement("p");
    advisor.appendChild(document.createTextNode("Faculty advisor: " + presentationInfo.facultyAdvisor));
    textLi.appendChild(advisor); 

    // button to abstract page
    if (addAbstractButton) {
        let space = document.createElement("div");
        space.classList.add("small-space");
        textLi.appendChild(space);

        let abstractPageBtn = document.createElement("a");
        abstractPageBtn.href = './csse-abstract-page.html?' + presentationInfo.projectId;
        abstractPageBtn.target = '_blank';
        abstractPageBtn.classList.add("uw-btn", "btn-sm");
        abstractPageBtn.innerHTML = "Read abstract";
        textLi.appendChild(abstractPageBtn);
    }

    // poster image
    let posterLi = document.createElement("li");
    let posterImg = document.createElement("img");
    posterImg.setAttribute('src', presentationInfo.posterLink);
    posterLi.appendChild(posterImg);

    contentUl.appendChild(textLi);
    contentUl.appendChild(posterLi);
    presentation.appendChild(contentUl);
    container.appendChild(presentation);
}

function addStudents(presentationInfo, textLi, isREU) {

    let studentDiv = document.createElement("div");

    if (presentationInfo.group) {               // if "group" exists in json, e.g. csse-room-6
        addGroup(presentationInfo, studentDiv);

    } else if (isREU) {
        studentDiv.classList.add("students-extend", "reu-student");
        let div = document.createElement("div");

        let studentName = document.createElement("h4");     // student name
        studentName.appendChild(document.createTextNode(presentationInfo.studentName));
        div.appendChild(studentName);

        let university = document.createElement("h5");           // university
        university.classList.add("university");
        university.appendChild(document.createTextNode(presentationInfo.university));
        div.appendChild(university);
        studentDiv.appendChild(div);
    } else {
        studentDiv.classList.add("students");

        let studentName = document.createElement("h4");     // student name
        studentName.appendChild(document.createTextNode(presentationInfo.studentName));
        studentDiv.appendChild(studentName);

        let major = document.createElement("h5");           // major
        major.classList.add("majors");
        major.appendChild(document.createTextNode(presentationInfo.studentMajor));
        studentDiv.appendChild(major);
    }

    textLi.appendChild(studentDiv);

    let projectType = document.createElement("p");       // project type
    projectType.appendChild(document.createTextNode("Project type: " + presentationInfo.projectType));
    textLi.appendChild(projectType);
}

function addGroup(presentationInfo, studentDiv) {
    studentDiv.classList.add("students");
    let studentName = document.createElement("h4");
    let major = document.createElement("h5");
    major.classList.add("majors");

    for (let i = 0; i < presentationInfo.group.length; i++) {
        studentName.innerHTML += presentationInfo.group[i].studentName + "<br/>";
        major.innerHTML += presentationInfo.group[i].studentMajor + "<br/>";
    }

    studentDiv.appendChild(studentName);
    studentDiv.appendChild(major);
}

function loadTitleToSideNav(jsonfile) {
    let sideNav = document.getElementById('mySidenav');
    let presentations = JSON.parse(readTextFile(jsonfile))['csse'];

    let roomDiv = document.createElement("div");
    roomDiv.classList.add("side-room-number");
    roomDiv.innerHTML = "Room " + presentations[0].projectId[5];

    let ul = document.createElement("ul");

    for (let j = 0; j < presentations.length; j++) {
        let presentationLi = document.createElement("li");
        presentationLi.classList.add("sidenav-title");
        presentationLi.setAttribute("data-id", presentations[j].projectId);
        
        let aTitle = document.createElement('a');
        let studentName = document.createElement('span');
        
        if (presentations[j].group) {
            for (let k = 0; k < presentations[j].group.length; k++) {
                studentName.innerHTML += presentations[j].group[k].studentName + "<br/>";
            }
        } else {
            studentName.appendChild(document.createTextNode(presentations[j].studentName));
        }
        aTitle.innerHTML = presentations[j].title + "<br/>";
        aTitle.appendChild(studentName);
        aTitle.href = '#';

        presentationLi.appendChild(aTitle);
        ul.appendChild(presentationLi);
    }

    sideNav.appendChild(roomDiv);
    sideNav.appendChild(ul);
}

function readTextFile(file) {
    let raw_file = new XMLHttpRequest();
    raw_file.open("GET", file, false);
    let file_content = "";
    raw_file.onreadystatechange = function ()
    {
        if (raw_file.readyState === 4)
        {
            if (raw_file.status === 200 || raw_file.status == 0)
            {
                file_content = raw_file.responseText;
            }
        }
    }
    raw_file.send(null);
    
    return file_content;
}

// Print nav bar from html template file
// document.getElementById("navb").innerHTML = readTextFile("js/navbar.html");

// console.log(navIsOpen);

// while (navisOpen == true) {
//     while (window.scrollY >= 175) {
//         document.getElementById("mySidenav").style.height = "100%";
//         document.getElementsByClassName
//     }

//     while (window.scrollY < 175) {
//         changeMargin = 175 - window.scrollY;
//         document.getElementsByClassName("sidenav").style.marginTop = changeMargin;//.toString();
//     }
// }
