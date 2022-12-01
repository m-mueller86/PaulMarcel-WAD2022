window.onload = showOnlyLogin;

function showOnlyLogin() {
    document.getElementById("mainpage").style.display = "none";
    document.getElementById("add").style.display = "none";
    document.getElementById("updateDelete").style.display = "none";
}