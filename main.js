const callElement = id => document.querySelector(id)
// ----------------------------------------------------
const displayKhoi1 = callElement("#input_khoi1")
const displayKhoi2 = callElement("#input_khoi2")
const showKetQuaA = callElement("#result_A")
const showKetQuaB = callElement("#result_B")
const buttonShowA = callElement("#btn_A")
const buttonShowB = callElement("#btn_B")

const percentToan = callElement("#monA_1")
const percentLy = callElement("#monA_2")
const percentHoa = callElement("#monA_3")
const percentVan = callElement("#monA_4")
const percentSu = callElement("#monA_5")
const percentDia = callElement("#monA_6")
const percentAnh = callElement("#monA_7")

const showDiemToan = callElement("#khoiA_1")
const showDiemLy = callElement("#khoiA_2")
const showDiemHoa = callElement("#khoiA_3")
const showDiemVan = callElement("#khoiB_1")
const showDiemSu = callElement("#khoiB_2")
const showDiemDia = callElement("#khoiB_3")
const showDiemAnh = callElement("#khoiB_4")



let diemToanValue = Number(callElement("#input_diemtoan").value)
let diemLyValue = Number(callElement("#input_diemly").value)
let diemHoaValue = Number(callElement("#input_diemhoa").value)
let diemVanValue = Number(callElement("#input_diemvan").value)
let diemSuValue = Number(callElement("#input_diemsu").value)
let diemDiaValue = Number(callElement("#input_diemdia").value)
let diemAnhValue = Number(callElement("#input_diemanh").value)
// ----------FUNCTION SHOW INPUT
const selectInput = () => {
    const selectKhoi = Number(callElement("#select_khoi").value)

    if (selectKhoi === 1) {
        displayKhoi1.style.display = "block"
        displayKhoi2.style.display = "none"
    } else if (selectKhoi === 2) {
        displayKhoi1.style.display = "none"
        displayKhoi2.style.display = "block"
    } else {
        displayKhoi1.style.display = "none"
        displayKhoi2.style.display = "none"
    }
}

// ----------FUNCTION TÍNH ĐIỂM TRUNG BÌNH CÁC MÔN
const tinhDiem = (...diemTrungBinh) => {
    const selectKhoi = Number(callElement("#select_khoi").value)

    if (selectKhoi === 0) {
        alert("Vui lòng chọn 1 khối")
    } else {
        let diemToan, diemLy, diemHoa, diemVan, diemSu, diemDia, diemAnh;

        if (selectKhoi === 1) {
            diemToan = Number(callElement("#input_diemtoan").value)
            diemLy = Number(callElement("#input_diemly").value)
            diemHoa = Number(callElement("#input_diemhoa").value)
        } else {
            diemVan = Number(callElement("#input_diemvan").value)
            diemSu = Number(callElement("#input_diemsu").value)
            diemDia = Number(callElement("#input_diemdia").value)
            diemAnh = Number(callElement("#input_diemanh").value)
        }

        const dtbLenght = diemTrungBinh.length;
        let diemTrungBinhValue = 0;

        if (selectKhoi === 1 && diemToan && diemLy && diemHoa) {
            diemTrungBinhValue = ((diemToan + diemLy + diemHoa) / dtbLenght).toFixed(2);
            showKetQuaA.textContent = `Điểm trung bình khối A là : ${diemTrungBinhValue}`;
            percentToan.style.width = diemToan * 10 + "%"
            showDiemToan.textContent = `${diemToan}`
            percentLy.style.width = diemLy * 10 + "%"
            showDiemLy.textContent = `${diemLy}`
            percentHoa.style.width = diemHoa * 10 + "%"
            showDiemHoa.textContent = `${diemHoa}`
        } else if (selectKhoi === 2 && diemVan && diemSu && diemDia && diemAnh) {
            diemTrungBinhValue = ((diemVan + diemSu + diemDia + diemAnh) / dtbLenght).toFixed(2);
            showKetQuaB.textContent = `Điểm trung bình khối B là : ${diemTrungBinhValue}`;
            percentVan.style.width = diemVan * 10 + "%"
            showDiemVan.textContent = `${diemVan}`
            percentSu.style.width = diemSu * 10 + "%"
            showDiemSu.textContent = `${diemSu}`
            percentDia.style.width = diemDia * 10 + "%"
            showDiemDia.textContent = `${diemDia}`
            percentAnh.style.width = diemAnh * 10 + "%"
            showDiemAnh.textContent = `${diemAnh}`
        } else {
            alert("Nhập đủ điểm rồi mới tính được ba")
        }
    }
}
buttonShowA.addEventListener("click", () => {
    const selectKhoi = Number(callElement("#select_khoi").value)
    if (selectKhoi === 2) {
        alert("Vui lòng chọn khối A và Nhập điểm")
    } else {
        tinhDiem(diemToanValue, diemLyValue, diemHoaValue)
    }
})
buttonShowB.addEventListener("click", () => {
    const selectKhoi = Number(callElement("#select_khoi").value)
    if (selectKhoi === 1) {
        alert("Vui lòng chọn khối B và Nhập điểm")
    } else {
        tinhDiem(diemVanValue, diemSuValue, diemDiaValue, diemAnhValue)
    }
})







