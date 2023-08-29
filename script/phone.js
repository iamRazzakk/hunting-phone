const loadPhone = async (searchText = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    // console.log(phones);
    DisplayPhone(phones, isShowAll)
}
const DisplayPhone = (phone, isShowAll) => {
    // console.log(phone);
    // step-1 get the id
    const phoneContainer = document.getElementById('phone-container')
    // clear phone container
    phoneContainer.textContent = " "
    // if phone.lenth > 12 than show this sell all hidden btn
    const showAllContainer = document.getElementById('showAllContainer')
    if (phone.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    } else {
        showAllContainer.classList.add("hidden")
    }
    // display first 12
    if (!isShowAll) {
        phone = phone.slice(0, 12)
    }
    phone.forEach(phone => {
        // console.log(phone);
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
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Detail more</button>
            </div>
        </div>
    `;
        // step- 4 appendChild
        phoneContainer.appendChild(phoneCard)
    });
    // hide loading spiner
    toggleSpinner(false)

}
// 
const handleShowDetail = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    // console.log(data);
    const phone = data.data
    showPhoneDetail(phone)
}

// display 
const showPhoneDetail = (phone) => {
    console.log(phone);
    // show the modal
    const phoneName = document.getElementById('show-detail-phone-name')
    phoneName.innerText = phone.name
    show_modal_detail.showModal()
    const showDetailContainer = document.getElementById('show-detail-container')
    showDetailContainer.innerHTML = `
    <img class = "mx-auto mt-4" src="${phone.image}" alt="Description of the image">
    <P class = "mt-4 text-xl text-white py-4"><span>Storage: </span> ${phone.mainFeatures.storage}</P>
    <p class = "text-base"><span>Display size :</span> ${phone?.mainFeatures?.displaySize}</p>
    <p><span>Chipset : </span>${phone.mainFeatures.chipSet}</p>
    <p><span>GPS : </span>${phone?.others?.GPS || "No GPS Available"}</p>
    <p><span>brand : </span>${phone.brand}</p>
    `
}



const btnHandler = (isShowAll) => {
    toggleSpinner(true)
    const searchField = document.getElementById('serchField')
    const serchText = searchField.value
    console.log(serchText);
    loadPhone(serchText, isShowAll)
}

// const btnHandler2 = () => {
//     toggleSpinner(true)
//     const serchField = document.getElementById("serchField2")
//     const serchText = serchField.value
//     loadPhone(serchText)
// }
// handle search recap
const toggleSpinner = (isLoading) => {
    const loadingSpiner = document.getElementById('loadingSpinar')
    if (isLoading) {
        loadingSpiner.classList.remove("hidden")
    } else {
        loadingSpiner.classList.add("hidden")
    }
}

// handle show all
const handleShowAll = () => {
    btnHandler(true)
}

loadPhone()


