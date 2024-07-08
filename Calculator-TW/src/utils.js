const grid = () => {
    return createDiv("grid grid-cols-5 gap-2");
}

const createDiv = (classList, id="") => {
    const div = document.createElement("div");
    div.classList.add(...processClassList(classList));
    div.id = id;
    return div;
}

const processClassList = (classList) => {
    return classList.split(" ").filter(cls => cls.trim() !== "");
}

export {
    grid,
    createDiv,
    processClassList
}