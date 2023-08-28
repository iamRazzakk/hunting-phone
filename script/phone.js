const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    // console.log(phones);
    DisplayPhone(phones)
}
const DisplayPhone = phone => {
    // console.log(phone);
    // step-1 get the id
    const phoneContainer = document.getElementById('phone-container')
    // clear phone container
    phoneContainer.textContent = " "
    // if phone.lenth > 12 than show this sell all hidden btn
    const showAllContainer = document.getElementById('showAllContainer')
    if(phone.length > 12){
        showAllContainer.classList.remove('hidden')
    }else{
        showAllContainer.classList.add("hidden")
    }
    // display first 12
    phone = phone.slice(0,12)
    phone.forEach(phone => {
        console.log(phone);
        // step-2 Create a div
        const phoneCard = document.createElement("div")
        phoneCard.classList = `card bg-gray-100 p-6 shadow-xl`
        // step 3 set innerHtml
        phoneCard.innerHTML =
            `
        <figure><img src="${phone.image}" />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
    `;
        // step- 4 appendChild
        phoneContainer.appendChild(phoneCard)
    });

}
const btnHandler = () => {
    const searchField = document.getElementById('serchField')
    const serchText = searchField.value
    console.log(serchText);
    loadPhone(serchText)
}

const btnHandler2 = () => {
    const serchField = document.getElementById("serchField2")
    const serchText = serchField.value
    loadPhone(serchText)
}

// loadPhone()