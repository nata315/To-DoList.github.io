// функция для запуска 
function start() {
    document.getElementById('status').textContent = "Статус";
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('s-day').setAttribute('min', today);
    document.getElementById('s-day').setAttribute('value', today);

    let sidebar = document.getElementById('sidebar');

    if (sidebar.style.visibility === 'hidden') {
    sidebar.style.visibility = 'visible';
    }
}
// для создания названия 
function clicked_create(){
    let c_name = document.getElementById('name').value;
    document.getElementById('name1').textContent = c_name;
    document.getElementById('status').textContent = "Не выполнено ✗";
    document.getElementById('text_summary').value = '';
    let today_d = new Date().toISOString().split('T')[0];
    document.getElementById('s-day').setAttribute('value', today_d);
}
//сохранение данных 
function save_data(key) {
    try {
        let name = document.getElementById('name1').textContent;
        let date = document.getElementById('s-day').value;
        let summary = document.getElementById('text_summary').value;
        let status = document.getElementById('status').textContent;
        let list = { name: name, date: date, status: status ,summary: summary};
        //console.log("Сохранённый объект:", list);
        localStorage.setItem(key, JSON.stringify(list));
    } catch (e) {
        console.error("Ошибка в save_data:", e.message); // 3
        alert("error save: " + e.message);
    }
}
//доп действия для сохранения
function start_save(key){
    let name = document.getElementById('name1');
    let summary= document.getElementById('text_summary');
    if ((name.value === '') || (summary.value === '') ){
        alert("имя или описание не должно быть пустым\nПодсказка - нажмите 'Создать' для добавления названия ");
    }
    else{
        save_data(key);
       click_list();
    }
    
}
//получение данных для поиска
function get_data(key){
    try{
    let tmp = JSON.parse(localStorage.getItem(key));
    console.log("Загруженный объект:", JSON.parse(localStorage.getItem(key)));
    document.getElementById('name1').textContent = tmp.name;
    document.getElementById('s-day').setAttribute('value', tmp.date);
    document.getElementById('text_summary').value = tmp.summary;
    document.getElementById('status').textContent = tmp.status;
    }
    catch{
        alert("ошибка");
    }
}
//удаление заметки
function click_delete(key){
    try{
    const message = confirm("Вы уверены что хотите удалить задачу?");
    if (message) {
    localStorage.removeItem(key);
    document.getElementById('status').textContent = "Статус";
    document.getElementById('name1').textContent = "Название";
    document.getElementById('text_summary').value = '';

    click_list();
    } 
    else {
    }
    }
    catch {
        alert("ошибка удаления")
    }
}

// вывод списка
function click_list(){
    try{
    document.getElementById('ex2').value = '';
    for(let i=0; i<localStorage.length; i++) {
            let key = localStorage.key(i);
            let tmp = JSON.parse(localStorage.getItem(key));
            console.log("Загруженный объект:", JSON.parse(localStorage.getItem(key)));
            document.getElementById('ex2').value += tmp.date +" | " + key +" | "+ tmp.status + "\n";
    }
    }
    catch{
        alert("ошибка списка")
    } 
}


window.onload = ()=>{
    start();//работает с запуском сайта
    click_list();
}
document.getElementById("create").onclick = ()=>{
    let name = document.getElementById('name');
if (name.value == '') {
    alert("Поле с названием не должно быть пустым");
}
else{clicked_create();  } 
}
document.getElementById("green").onclick = () =>{document.getElementById('status').textContent = "Выполнено ✓";};
document.getElementById("red").onclick = () =>{document.getElementById('status').textContent = "Не выполнено ✗"};
document.getElementById("search").onclick = ()=>{
    let c_name = document.getElementById('name').value;
    if(c_name==null){
        confirm("Введите название")
    }
    else{
        get_data(c_name);
    }
};
document.getElementById("save").onclick = ()=>{
    let c_name = document.getElementById('name');
    start_save(c_name.value);
}
document.getElementById("delete").onclick = ()=>{
    let c_name = document.getElementById('name').value;
    click_delete(c_name);
}
document.getElementById("del_all").onclick = ()=>{
    const message = confirm("Вы уверены что хотите удалить все задачи?");
    if (message) {
    localStorage.clear(); 
    click_list();
    }
}
document.getElementById('scrol').onclick= ()=>{
    try{
    let sidebar = document.getElementById('sidebar');
    let scrol = document.getElementById('scrol');

    if (sidebar.style.visibility === 'hidden') {
    sidebar.style.visibility = 'visible';
    scrol.style.transform = 'scale(-1, 1)';
  } else {
    sidebar.style.visibility = 'hidden';
    scrol.style.transform = 'scale(1, 1)';
  }
}
catch{
    alert("error");
}
}