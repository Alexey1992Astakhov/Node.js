
const albumIterator = Symbol.iterator;
const musicCollection = {
    albums: [
        {
            title: "Король и Шут",
            artist: "Король и Шут",
            year: "1996",
        },
        {
            title: "Мёртвый анархист",
            artist: "Король и Шут",
            year: "2003",
        },
        {
            title: "Камнем по голове",
            artist: "Король и Шут",
            year: "1996",
        },
    ],

    [albumIterator]: function () {
        let index = 0;

        return {
            next: () => {
                return index < this.albums.length
                ? {value: this.albums[index++], done: false}
                : {done: true};
            },
        };
    },
};

for (const album of musicCollection) {
    console.log(`${album.title} - ${album.artist} (${album.year})`);
}
