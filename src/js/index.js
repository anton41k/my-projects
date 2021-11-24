import '../sass/main.scss';
import dataProjects from './dataProjects';
import projectTemplaters from '../templaters/project.hbs';
import filterTemplaters from '../templaters/filter.hbs';
import getRefs from './get-refs';
import filterField from './filter';

const refs = getRefs();
refs.projects.innerHTML = projectTemplaters(dataProjects);
refs.filter.innerHTML = filterTemplaters(filterField);

refs.filter.addEventListener('click', onFilter);
refs.projects.addEventListener('mouseover', onProjectOver);
refs.projects.addEventListener('mouseout', onProjectOut);

function onProjectOver(ev) {
    const elem = ev.target;
    if (elem.classList.contains("project_img")) {
        toggleUrl(elem);
    }
    else if (elem.classList.contains("project_name")) {
        const descriptionCard = elem.parentNode.previousElementSibling.lastElementChild
        descriptionCard.style.transform = 'translatey(-100%)';
    }
}

function onProjectOut(ev) {
    const elem = ev.target;
    if (elem.classList.contains("project_img")) {
        toggleUrl(elem);
    }
    else if (elem.classList.contains("project_name")) {
        const descriptionCard = elem.parentNode.previousElementSibling.lastElementChild
        descriptionCard.style.transform = 'translatey(0%)';
    }
}

function toggleUrl(elem) {
    const srcUrl = elem.getAttribute('src');
    const dataUrl = elem.dataset.gif;
    elem.dataset.gif = srcUrl;
    elem.setAttribute('src', dataUrl);
}

function onFilter(ev) {
    let filter = [];
    const btnProject = ev.target;
    const dataBtn = btnProject.dataset.project;
    const currentProject = Array.from(ev.currentTarget.children);

    currentProject.forEach(item => {
        const btn = item.firstElementChild;
        const dataItem = btn.dataset.project;
        const isCurrent = btn.classList.contains('current');
        if ( isCurrent && dataItem!==dataBtn) {
            btn.classList.toggle('current');
        }
        else if (!isCurrent && dataItem === dataBtn) {
            btn.classList.toggle('current');
        }
    });
    
    if (dataBtn === 'all') {
        filter = dataProjects;
    }
    else {
        filter = dataProjects.filter(project =>
            project.project.includes(dataBtn) || project.languages.includes(dataBtn)
        );
    }
    refs.projects.innerHTML = projectTemplaters(filter);
}