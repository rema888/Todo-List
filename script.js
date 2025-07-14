//localStorage.clear();
let categories = [
  {
    title: "Личное",
    img: "boy.png",
  },
  {
    title: "Работа",
    img: "briefcase.png",
  },
  {
    title: "Покупки", 
    img: "shopping.png",
  },
  {
    title: "Кодинг", 
    img: "web-design.png",
  },
  {
    title: "Здоровье", 
    img: "healthcare.png",
  },
  {
    title: "Спорт", 
    img: "dumbbell.png",
  },
  {
    title: "Обучение", 
    img: "education.png",
  },
  {
    title: "Финансы",
    img: "saving.png",
  },
];

let tasks = [
  {
    id: 1,
    task: "Сходить в магазин",
    category: "Покупки",
    completed: false,
  },
  {
    id: 2,
    task: "Прочитать главу книги",
    category: "Личное",
    completed: false,
  },
  {
    id: 3,
    task: "Подготовить презентацию для встречи",
    category: "Работа",
    completed: false,
  },
  {
    id: 4,
    task: "Выполнить задание по программированию",
    category: "Кодинг",
    completed: false,
  },
  {
    id: 5,
    task: "Погулять 30 минут",
    category: "Здоровье",
    completed: false,
  },
  {
    id: 6,
    task: "Сделать 20-минутную HIIT-тренировку",
    category: "Спорт",
    completed: false,
  },
  {
    id: 7,
    task: "Посмотреть обучающее видео",
    category: "Обучение",
    completed: false,
  },
  {
    id: 8,
    task: "Проверить месячный бюджет",
    category: "Финансы",
    completed: false,
  },
  {
    id: 9,
    task: "Купить продукты на неделю",
    category: "Покупки",
    completed: false,
  },
  {
    id: 10,
    task: "Написать в дневнике",
    category: "Личное",
    completed: false,
  },
  {
    id: 11,
    task: "Отправить письма с напоминанием",
    category: "Работа",
    completed: false,
  },
  {
    id: 12,
    task: "Поработать над побочным проектом",
    category: "Кодинг",
    completed: false,
  },
  {
    id: 13,
    task: "Попробовать новый полезный рецепт",
    category: "Здоровье",
    completed: false,
  },
  {
    id: 14,
    task: "Сходить на занятие йогой",
    category: "Спорт",
    completed: false,
  },
  {
    id: 15,
    task: "Прочитать статью на новую тему",
    category: "Обучение",
    completed: false,
  },
  {
    id: 16,
    task: "Настроить автоматическую оплату счетов",
    category: "Финансы",
    completed: false,
  },
  {
    id: 17,
    task: "Купить новую одежду",
    category: "Покупки",
    completed: false,
  },
  {
    id: 18,
    task: "Помедитировать 10 минут",
    category: "Личное",
    completed: false,
  },
  {
    id: 19,
    task: "Подготовить повестку для командной встречи",
    category: "Работа",
    completed: false,
  },
  {
    id: 20,
    task: "Исправить ошибку в программе",
    category: "Кодинг",
    completed: false,
  },
  {
    id: 21,
    task: "Попробовать новый рецепт на обед",
    category: "Здоровье",
    completed: false,
  },
  {
    id: 22,
    task: "Сходить на пробежку",
    category: "Спорт",
    completed: false,
  },
  {
    id: 23,
    task: "Изучать новый язык онлайн",
    category: "Обучение",
    completed: false,
  },
  {
    id: 24,
    task: "Почитать про историю",
    category: "Обучение",
    completed: false,
  },
  {
    id: 25,
    task: "Проверить инвестиционный портфель",
    category: "Финансы",
    completed: false,
  },
];

let selectedCategory = categories[0];

const saveLocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("selectedCategory", JSON.stringify(selectedCategory));
};

const getLocal = () => {
  const tasksLocal = JSON.parse(localStorage.getItem("tasks"));
  const categoryLocal = JSON.parse(localStorage.getItem("selectedCategory"));
  
  if (tasksLocal) tasks = tasksLocal;
  if (categoryLocal) {
    selectedCategory = categories.find(c => c.title === categoryLocal.title) || categories[0];
  }
};

const toggleScreen = () => {
  screenWrapper.classList.toggle("show-category");
};

