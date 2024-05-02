//determines if the user has a set theme
function detectColorScheme(){
    let theme="light";    //default to light

    //local storage is used to override OS theme settings
    // if(localStorage.getItem("theme")){
    //     if(localStorage.getItem("theme") == "dark"){
    //         var theme = "dark";
    //     }
    // } else if(!window.matchMedia) {
    //     //matchMedia method not supported
    //     return false;
    // } else if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //     //OS theme setting detected as dark
    //     var theme = "dark";
    // }

    if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
        //OS theme setting detected as dark
        theme = "dark";
    }
    //dark theme preferred, set document with a `data-theme` attribute
    if (theme=="dark") {
         document.documentElement.setAttribute("data-theme", "dark");
    }
}
detectColorScheme();

const toggleSwitch = document.querySelector('.theme-toggle-button');
const btnToggleText = document.querySelector('label[for="theme-toggle-button"] span');
const btnToggleImg = document.querySelector('label[for="theme-toggle-button"] svg');

//function that changes the theme, and sets a localStorage variable to track the theme between page loads
function switchTheme(e) {
    
    if (e.target.checked) {
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleSwitch.checked = true;
        btnToggleText.innerText = "light";
        btnToggleImg.innerHTML = `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero"><path d="M13.545 6.455c-.9-.9-2.17-1.481-3.545-1.481a4.934 4.934 0 00-3.545 1.481c-.9.9-1.481 2.17-1.481 3.545 0 1.376.582 2.646 1.481 3.545.9.9 2.17 1.481 3.545 1.481a4.934 4.934 0 003.545-1.481c.9-.9 1.481-2.17 1.481-3.545a4.934 4.934 0 00-1.481-3.545zM10 3.413a.7.7 0 00.688-.688V.688A.7.7 0 0010 0a.7.7 0 00-.688.688v2.037a.7.7 0 00.688.688zM15.635 5.344l1.455-1.455a.67.67 0 000-.952.67.67 0 00-.952 0l-1.455 1.455a.67.67 0 000 .952c.238.264.66.264.952 0zM19.312 9.312h-2.037a.7.7 0 00-.688.688.7.7 0 00.688.688h2.037A.7.7 0 0020 10a.7.7 0 00-.688-.688zM15.608 14.656a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455a.67.67 0 00.952 0 .67.67 0 000-.952l-1.455-1.455zM10 16.587a.7.7 0 00-.688.688v2.037A.7.7 0 0010 20a.7.7 0 00.688-.688v-2.037a.7.7 0 00-.688-.688zM4.365 14.656L2.91 16.111a.67.67 0 000 .952.67.67 0 00.952 0l1.455-1.455a.67.67 0 000-.952c-.238-.264-.66-.264-.952 0zM3.413 10a.7.7 0 00-.688-.688H.688A.7.7 0 000 10a.7.7 0 00.688.688h2.037A.7.7 0 003.413 10zM4.365 5.344a.67.67 0 00.952 0 .67.67 0 000-.952L3.862 2.937a.67.67 0 00-.952 0 .67.67 0 000 .952l1.455 1.455z"/></g></svg>`
    } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', 'light');
        toggleSwitch.checked = false;
        btnToggleText.innerText = "dark";
        btnToggleImg.innerHTML = `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M19.513 11.397a.701.701 0 00-.588.128 7.496 7.496 0 01-2.276 1.336 7.101 7.101 0 01-2.583.462 7.505 7.505 0 01-5.32-2.209 7.568 7.568 0 01-2.199-5.342c0-.873.154-1.72.41-2.49a6.904 6.904 0 011.227-2.21.657.657 0 00-.102-.924.701.701 0 00-.589-.128C5.32.61 3.427 1.92 2.072 3.666A10.158 10.158 0 000 9.83c0 2.8 1.125 5.342 2.967 7.19a10.025 10.025 0 007.16 2.98c2.353 0 4.527-.822 6.266-2.183a10.13 10.13 0 003.58-5.624.623.623 0 00-.46-.796z" fill-rule="nonzero"/></svg>`
    }    
}

