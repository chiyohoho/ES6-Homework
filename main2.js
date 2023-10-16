const callElement = id => { return document.querySelector(id) }
const getIdElement = id => { return document.getElementById(id) }
// ------------------------------------------------------------
const foodInfoImg = callElement("#info_image")
const foodInfoID = callElement("#info_id")
const foodInfoName = callElement("#info_name")
const foodInfoType = callElement("#info_type")
const foodInfoPrice = callElement("#info_price")
const foodInfoDiscount = callElement("#info_discount")
const foodInfoStatus = callElement("#info_status")
const foodInfoAbout = callElement("#info_about")

const showModalNe = callElement("#show_modal")
const showTBody = callElement("#tbody_item")
const saveEditButton = callElement("#btn_saveEdit")

let foodList = []
let textFoodType, textFoodDiscount, textFoodStatus
let swapSort = false

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

    if (inputID && inputName && inputPrice && inputImage && (inputType !== 0) && (inputDiscount !== 0) && (inputStatus !== 0) && inputAbout) {
        switch (inputType) {
            case 1:
                textFoodType = "Món Chay"
                break
            case 2:
                textFoodType = "Món Mặn"
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


        let checkID = foodList.some((item) => {
            return inputID == item.foodid;
        })

        if (checkID) {
            alert(`ID ${inputID} đã tồn tại, vui lòng chọn 1 ID khác`)
        } else {
            foodInfoImg.src = inputImage
            foodInfoID.textContent = inputID
            foodInfoName.textContent = inputName
            foodInfoType.textContent = textFoodType
            foodInfoDiscount.textContent = textFoodDiscount
            foodInfoStatus.textContent = textFoodStatus
            foodInfoAbout.textContent = inputAbout
            foodInfoPrice.textContent = inputPrice
        }
    } else {
        alert("Vui lòng không để trống bất kỳ thông tin nào")
    }

}
// ------------------------------------------------------------

// FUNCTION SHOW FOOD LIST
const showFoodList = () => {
    let str = ``
    let showModal = ``
    foodList.map((item, index) => {
        let itemName = item.name
        let itemID = item.foodid
        let itemPrice = item.price
        let itemStatus = item.status
        let itemType = item.type
        let itemAbout = item.about
        let itemDiscount = item.discount
        let itemImage = item.image

        str += `
        <tr id="category_item">
                    <td>${itemID}</td>
                    <td class="img_hover_flex">
                    <div class="img_hover"><img src="${itemImage}" alt=""
                    style="width: 50px; height: 30px;"></div>
                    <td>${itemName}</td>
                    <td>${itemPrice.toLocaleString("vi-VN")}</td>
                    <td>${itemType}</td>
                    <td>${itemDiscount}</td>
                    <td>${itemStatus}</td>
                    <td>
                        <span class="material-symbols-outlined btn_item btn_delete" onclick="deleteItem(${itemID})">delete</span>
                        <span class="material-symbols-outlined btn_item btn_edit" data-toggle="modal" data-target="#exampleModal${itemID}">edit</span>
                    </td>
        </tr>
        `
        showModal += `
        <div class="modal fade" id="exampleModal${itemID}" tabindex="-1" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Chỉnh sửa món ăn</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="form_input form1 d-flex flex-column">
                                    <label for="edit_code${itemID}">Mã món</label>
                                    <input type="text" id="edit_code${itemID}" placeholder="Nhập ID" class="add_product_input">
                                </div>

                                <div class="form_input form2 d-flex flex-column">
                                    <label for="edit_name${itemID}">Tên món ăn</label>
                                    <input type="text" id="edit_name${itemID}" placeholder="Nhập tên món"
                                        class="add_product_input">
                                </div>

                                <div class="form_input form3 d-flex flex-column">
                                    <label for="edit_select_mon${itemID}">Loại món ăn</label>
                                    <select name="" id="edit_select_mon${itemID}" class="add_product_input">
                                        <option selected hidden disabled value="0">Vui lòng chọn</option>
                                        <option value="1">Món chay</option>
                                        <option value="2">Món mặn</option>
                                    </select>
                                </div>

                                <div class="form_input form4 d-flex flex-column">
                                    <label for="edit_price${itemID}">Giá món ăn</label>
                                    <input type="text" id="edit_price${itemID}" placeholder="Nhập giá món"
                                        class="add_product_input">
                                </div>

                                <div class="form_input form5 d-flex flex-column">
                                    <label for="edit_select_discount${itemID}">Khuyến mãi (%)</label>
                                    <select name="" id="edit_select_discount${itemID}" class="add_product_input">
                                        <option selected hidden disabled value="0">Vui lòng chọn</option>
                                        <option value="1">10</option>
                                        <option value="2">20</option>
                                        <option value="3">30</option>
                                    </select>
                                </div>

                                <div class="form_input form6 d-flex flex-column">
                                    <label for="edit_select_status${itemID}">Tình trạng món ăn</label>
                                    <select name="" id="edit_select_status${itemID}" class="add_product_input">
                                        <option selected hidden disabled value="0">Vui lòng chọn</option>
                                        <option value="1">Đã hết</option>
                                        <option value="2">Vẫn còn</option>
                                    </select>
                                </div>

                                <div class="form_input form7 d-flex flex-column">
                                    <label for "edit_img${itemID}"> Hình ảnh món ăn </label>
                                    <input type="text" id="edit_img${itemID}" placeholder="Nhập link hình ảnh"
                                        class="add_product_input">
                                </div>

                                <div class="form_input form8 d-flex flex-column">
                                    <label for="edit_about${itemID}">Giới thiệu món ăn</label>
                                    <textarea type="text" id="edit_about${itemID}" class="add_product_input"
                                        style="resize: none"></textarea>
                                </div>
                            </div>
                            <div id="modal_edit" class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" id="btn_saveEdit" onclick="editItem(${itemID})">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
        `
    })
    showTBody.innerHTML = str
    showModalNe.innerHTML = showModal
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
                alert(`Đã xóa thành công món ${response.data.name} có ID là ${response.data.foodid} ra khỏi danh sách`);
                callAPI();
                showFoodList()
            }
        })
        .catch((error) => {
            alert('Sai link API rồi');
        });
}
// ------------------------------------------------------------

