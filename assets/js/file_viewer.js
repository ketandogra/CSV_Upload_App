console.log("js in");
document.getElementById("search").addEventListener("click", searchData);

function searchData() {
  let count = 0;
  //get input value and convert it into lowercase
  const input = document.getElementById("search-input").value.toLowerCase();

  if (input.length === 0) {
    alert("Input field cannot be empty!");
    return;
  }

  const rows = document.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    // get all table rows
    const rowText = rows[i].textContent.toLowerCase();

    // if the input value is found in row text
    if (rowText.includes(input)) {
      rows[i].classList.add("highlight");
      count += 1;
    } else {
      // if input value not found
      rows[i].classList.remove("highlight");
    }
  }
  document.getElementById("count").innerText = count;
}
