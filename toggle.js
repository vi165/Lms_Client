const lightBtn = document.getElementById('lightBtn');
const darkBtn = document.getElementById('darkBtn');

lightBtn.addEventListener('click', () => {
    document.body.classList.remove('dark');
});

darkBtn.addEventListener('click', () => {
    document.body.classList.add('dark');
});

lightBut.addEventListener('click', () => setTheme('light'));
darkBut.addEventListener('click', () => setTheme('dark'));
const setTheme = (theme) => {
    if(theme === 'dark') {      
        document.body.classList.add('dark');
    }               
    else {      
        document.body.classList.remove('dark');     

    }           
}
