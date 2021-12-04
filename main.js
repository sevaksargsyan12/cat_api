/*** GET DATA FROM API ***/



function fetchData(url) {
    return new Promise(async (resolve, reject) => {
        const result = await fetch(url, {
                method: 'get',
                headers: new Headers({'Content-Type': 'application/json','x-api-key': 'b74461b6-7c4c-45e1-b28a-edb4435cb539'}),

            }
        )

        if (result.status == 200 && result.ok) {
            resolve(result.json());
        }
        else {
            reject(`Can't fetch data`);
        }
    })
}




async function getCategories() {
    return await fetchData(`${Config.base_url}categories`);
}

async function getImagesByCategory(category_Id,limit) {
    return await fetchData(`${Config.base_url}images/search?category_ids=${category_Id}&limit=${limit}`);
}


/*** RENDER DATA IN HTML ***/

async function renderCategories() {
    let catagories = await getCategories();
    const categoryWrapper = document.getElementById('categories_list');

    catagories.forEach((item) => {
        let html_Li = document.createElement("LI");
        let html_A = document.createElement("A");
        html_Li.setAttribute("id", item.id);
        html_Li.setAttribute("data-name", item.name);
        html_A.innerHTML = item.name;
        html_Li.appendChild(html_A);
        categoryWrapper.appendChild(html_Li);
    });

    const categorItems = document.querySelectorAll('#categories_list li');
    Array.from(categorItems).forEach(function(categorItem){
        categorItem.addEventListener('click',(e) => {
            for (const li of document.querySelectorAll("#categories_list li.active")) {
                li.classList.remove("active");
            }
            e.currentTarget.classList.add('active');
            categoryHandle(
                categorItem.id,
                categorItem.getAttribute('data-name')
            );
        });
    });
}




async function renderImages(category_Id,load_more = false) {
    Config.html.startLoading();
    let images = await getImagesByCategory(category_Id,Config.limit);
    const imagesWrapper = document.getElementById('images_wrapper');
    if(!load_more){
        imagesWrapper.innerHTML = ''
    };

    images.forEach((item) => {
        let html_div = document.createElement("DIV");
        let html_img = document.createElement("IMG");
        html_div.classList.add('image');
        html_div.setAttribute("data-id", item.id);
        html_img.setAttribute("id", item.id);
        html_img.setAttribute("src", item.url);
         html_div.appendChild(html_img);
        imagesWrapper.appendChild(html_div);
    });
    Config.html.load_more.classList.remove("none");
    Config.html.stopLoading();

}

/*** EVENTS ***/


function categoryHandle(categoryId,categoryName) {
    renderImages(categoryId);

    Config.html.load_more.setAttribute('data-id',categoryId);
    Config.html.title.innerHTML = categoryName.toUpperCase();
    Config.html.load_more.addEventListener('click', loadMoreHandle)
}

function loadMoreHandle() {
    const category_Id = this.getAttribute('data-id');
    renderImages(category_Id,true);
}

renderCategories();

