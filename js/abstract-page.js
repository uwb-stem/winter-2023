// alert("hello");
const projectId = location.search.substring(1);
const room = projectId[5];
const jsonfile = 'js/csseRoom' + room + '.json' 

let abstracts = JSON.parse(readTextFile(jsonfile))['csse'];

studentIndex = findStudent(projectId);
loadAbstract(studentIndex);

function findStudent(projectId) {
    for (let i = 0; i < abstracts.length; i++) {
        if (abstracts[i].projectId === projectId) {
            return i;
        }
    }
}

function loadAbstract(studentIndex) {
    let abstractFromFile = abstracts[studentIndex];

    let container = document.getElementById("abstract");

    // Abstract heading with gold bar
    let heading = document.createElement("section");
    heading.classList.add("abstract-heading");

    let h1 = document.createElement("h1");
    h1.innerHTML = abstractFromFile.title;
    let h2 = document.createElement("h2");
    h2.innerHTML = abstractFromFile.studentName;
    let goldBar = document.createElement("figure");

    heading.appendChild(h1);
    heading.appendChild(h2);
    heading.appendChild(goldBar);

    container.appendChild(heading);

    // abstract
    let projectInfo = document.createElement("p");
    projectInfo.classList.add("text", "abstract-text");
    let type = "Project type";
    type = type.bold();
    projectInfo.innerHTML = type + ": " + abstractFromFile.projectType + "<br/>";
    let advisor = "Faculty advisor";
    advisor = advisor.bold();
    projectInfo.innerHTML += advisor + ": " + abstractFromFile.facultyAdvisor + "<br/>";
    container.appendChild(projectInfo);

    let abstract = abstractFromFile.abstract;
    abstract = abstract.split("\n\n");

    for (let i = 0; i < abstract.length; i++) {
        let abstractText = document.createElement("p");
        abstractText.classList.add("text", "abstract-text");
        abstractText.innerText = abstract[i].replace("\n\n", "");
        container.appendChild(abstractText);
    }

    // poster image
    let poster = document.createElement("figure");
    poster.classList.add("shadow");
    let posterImg = document.createElement("img");
    posterImg.src = abstractFromFile.posterLink;
    poster.appendChild(posterImg);
    container.append(poster);

    // view full-size button
    let fullSizeBtn = document.createElement("a");
    fullSizeBtn.href = abstractFromFile.posterLink;
    fullSizeBtn.classList.add("full-poster-btn");
    fullSizeBtn.innerHTML = "View full-sized poster";
    container.append(fullSizeBtn);
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
