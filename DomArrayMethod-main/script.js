document.getElementById('addUser').addEventListener('click', addUser);
document.getElementById('doubleWealth').addEventListener('click', doubleWealth);
document.getElementById('showMilli').addEventListener('click', filterMilli);
document.getElementById('sortWealth').addEventListener('click', sortRichest);
document.getElementById('calcWealth').addEventListener('click', calcAllWealth);

let userDatas = [];

getData();


   // Fetch random users
function getData() {
    fetch('https://randomuser.me/api/?results=100')
        .then(res => res.json())
        .then(data => {
            const firstFiveResult = data.results.splice(0,5)
            const firstFiveData = []
            firstFiveResult.forEach((author) => {
                const authorData = {
                    name: `${author.name.first} ${author.name.last}`,
                    money: Math.floor(Math.random() * 1000000)

                }
                firstFiveData.push(authorData)
            })
            userDatas.push(...firstFiveData);
            updateUser();
         })
    
};

    //Add Users And Their Money
function addUser () {
    fetch('https://randomuser.me/api/?results=100')
    .then(res => res.json())
    .then(res => {
        const result = res.results.splice(0,1)
        const data = []
        result.forEach((author) => {
            const authorData = {
                name: `${author.name.first} ${author.name.last}`,
                money: Math.floor(Math.random() * 1000000)
            }
            data.push(authorData)
        })
        userDatas.push(...data);
        updateUser();
     })

}

     //Double Wealth
function doubleWealth() {
    userDatas = userDatas.map(userData => {
        return { ...userData, money: userData.money * 2 }
    });
        updateUser();  
}
    //Filter Only Millionaires
function filterMilli() {
    userDatas = userDatas.filter(userData => userData.money > 1000000);
        updateUser();
}

    //Sort Users By Wealthiest
function sortRichest() {
    userDatas = userDatas.sort((a, b) => b.money - a.money);
    updateUser();
    
}
    //Combined Sum Of Wealths
function calcAllWealth() {
    const riches = userDatas.reduce((cur, author) => (cur += author.money), 0);

    const allRiches = document.createElement('div');
    allRiches.innerHTML = `<h4 class="fw-bold mt-3">Combined Riches: ${convertedMoney(riches)}</h4>`;
    main.appendChild(allRiches);
}

    //Formatting Money To Currency 
function convertedMoney(number) {
   return `${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number)}`;
}




    //Updating The user
function updateUser() {
    let main = "";
            userDatas.map((data)=>{

                main  += `
                   <div class=" mt-2 py-2 text-black">
                    <div id="output" class="person d-flex justify-content-between">
                    <h4 id='name'>${data.name}</h4>
                    <p id='money'>${convertedMoney(data.money)}</p>
                    </div>
                   </div>
                `;  
        })
        document.getElementById('main').innerHTML = main;  

}