const updateTotals = () => {
  const categoryTasks = tasks.filter(
    task => task.category === selectedCategory.title
  );
  numTasks.textContent = `Осталось задач: ${categoryTasks.length}`;
  totalTasks.textContent = tasks.length;
};

const renderCategories = () => {
  categoriesContainer.innerHTML = "";
  categories.forEach((category) => {
    const categoryTasks = tasks.filter(
      (task) => task.category.toLowerCase() === category.title.toLowerCase()
    );
    const div = document.createElement("div");
    div.classList.add("category");
    div.addEventListener("click", () => {
      screenWrapper.classList.toggle("show-category");
      selectedCategory = category;
      updateTotals();
      categoryTitle.innerHTML = category.title;
      categoryImg.src = `images/${category.img}`;
      renderTasks();
    });

    div.innerHTML = `
      <div class="left">
        <img src="images/${category.img}" alt="${category.title}" />
        <div class="content">
          <h1>${category.title}</h1>
          <p>Осталось задач: ${categoryTasks.length}</p>
        </div>
      </div>
    `;

    categoriesContainer.appendChild(div);
  });
};


const renderTasks = () => {
  tasksContainer.innerHTML = "";
  const categoryTasks = tasks.filter(
    (task) =>
      task.category.toLowerCase() === selectedCategory.title.toLowerCase()
  );
  if (categoryTasks.length === 0) {
    tasksContainer.innerHTML = `<p class="no-tasks">Нет задач в этой категории</p>`;
    numTasks.textContent = "Осталось задач: 0";
    updateTotals();
    renderCategories(); // Добавляем обновление категорий
  } else {
    categoryTasks.forEach((task) => {
      const div = document.createElement("div");
      div.classList.add("task-wrapper");
      const label = document.createElement("label");
      label.classList.add("task");
      label.setAttribute("for", task.id);
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = task.id;
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => {
        const index = tasks.findIndex((t) => t.id === task.id);
        tasks[index].completed = !tasks[index].completed;
        saveLocal();
      });
      div.innerHTML = `
      <div class="delete">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
              `;
      label.innerHTML = `
              <span class="checkmark"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </span>
              <p>${task.task}</p>
        `;
      label.prepend(checkbox);
      div.prepend(label);
      tasksContainer.appendChild(div);

      const deleteBtn = div.querySelector(".delete");
      deleteBtn.addEventListener("click", () => {
        const index = tasks.findIndex((t) => t.id === task.id);
        tasks.splice(index, 1);
        saveLocal();
        renderTasks();
        renderCategories(); 
        updateTotals();
      });
    });

    renderCategories();
    updateTotals(); // Добавляем обновление счетчиков
  }
};

const toggleAddTaskForm = () => {
  addTaskWrapper.classList.toggle("active");
  blackBackdrop.classList.toggle("active");
  addTaskBtn.classList.toggle("active");
};

const addTask = (e) => {
  e.preventDefault();
  const task = taskInput.value;
  const category = categorySelect.value;

  if (task === "") {
    alert("Пожалуйста, введите задание");
  } else {
    const newTask = {
      id: tasks.length + 1,
      task,
      category,
      completed: false,
    };
    taskInput.value = "";
    tasks.push(newTask);
    saveLocal();
    renderCategories();
    toggleAddTaskForm();
    renderTasks();
    updateTotals(); // Добавляем обновление счетчиков
  }
};


const categoriesContainer = document.querySelector(".categories");
const screenWrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".back-btn");
const tasksContainer = document.querySelector(".tasks");
const numTasks = document.getElementById("num-tasks");
const categoryTitle = document.getElementById("category-title");
const categoryImg = document.getElementById("category-img");
const categorySelect = document.getElementById("category-select");
const addTaskWrapper = document.querySelector(".add-task");
const addTaskBtn = document.querySelector(".add-task-btn");
const taskInput = document.getElementById("task-input");
const blackBackdrop = document.querySelector(".black-backdrop");
const addBtn = document.querySelector(".add-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const totalTasks = document.getElementById("total-tasks");

menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);
addTaskBtn.addEventListener("click", toggleAddTaskForm);
blackBackdrop.addEventListener("click", toggleAddTaskForm);
addBtn.addEventListener("click", addTask);
cancelBtn.addEventListener("click", toggleAddTaskForm);

getLocal();
renderTasks();
categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category.title.toLowerCase();
  option.textContent = category.title;
  categorySelect.appendChild(option);
});