// FUNCTION ADD ITEM IN FOOD LIST 
const addItemToFoodList = () => {
    const inputName = callElement("#input_name").value
    const inputImage = callElement("#input_img").value
    const inputAbout = callElement("#input_about").value
    const inputID = Number(callElement("#input_code").value)
    const inputPrice = Number(callElement("#input_price").value).toLocaleString("vi-VN")
    const inputType = Number(callElement("#select_mon").value)
    const inputDiscount = Number(callElement("#select_discount").value)
    const inputStatus = Number(callElement("#select_status").value)

    switch (inputType) {
        case 1:
            textFoodType = "Món Chay"
            break
        case 2:
            textFoodType = "Món Mặn"
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

    axios({
        method: 'post',
        url: "https://6516d0e109e3260018ca59a0.mockapi.io/FoodList",
        data: {
            name: inputName,
            type: textFoodType,
            price: inputPrice.toLocaleString("vi-VN"),
            discount: textFoodDiscount,
            status: textFoodStatus,
            image: inputImage,
            about: inputAbout,
            foodid: inputID
        }
    })
        .then(function (response) {
            alert(`Đã thêm thành công món ${response.data.name} vào danh sách`);
            callAPI()
            showFoodList()
        })
        .catch((error) => {
            alert('Sai link API rồi');
        });
}
// ------------------------------------------------------------

// FUNCTION EDIT ITEM IN FOOD LIST
const editItem = (id) => {
    axios.get(`https://6516d0e109e3260018ca59a0.mockapi.io/FoodList/${id}`)
        .then(function (response) {
            const originalData = response.data;

            let editItemName = getIdElement(`edit_name${id}`).value || originalData.name;
            let editItemID = getIdElement(`edit_code${id}`).value || originalData.foodid;
            let editItemPrice = parseFloat(getIdElement(`edit_price${id}`).value.replace(/,/g, '')) || originalData.price; // Bỏ dấu phẩy và chuyển thành số
            let editItemStatus = getIdElement(`edit_select_status${id}`).value || originalData.status;
            let editItemType = getIdElement(`edit_select_mon${id}`).value || originalData.type;
            let editItemAbout = getIdElement(`edit_about${id}`).value || originalData.about;
            let editItemDiscount = getIdElement(`edit_select_discount${id}`).value || originalData.discount;
            let editItemImage = getIdElement(`edit_img${id}`).value || originalData.image;

            // Định dạng editItemPrice thành chuỗi tiền tệ với dấu chấm (hoặc dấu phẩy) phù hợp
            editItemPrice = editItemPrice.toLocaleString("vi-VN");

            // Chuyển đổi editItemDiscount thành giá trị phù hợp
            if (editItemDiscount == 1) {
                editItemDiscount = "10%";
            } else if (editItemDiscount == 2) {
                editItemDiscount = "20%";
            } else if (editItemDiscount == 3) {
                editItemDiscount = "30%";
            } else {
                editItemDiscount = originalData.discount;
            }

            // Chuyển đổi editItemStatus thành giá trị phù hợp
            if (editItemStatus == 1) {
                editItemStatus = "Đã hết";
            } else if (editItemStatus == 2) {
                editItemStatus = "Vẫn còn";
            } else {
                editItemStatus = originalData.status;
            }

            // Chuyển đổi editItemType thành giá trị phù hợp
            if (editItemType == 1) {
                editItemType = "Món Chay";
            } else if (editItemType == 2) {
                editItemType = "Món Mặn";
            } else {
                editItemType = originalData.type;
            }

            // Chuyển đổi editItemImage thành giá trị phù hợp
            if (editItemImage == "") {
                editItemImage = originalData.image;
            }

            // Kiểm tra nếu editItemID không bị trống và khác với chính nó thì mới thay đổi
            if (editItemID && editItemID !== originalData.foodid) {
                let checkID = foodList.some((item) => {
                    return editItemID == item.foodid;
                });

                if (checkID) {
                    alert(`ID ${editItemID} đã tồn tại, vui lòng chọn 1 ID khác`);
                } else {
                    itemNeedEdit(id, editItemName, editItemType, editItemPrice, editItemDiscount, editItemStatus, editItemImage, editItemAbout, editItemID);
                }
            } else {
                itemNeedEdit(id, editItemName, editItemType, editItemPrice, editItemDiscount, editItemStatus, editItemImage, editItemAbout, originalData.foodid);
            }
        })
        .catch(function (error) {
            console.error("Lỗi khi truy vấn dữ liệu ban đầu: " + error);
        });
}

const itemNeedEdit = (id, name, type, price, discount, status, image, about, foodid) => {
    axios({
        method: 'put',
        url: `https://6516d0e109e3260018ca59a0.mockapi.io/FoodList/${id}`,
        data: {
            name,
            type,
            price,
            discount,
            status,
            image,
            about,
            foodid,
        }
    }).then(function (response) {
        if (response) {
            $('#exampleModal' + id).modal('hide');
            alert("Đã chỉnh sửa thành công món ăn");
            callAPI();
            showFoodList();
        }
    });
}
// ------------------------------------------------------------

// FUNCTION SORT ID ITEM IN FOOD LIST
const sortID = () => {
    if (swapSort) {
        foodList.sort((a, b) => {
            return a.foodid - b.foodid
        })
    } else {
        foodList.sort((a, b) => {
            return b.foodid - a.foodid
        })
    }
    swapSort = !swapSort
    showFoodList();
    console.log("check ", foodList)
}

// FUNCTION SORT PRICE ITEM IN FOOD LIST
const sortPrice = () => {
    if (swapSort) {
        foodList.sort((a, b) => {
            return a.price - b.price
        })
    } else {
        foodList.sort((a, b) => {
            return b.price - a.price
        })
    }
    swapSort = !swapSort
    showFoodList();
}

// FUNCTION SORT TYPE ITEM IN FOOD LIST
const sortType = () => {
    if (swapSort) {
        foodList.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        foodList.sort((a, b) => b.name.localeCompare(a.name));
    }

    swapSort = !swapSort;
    showFoodList();
}

// FUNCTION SORT STATUS ITEM IN FOOD LIST
const sortStatus = () => {
    if (swapSort) {
        foodList.sort((a, b) => a.status.localeCompare(b.status));
    } else {
        foodList.sort((a, b) => b.status.localeCompare(a.status));
    }

    swapSort = !swapSort;
    showFoodList();
}

// FUNCTION SORT DISCOUNT ITEM IN FOOD LIST
const sortDiscount = () => {
    if (swapSort) {
        foodList.sort((a, b) => a.discount.localeCompare(b.discount));
    } else {
        foodList.sort((a, b) => b.discount.localeCompare(a.discount));
    }

    swapSort = !swapSort;
    showFoodList();
}