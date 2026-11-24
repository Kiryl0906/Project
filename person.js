
export default class Person {
    #birthday;

    constructor(firstName, lastName, birthday) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.#birthday = birthday;
    }

    get birthday() {
        return this.#birthday;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    getAge() {
        const [month, day, year] = this.#birthday.split('-').map(Number);

        const today = new Date();

        let age = today.getFullYear() - year;

        const currentMonth = today.getMonth() + 1;
        const currentDay = today.getDate();

        if (
            currentMonth < month ||
            (currentMonth === month && currentDay < day)
        ) {
            age--;
        }

        const lastDigit = age % 10;
        const lastTwoDigits = age % 100;

        let word = 'лет';

        if (lastTwoDigits < 11 || lastTwoDigits > 14) {
            if (lastDigit === 1) {
                word = 'год';
            } else if (lastDigit >= 2 && lastDigit <= 4) {
                word = 'года';
            }
        }

        return `${age} ${word}`;
    }
}
