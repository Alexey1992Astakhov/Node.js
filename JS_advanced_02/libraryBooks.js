class Library {
    #books = [];

    // Получаем текущий список книг
    get allBooks () {
        return this.#books.join(', ')
    }

    // Метод добавления книги в библиотеку
    addBook(title) {
        try {
            if (this.#books.includes(title)) {
                throw new Error('Книга уже есть в списке');
            }
            this.#books.push(title);
            return this.#books.join(', ');
        } catch (error) {
            return error.message;
        }
    }

    // Метод удаления книги из библиотеки
    removeBook(title) {
        try {
            if (!this.#books.includes(title)) {
                throw new Error(' Такой книги нет в списке');
            }
            const titleID = this.#books.indexOf(title);
            this.#books.splice(titleID, 1);
            return this.#books.join(', ');

        } catch (error) {
            return error.message;
        }
    }

    // Проверка на наличие книги в библиотеке
    hasBook(title) {
        return this.#books.includes(title);
    }

    constructor(initBookList) {
        const uniqueList = [...new Set(initBookList)]
        if (uniqueList.length !== initBookList.length) {
            throw new Error('Список содержит дубликаты книг');
        }
        this.#books = initBookList;
    }
}

const bookList = ['1', '2', '3', '4', '5', '6'];

let library = new Library(bookList);
console.log(library.allBooks);

console.log(library.addBook('Steven King'));
console.log(library.addBook('Морозко'));

console.log(library.removeBook('Морозко'));
console.log(library.removeBook('1'));

console.log(library.allBooks);

console.log(library.hasBook('Steven King'))
