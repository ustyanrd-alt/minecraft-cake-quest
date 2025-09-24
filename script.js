const slots = document.querySelectorAll(".slot");
const resultSlot = document.querySelector(".result-slot");
const message = document.querySelector(".message");

let placedItems = Array(9).fill(null);

document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("dragstart", e => {
    e.dataTransfer.setData("item", item.dataset.item);
    e.dataTransfer.setData("img", item.src);
  });
});

slots.forEach((slot, index) => {
  slot.addEventListener("dragover", e => e.preventDefault());

  slot.addEventListener("drop", e => {
    e.preventDefault();
    const item = e.dataTransfer.getData("item");
    const imgSrc = e.dataTransfer.getData("img");

    slot.innerHTML = <img src="${imgSrc}" alt="${item}">;
    placedItems[index] = item;

    checkRecipe();
  });
});

function checkRecipe() {
  const correctRecipe = [
    "milk", "milk", "milk",
    "sugar", "egg", "sugar",
    "wheat", "wheat", "wheat"
  ];

  if (JSON.stringify(placedItems) === JSON.stringify(correctRecipe)) {
    resultSlot.innerHTML = <img src="cake.png" alt="cake">;
    message.style.display = "block";
    message.innerHTML = `
      ✅ Ура! Ты скрафтила торт! <br>
      🎂 <br>
      🎉 Подсказка: напиши в директ подсказка 2!
    `;
  }
}