//listener for changing themes
toggleSwitch.addEventListener('change', switchTheme, false);

//pre-check the dark-theme checkbox if dark-theme is set
if (document.documentElement.getAttribute("data-theme") == "dark"){
    toggleSwitch.checked = true;
}



// === API === // 
//const btnSearch = document.querySelector('.search-button');
const form = document.querySelector('#form');
const inputName = document.querySelector('#name');
const errorMessage = document.querySelector('#error');

const resetFilds = () => {

    document.querySelector('.user-avatar').src = '';
    document.querySelector('.user-avatar').alt = 'User not found';
    document.querySelector('.login span').innerText = 'User not found';
    document.querySelector('.name-hashtag').href = '';
    document.querySelector('.name-hashtag').innerText = '';

    document.querySelector('.date').innerText = `...`;

    document.querySelector('.user-bio').innerText = `...`;
    document.querySelector('#repos').innerText = `...`;
    document.querySelector('#followers').innerText = `...`;
    document.querySelector('#following').innerText = `...`;
    document.querySelector('.twitter').innerText = `...`;
    document.querySelector('.link').innerText = `...`;
    document.querySelector('.location').innerText = `...`;
    document.querySelector('.company').innerText = `...`;

}

const getContent = (data) => {


    const generateContent = (value, item, itemContainer) =>{
        if(value || value === 0){
            document.querySelector(item).innerText = value;
            if(itemContainer){
                if(document.querySelector(itemContainer).classList.contains('unavaliable')){
                    document.querySelector(itemContainer).classList.remove('unavaliable');
                }
            } else {
                if(document.querySelector(item).classList.contains('unavaliable')){
                    document.querySelector(item).classList.remove('unavaliable');
                }
            }

            if(item === '.twitter' || item === '.link' ){
                document.querySelector(item).href = value;
            }
            
        } else {
            if(item === '.user-bio'){
                document.querySelector(item).innerText = 'This profile has no bio';
            } else {
                document.querySelector(item).innerText = 'Not Available';
            }
            
            if(itemContainer){
                document.querySelector(itemContainer).classList.add('unavaliable');
            } else {
                document.querySelector(item).classList.add('unavaliable');
            }
            if(item === '.twitter' || item === '.link' ){
                document.querySelector(item).href = '';
            }
        }   
    }

    document.querySelector('.user-avatar').src = data.avatar_url;
    document.querySelector('.user-avatar').alt = data.login;
    document.querySelector('.login span').innerText = data.login;
    document.querySelector('.name-hashtag').href = `https://github.com/${inputName.value}`;
    document.querySelector('.name-hashtag').innerText = `@${data.login}`;

    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var createDate = new Date(data.created_at);
    var formatedCreateDate = `${createDate.getDay()} ${month[createDate.getMonth()]} ${createDate.getFullYear()}`
    document.querySelector('.date').innerText = `Joined ${formatedCreateDate}`;

    generateContent(data.bio, '.user-bio');
    generateContent(data.public_repos, '#repos');
    generateContent(data.followers, '#followers');
    generateContent(data.following, '#following');
    
    generateContent(data.twitter_username, '.twitter', '.twitter-container');
    generateContent(data.blog, '.link', '.link-container');
    generateContent(data.location, '.location', '.location-container');
    generateContent(data.company, '.company', '.company-container');

}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if(inputName.value === ''){
        errorMessage.classList.remove('hide');
        return
    }
    fetchData();
   
})
async function fetchData(){
    try{
        const response = await fetch(`https://api.github.com/users/${inputName.value}`)

        if(!response.ok){
            if(errorMessage.classList.contains('hide')){
                errorMessage.classList.remove('hide');
            }
            resetFilds();
            throw new Error("Could not fetch resource")
        }
        const data = await response.json();
        errorMessage.classList.add('hide');
        getContent(data);        

        //console.log(data)
    }
    catch(error){
        console.log(error);
    }
}