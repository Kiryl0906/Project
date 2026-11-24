
import Person from "./person.js";

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
        if (Number.isFinite(value) && value >= 1000) {
            this.#rate = value;
        } else {
            console.error(
                "Ошибка! Ставка должна быть числом не меньше 1000 рублей."
            );
        }
    }

    addDays(days) {
        const currentMonthDays = new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
        ).getDate();

        if (!Number.isInteger(days) || days <= 0) {
            console.error(
                "Количество дней должно быть положительным целым числом."
            );
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

        const birthdayMonth = Number(this.birthday.split("-")[0]);
        const currentMonth = new Date().getMonth() + 1;

        if (birthdayMonth === currentMonth) {
            salary += salary * 0.1;
        }

        return Number.isFinite(salary) ? salary : 0;
    }

    static whoWorkedMoreAndWhoIsYounger(...workers) {
        if (workers.length === 0) {
            console.log("Список работников пуст.");
            return;
        }

        let maxDays = -1;
        let youngestAge = Infinity;

        const hardestWorkers = [];
        const youngestWorkers = [];

        for (const worker of workers) {
            if (worker.#days > maxDays) {
                maxDays = worker.#days;
                hardestWorkers.length = 0;
                hardestWorkers.push(worker);
            } else if (worker.#days === maxDays) {
                hardestWorkers.push(worker);
            }

            const age = Number(worker.getAge().split(" ")[0]);

            if (age < youngestAge) {
                youngestAge = age;
                youngestWorkers.length = 0;
                youngestWorkers.push(worker);
            } else if (age === youngestAge) {
                youngestWorkers.push(worker);
            }
        }

        hardestWorkers.forEach(worker => {
            console.log(
                `Больше всех отработал ${worker.getFullName()}. Количество рабочих дней - ${worker.#days}`
            );
        });

        youngestWorkers.forEach(worker => {
            console.log(
                `${worker.getFullName()} ${worker.getAge()}`
            );
        });
    }
}
