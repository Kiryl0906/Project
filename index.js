
import Worker from './worker.js';

// Создаём работников
const worker1 = new Worker('Иван', 'Иванов', '05-15-1995', 'Программист');
const worker2 = new Worker('Анна', 'Петрова', '11-20-2000', 'Дизайнер');
const worker3 = new Worker('Петр', 'Сидоров', '03-10-1998', 'Менеджер');
const worker4 = new Worker('Мария', 'Смирнова', '07-25-2002', 'Аналитик');
const worker5 = new Worker('Алексей', 'Козлов', '09-12-1990', 'Разработчик');

// Изменяем ставки
worker1.rate = 1500;
worker2.rate = 2000;
worker3.rate = 1800;

// Проверяем некорректную ставку
worker4.rate = 500;

// Добавляем рабочие дни
worker1.addDays(10);
worker1.addDays(8);
worker1.addDays(5);

worker2.addDays(12);
worker2.addDays(8);
worker2.addDays(3);

worker3.addDays(15);
worker3.addDays(10);
worker3.addDays(-2);

worker4.addDays(10);
worker4.addDays(50);
worker4.addDays(5);

worker5.addDays(15);
worker5.addDays(10);
worker5.addDays(5);

// Собираем работников в массив
const workers = [
    worker1,
    worker2,
    worker3,
    worker4,
    worker5
];

// Выводим зарплату каждого работника
workers.forEach(worker => {
    console.log(
        `${worker.getFullName()} - ${worker.getSalary()} рублей`
    );
});

// Кто отработал больше всех?
console.log('--- Больше всех отработал ---');
Worker.whoWorkedMore(...workers);

// Кто самый младший?
console.log('--- Самый младший работник ---');
Worker.whoIsYounger(...workers);
