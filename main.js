let cardWrapper = document.getElementById("card-wrapper");
let btn = document.getElementById("btn");
let input = document.getElementById("search");

let surahs = [];

async function initialize() {
  surahs = await getData();
  writeData(surahs);
}
initialize();

async function getData() {
  try {
    const response = await axios.get("https://api.alquran.cloud/v1/surah");
    let {
      data: { data: surahs },
    } = response;
    return surahs;
  } catch (error) {
    console.log(error.message);
  }
}

//search btn clicked filter
btn.addEventListener("click", (event) => {
  event.preventDefault()//formda bo'lganiga
  let value = input.value.toLowerCase();
  let searchData = surahs.filter(
    (val) =>
      val.englishName.toLowerCase().includes(value) ||
      val.number.toString().includes(value)
  );
  writeData(searchData);
});
console.log("filtered result", searchData);
writeData(searchData);

 function writeData(data) {
  let items = "";
  try {
    if (data && Array.isArray(data)) {
      data.forEach((value) => {
        items += `<div class="card" style="width: 23rem;" >
                    <img src="./img.jpg"  class="card-img-top" alt="img " style="height: 300px;object-fit:cover;" />
                    <div class="card-body">
                      <p class="card-text">
                       Surah number: ${value.number}
                      </p>
                       <p class="card-text">
                        Arabic name:  ${value.name}
                      </p>
                       <p class="card-text">
                        English name: ${value.englishName}
                      </p>
                       <p class="card-text">
                        Translation: ${value.englishNameTranslation}
                      </p>
                      <p class="card-text">
                        Number of ayahs: ${value.numberOfAyahs}
                      </p>
                      <p class="card-text">
                        Revelation type: ${value.revelationType}
                      </p>
                      
                      

                    </div>
                </div>`;
      });
    } else {
      console.log("No data received");
    }
    //  console.log(items);
  } catch (error) {
    console.log(error.message);
  }
  cardWrapper.innerHTML = items;
}
