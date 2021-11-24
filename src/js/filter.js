import dataProjects from './dataProjects';

export default (function filterField() {
    let filterField = [];
    const dataFilter = dataProjects.map(item => {
        filterField = [...filterField, ...item.project, ...item.languages]
    })
    return { filterField: [... new Set(filterField)] };
})()