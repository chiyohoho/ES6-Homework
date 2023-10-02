const callElement = id => { return document.querySelector(id) }
// ------------------------------------------------------------
const foodInfoImg = callElement("#info_image")
const foodInfoID = callElement("#info_id")
const foodInfoName = callElement("#info_name")
const foodInfoType = callElement("#info_type")
const foodInfoPrice = callElement("#info_price")
const foodInfoDiscount = callElement("#info_discount")
const foodInfoStatus = callElement("#info_status")
const foodInfoAbout = callElement("#info_about")

const showTBody = callElement("#tbody_item")

let foodList = []

// FUNCTION CALL API
const callAPI = () => {
    axios({
        method: 'get',
        url: 'https://6516d0e109e3260018ca59a0.mockapi.io/FoodList',
    })
        .then(function (response) {
            foodList = response.data
            showFoodList()
        })
        .catch((error) => {
            alert('Sai link API rồi');
        });
}
callAPI()
// ------------------------------------------------------------

// FUNCTION ADD ITEM TO REVIEW FOOD
const addItemToReview = () => {
    const inputName = callElement("#input_name").value
    const inputImage = callElement("#input_img").value
    const inputAbout = callElement("#input_about").value
    const inputID = Number(callElement("#input_code").value)
    const inputPrice = Number(callElement("#input_price").value)
    const inputType = Number(callElement("#select_mon").value)
    const inputDiscount = Number(callElement("#select_discount").value)
    const inputStatus = Number(callElement("#select_status").value)

    let textFoodType, textFoodDiscount, textFoodStatus
    if (inputID && inputName && inputPrice && inputImage && (inputType !== 0) && (inputDiscount !== 0) && (inputStatus !== 0) && inputAbout) {
        switch (inputType) {
            case 1:
                textFoodType = "Món Chay"
                break
            case 2:
                textFoodType = "Mặn"
                break
        }

        switch (inputDiscount) {
            case 1:
                textFoodDiscount = "10%"
                break
            case 2:
                textFoodDiscount = "20%"
                break
            case 3:
                textFoodDiscount = "30%"
                break
        }

        switch (inputStatus) {
            case 1:
                textFoodStatus = "Đã hết"
                break
            case 2:
                textFoodStatus = "Vẫn còn"
                break
        }

        foodInfoImg.src = inputImage
        foodInfoID.textContent = inputID
        foodInfoName.textContent = inputName
        foodInfoType.textContent = textFoodType
        foodInfoDiscount.textContent = textFoodDiscount
        foodInfoStatus.textContent = textFoodStatus
        foodInfoAbout.textContent = inputAbout
        foodInfoPrice.textContent = inputPrice
    } else {
        alert("Vui lòng không để trống bất kỳ thông tin nào")
    }

}
// ------------------------------------------------------------

// FUNCTION SHOW FOOD LIST
const showFoodList = () => {
    let str = ``
    foodList.map((item, index) => {
        str += `
        <tr id="category_item">
                    <td>${item.id}</td>
                    <td><img src="https://static.kfcvietnam.com.vn/images/category/lg/COMBO%201%20NGUOI.jpg" alt=""
                            style="width: 50px; height: 30px;"></td>
                    <td>KFC</td>
                    <td>500,000</td>
                    <td>Món mặn</td>
                    <td>10%</td>
                    <td>Đã hết</td>
                    <td style="display: flex; gap: 12px;">
                        <span class="material-symbols-outlined btn_item btn_delete" onclick="deleteItem(${item.id})">delete</span>
                        <span class="material-symbols-outlined btn_item btn_edit">edit</span>
                    </td>
                </tr>
        `
    })
    showTBody.innerHTML = str
}
// ------------------------------------------------------------

// FUNCTION DELETE ITEM IN FOOD LIST 
const deleteItem = (id) => {
    axios({
        method: 'delete',
        url: `https://6516d0e109e3260018ca59a0.mockapi.io/FoodList/${id}`,
    })
        .then(function (response) {
            if (response.data) {
                alert(`Đã xóa thành công món ${response.data.name} có ID là ${response.data.id}`);
                callAPI();
            }
        })
        .catch((error) => {
            alert('Sai link API rồi');
        });
}



