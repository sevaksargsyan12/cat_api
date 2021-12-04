const Config = {
    base_url: 'https://api.thecatapi.com/v1/',
    limit: 10,
    html: {
        load_more: document.getElementsByClassName('load_more')[0],
        title: document.getElementsByClassName('title')[0],
        overlay: document.getElementsByClassName('overlay')[0],
        startLoading() {
            this.overlay.classList.remove('none');
        },
        stopLoading() {
            this.overlay.classList.add('none');
        }

    }

}