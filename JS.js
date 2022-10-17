const text =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa dolorum nemo itaque minima exercitationem, similique delectus, commodi aliquid odio error illo! Repudiandae praesentium ut dolor non, distinctio blanditiis nostrum numquam architecto, voluptatem maxime voluptas delectus animi, natus est iste reiciendis. Soluta cupiditate atque impedit nesciunt vitae numquam natus id architecto deserunt dolores laboriosam hic qui debitis vel eius eum facere officia omnis est quam, quod, sunt, quaerat recusandae expedita? Totam vel autem distinctio ad tempora voluptatibus odit saepe in nostrum rem tempore soluta minima mollitia quidem deleniti qui officiis adipisci quae quod culpa, modi aliquam exercitationem? Similique voluptatem eum ipsum consequatur corporis, aperiam quas illo eveniet repellat omnis in fuga cupiditate exercitationem aspernatur vitae dolorum accusamus culpa dolor impedit cumque vel illum assumenda libero nemo? Quas ullam maxime placeat unde atque cum nulla quia enim accusantium error nam, inventore id totam ut sunt earum, consectetur, eveniet quidem iste reiciendis natus! Ipsa hic necessitatibus optio pariatur minima veritatis libero at reiciendis laboriosam a laudantium nostrum cumque omnis quas sint, est ut debitis magnam recusandae, repellendus officiis suscipit sequi ducimus distinctio! Modi facilis dolore, deserunt ea quo incidunt qui dicta fugiat molestiae adipisci eum sequi cum rem nesciunt reiciendis exercitationem tempore libero quos illo commodi tempora. Beatae, voluptate iusto. Iusto debitis nemo, corporis ut animi cumque libero ullam voluptate. Voluptate aliquid reiciendis facilis accusantium. Atque pariatur officiis culpa, eos eveniet perferendis quia debitis consectetur et consequatur, beatae deleniti! Distinctio corporis dolores ab sequi suscipit amet perspiciatis a modi corrupti. Nobis quisquam veniam maxime totam perferendis eos! Similique ducimus eligendi, autem assumenda nesciunt sequi corporis rerum temporibus alias praesentium consequatur et asperiores! Natus quae fuga voluptatem quas repellendus dolore repudiandae maxime, pariatur, asperiores assumenda enim sint consequuntur qui quo. Sit suscipit provident est quas! Alias provident assumenda, mollitia sapiente corrupti ab iste minima!";

const inptForm = document.querySelector(".headerMainSectionForm");
const tableOutp = document.querySelector(".tableMainSection");

function getObjLitersNumbers(text) {
  const arrFromText = text.split(""); /// перетворюємо текст в масив
  const arrUniqeValue = []; /// оголошую масив унікальних значень
  const objOfValues = {}; /// оголошую обєкт унікальних значень

  for (let liter of arrFromText.sort()) {
    /// пербираю форОфом відсортований масив
    if (!arrUniqeValue.includes(liter)) {
      /// перевіряю чи є значення в масиві
      arrUniqeValue.push(liter); /// пушу значення в масив унікальних значень
      objOfValues[liter] = 0; /// якщо значення унікальне ініціалізую створення властивості з значенням 0
    }
  }

  for (let i of arrFromText) {
    ///перебираю масив всіх літер
    if (i !== " ") {
      ///перевіряю чи літера не пробіл
      objOfValues[i] += 1; /// збільшую значення властивості на 1
    }
  }

  const arrOfArr = Object.entries(objOfValues); /// роблю масив масивів з об'єкта щоб мати можливість посортувати по зменшенню
  const arrOfArrFilterleters = [...arrOfArr].sort((a, b) => b[1] - a[1]); ///сортую скопійований масив по кількості збігів на спадання
  const objOfFilterLiters = {};

  for (let i of arrOfArrFilterleters) {
    const nameOfLitr = i[0];
    const valueOfLiter = i[1];

    objOfFilterLiters[nameOfLitr] = valueOfLiter;
  }

  // console.log(objOfFilterLiters);
  // console.table(arrOfArrFilterleters);
  return { arrOfArrFilterleters, objOfFilterLiters };
}

function submitHendler(e) {
  e.preventDefault();

  // console.log(e.target[0].value);
  renderToDom(e.target[0].value);
  e.target[0].value = "";
}

function renderToDom(InputText) {
  const liters = getObjLitersNumbers(InputText);

  const arrString = liters.arrOfArrFilterleters
    .map((elArr) => `<tr><td>${elArr[0]}</td><td>${elArr[1]}</td> </tr>`)
    .join("");
  // console.log(arrString);

  tableOutp.innerHTML = `<table class="mainTable">
  <tr><th>Колонка літер,знаків або цифр </th>
  <th>Скільки разів зустрічається в тексті:</th></tr>
  ${arrString}
  </table>`;
}

const callFunc = getObjLitersNumbers(text);
console.log(callFunc);

inptForm.addEventListener("submit", submitHendler);
