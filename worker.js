
import Person from './person.js';

export default class Worker extends Person {
    #rate = 1000;
    #days = 0;

    constructor(firstName, lastName, birthday, position) {
        super(firstName, lastName, birthday);

        this.position = position;
    }

    get rate() {
        return this.#rate;
    }

    set rate(value) {
        if (typeof value === 'number' && value >= 1000) {
            this.#rate = value;
        } else {
            console.error('Ошибка! Ставка не может быть меньше 1000 рублей.');
        }
    }

    addDays(days) {
        const currentMonthDays = new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
        ).getDate();

        if (typeof days !== 'number' || days <= 0) {
            console.error('Количество дней должно быть больше 0.');
            return;
        }

        if (this.#days + days > currentMonthDays) {
            console.error(
                `Нельзя добавить дни. В текущем месяце максимум ${currentMonthDays} дней.`
            );
            return;
        }

        this.#days += days;
    }

    getSalary() {
        let salary = this.#rate * this.#days;

        const birthdayMonth = Number(this.birthday.split('-')[0]);
        const currentMonth = new Date().getMonth() + 1;

        if (birthdayMonth === currentMonth) {
            salary += salary * 0.1;
        }

        return salary;
    }

    static whoWorkedMore(...workers) {
        if (workers.length === 0) {
            console.log('Список работников пуст.');
            return;
        }

        const maxDays = Math.max(...workers.map(worker => worker.#days));

        const hardestWorkers = workers.filter(
            worker => worker.#days === maxDays
        );

        hardestWorkers.forEach(worker => {
            console.log(
                `Больше всех отработал ${worker.getFullName()}. Количество рабочих дней - ${worker.#days}`
            );
        });
    }

    static whoIsYounger(...workers) {
        if (workers.length === 0) {
            console.log('Список работников пуст.');
            return;
        }

        const youngestAge = Math.min(
            ...workers.map(worker => {
                const [month, day, year] = worker.birthday.split('-').map(Number);

                const today = new Date();
                let age = today.getFullYear() - year;

                if (
                    today.getMonth() + 1 < month ||
                    (today.getMonth() + 1 === month && today.getDate() < day)
                ) {
                    age--;
                }

                return age;
            })
        );

        workers.forEach(worker => {
            const [month, day, year] = worker.birthday.split('-').map(Number);

            const today = new Date();
            let age = today.getFullYear() - year;

            if (
                today.getMonth() + 1 < month ||
                (today.getMonth() + 1 === month && today.getDate() < day)
            ) {
                age--;
            }

            if (age === youngestAge) {
                console.log(`${worker.getFullName()} ${worker.getAge()}`);
            }
        });
    }
}
